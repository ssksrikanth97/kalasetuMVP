import { NextResponse } from 'next/server';
import admin from '@/lib/firebase/firebase-admin';

export const dynamic = 'force-dynamic';

// Initialize db dynamically to avoid crashing Next.js build when env vars are unavailable
const getDb = () => admin.apps.length ? admin.firestore() : null;

export async function GET(request) {
    try {
        const db = getDb();
        if (!db) return NextResponse.json({ error: 'Firestore not initialized' }, { status: 500 });
        // 1. Fetch Active Banners
        const bannersSnapshot = await db.collection('mobile_banners')
            .where('isActive', '==', true)
            .orderBy('order', 'asc')
            .get();
        const banners = bannersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 2. Fetch Categories (Limit to top ones for home page if needed)
        const categoriesSnapshot = await db.collection('categories').limit(10).get();
        const categories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 3. Fetch "New Arrivals" (Assuming recent products)
        const newArrivalsSnapshot = await db.collection('products')
            .orderBy('createdAt', 'desc')
            .limit(10)
            .get();
        const newArrivals = newArrivalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 4. Fetch "50% Off" or discounted products 
        // (Assuming you have a discount tag or field. For MVP we'll just fetch a few products as placeholder if field doesn't exist)
        const discountedSnapshot = await db.collection('products')
            .where('discountPercentage', '>=', 50)
            .limit(10)
            .get();

        let discountedProducts = discountedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fallback if no specific discounted products exist
        if (discountedProducts.length === 0) {
            const fallbackDocs = await db.collection('products').limit(5).get();
            discountedProducts = fallbackDocs.docs.map(doc => ({ ...doc.data(), id: doc.id, tag: '50% Off' }));
        }

        // 5. Fetch "Suggested For You"
        const suggestedSnapshot = await db.collection('products')
            .limit(10) // Just getting some random/latest for now
            .get();
        const suggestedProducts = suggestedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Return aggregated home page data
        return NextResponse.json({
            success: true,
            data: {
                banners,
                categories,
                sections: [
                    {
                        id: 'new-arrivals',
                        title: 'New Arrivals',
                        type: 'product_carousel',
                        items: newArrivals
                    },
                    {
                        id: 'discounted',
                        title: '50% Off Products',
                        type: 'product_carousel',
                        items: discountedProducts
                    },
                    {
                        id: 'suggested',
                        title: 'Suggested for You',
                        type: 'product_carousel',
                        items: suggestedProducts
                    }
                ]
            }
        });

    } catch (error) {
        console.error("Error fetching mobile home data:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch home page data', details: error.message },
            { status: 500 }
        );
    }
}
