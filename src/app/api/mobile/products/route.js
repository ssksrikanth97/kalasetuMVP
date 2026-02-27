import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase/firebase';
import { collection, query, getDocs, orderBy, limit as firestoreLimit } from 'firebase/firestore';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limitParam = searchParams.get('limit');
        const discountParam = searchParams.get('discount');
        const searchParam = searchParams.get('search');

        // Base Query
        let q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));

        // Actually applying true limit requires composite querying, but we can fetch them all and filter in memory for this MVP
        // OR we can just apply a native limit if there are no filter matches
        if (limitParam && !discountParam && !searchParam) {
            q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), firestoreLimit(Number(limitParam)));
        }

        const snapshot = await getDocs(q);
        let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Memory Filters
        if (discountParam === 'true') {
            products = products.filter(p => Number(p.discountPercentage) > 5);
        }

        if (searchParam) {
            const regex = new RegExp(searchParam, 'i');
            products = products.filter(p =>
                regex.test(p.productName) ||
                regex.test(p.categoryId) ||
                (p.shortDescription && regex.test(p.shortDescription))
            );
        }

        if (limitParam && (discountParam || searchParam)) {
            products = products.slice(0, Number(limitParam));
        }

        return NextResponse.json({ success: true, count: products.length, data: products }, { status: 200 });
    } catch (error) {
        console.error("Error fetching products API:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
