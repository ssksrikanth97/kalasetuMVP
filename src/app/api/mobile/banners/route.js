import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request) {
    try {
        // Fetch only active banners, ordered by priority
        const bannersSnapshot = await adminDb.collection('mobile_banners')
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
