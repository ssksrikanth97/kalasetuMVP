
import { NextResponse } from 'next/server';
import admin from '@/lib/firebase/firebase-admin';

export async function GET() {
    try {
        const listUsersResult = await admin.auth().listUsers();
        const users = listUsersResult.users.map((userRecord) => userRecord.toJSON());
        return NextResponse.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { uid } = await request.json();
        await admin.auth().deleteUser(uid);
        const db = admin.firestore();
        await db.collection('users').doc(uid).delete();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { email } = await request.json();
        await admin.auth().generatePasswordResetLink(email);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return NextResponse.json({ error: 'Failed to send password reset email' }, { status: 500 });
    }
}
