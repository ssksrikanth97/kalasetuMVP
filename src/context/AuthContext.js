'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null); // 'customer', 'artist', 'institution', 'admin'
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserRole(userData.role);
                    } else {
                        console.warn('User document not found for ID:', currentUser.uid);
                        setUserRole(null);
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                    setUserRole(null); // Ensure role is null on error
                }
                setUser(currentUser);
            } else {
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
            // The onAuthStateChanged listener will handle clearing user state.
            router.push('/auth/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, userRole, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
