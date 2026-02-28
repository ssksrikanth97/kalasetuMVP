import { NextResponse } from 'next/server';
import admin from '@/lib/firebase/firebase-admin';

export const dynamic = 'force-dynamic';

// Initialize db dynamically to avoid crashing Next.js build when env vars are unavailable
const getDb = () => admin.apps.length ? admin.firestore() : null;

export async function GET(request) {
    try {
        const db = getDb();
        if (!db) return NextResponse.json({ error: 'Firestore not initialized' }, { status: 500 });

        // Fetch only active banners, ordered by priority
        const bannersSnapshot = await db.collection('mobile_banners')
            .where('isActive', '==', true)
            .orderBy('order', 'asc')
            .get();

        const banners = [];
        bannersSnapshot.forEach(doc => {
            banners.push({ id: doc.id, ...doc.data() });
        });

        return NextResponse.json({
            success: true,
            data: banners
        });

    } catch (error) {
        console.error("Error fetching mobile banners:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch banners' },
            { status: 500 }
        );
    }
}
