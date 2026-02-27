import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export async function GET(request) {
    try {
        const catQuery = query(collection(db, 'categories'));
        const snapshot = await getDocs(catQuery);

        let categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // By default return only root level categories, or allow all via query param
        const { searchParams } = new URL(request.url);
        if (searchParams.get('all') !== 'true') {
            categories = categories.filter(c => !c.parentCategoryId);
        }

        return NextResponse.json({ success: true, count: categories.length, data: categories }, { status: 200 });
    } catch (error) {
        console.error("Error fetching categories API:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
