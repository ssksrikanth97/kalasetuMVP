import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                setUser(authUser);
                try {
                    const userDoc = await getDoc(doc(db, 'users', authUser.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setUserRole(data.role || 'customer');
                        setUserData(data);
                    } else {
                        // Default to customer if no doc
                        setUserRole('customer');
                        setUserData(null);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            } else {
                setUser(null);
                setUserRole(null);
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email, password, additionalData = {}) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        // Create user doc
        await setDoc(doc(db, 'users', newUser.uid), {
            email: newUser.email,
            role: 'customer',
            createdAt: new Date(),
            ...additionalData
        });

        return userCredential;
    };

    const logout = async () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, userRole, userData, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
