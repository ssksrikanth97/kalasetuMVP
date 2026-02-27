import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase/firebase';
import { collection, query, getDocs, limit as firestoreLimit, orderBy } from 'firebase/firestore';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limitParam = searchParams.get('limit');

        let q = query(collection(db, 'events'));

        if (limitParam) {
            // For now, events might not have a createdAt universally ordered.
            q = query(collection(db, 'events'), firestoreLimit(Number(limitParam)));
        }

        const snapshot = await getDocs(q);
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json({ success: true, count: events.length, data: events }, { status: 200 });
    } catch (error) {
        console.error("Error fetching events API:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
