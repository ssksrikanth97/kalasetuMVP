import { NextResponse } from 'next/server';
import { db } from '../../../../../lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request, { params }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ success: false, error: 'Event ID required' }, { status: 400 });
        }

        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: { id: docSnap.id, ...docSnap.data() } }, { status: 200 });
    } catch (error) {
        console.error(`Error fetching event API for ${params.id}:`, error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
