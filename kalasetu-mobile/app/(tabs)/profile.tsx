import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProfileScreen() {
    const { user, loading, login, signup, logout } = useAuth();

    // Auth UI State
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Dashboard State
    const [profileCompletion, setProfileCompletion] = useState(0);

    useEffect(() => {
        // Calculate a dummy profile completion based on available data when user logs in
        if (user) {
            let score = 0;
            if (user.displayName || name) score += 50;
            if (user.emailVerified) score += 50;
            // Native Firebase Auth doesn't have deep custom claims loaded by default without checking Firestore, 
            // but we'll use a placeholder score for now to mimic the design.
            setProfileCompletion(score || 50);
        }
    }, [user]);

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        try {
            setIsSubmitting(true);
            if (isLoginMode) {
                await login(email, password);
            } else {
                await signup(email, password, { name });
            }
        } catch (error) {
            let msg = "An error occurred. Please try again.";
            if (error.code === 'auth/invalid-email') msg = 'Invalid email address.';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') msg = 'Invalid email or password.';
            if (error.code === 'auth/email-already-in-use') msg = 'Email already in use.';
            Alert.alert("Authentication Failed", msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#f1501c" />
            </View>
        );
    }

    // --- AUTHENTICATED DASHBOARD VIEW ---
    if (user) {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollPadding}>
                    <Text style={styles.headerTitle}>Customer Dashboard</Text>

                    <View style={[styles.card, styles.welcomeCard]}>
                        <Text style={styles.welcomeTitle}>Welcome back, {user.displayName || name || 'Art Appreciator'}!</Text>
                        <Text style={styles.welcomeText}>Explore KalaSetu to find verified artists and authentic products.</Text>
                    </View>

                    {profileCompletion < 100 && (
                        <View style={[styles.card, styles.warningCard]}>
                            <View style={styles.rowBetween}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.warningTitle}>Complete Your Profile</Text>
                                    <Text style={styles.warningText}>Your profile is {profileCompletion}% complete. Add your details for a better experience.</Text>
                                </View>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Text style={styles.actionBtnText}>Complete Now</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { width: `${profileCompletion}%` }]} />
                            </View>
                        </View>
                    )}

                    <View style={styles.grid}>
                        <View style={styles.gridCard}>
                            <View style={styles.cardHeader}>
                                <FontAwesome name="user" size={18} color="#2C1A1D" />
                                <Text style={styles.cardTitle}>My Profile</Text>
                            </View>
                            <Text style={styles.cardInfo}>Name: {user.displayName || name || 'N/A'}</Text>
                            <Text style={styles.cardInfo} numberOfLines={1}>Email: {user.email}</Text>

                            <TouchableOpacity style={styles.secondaryBtn}>
                                <Text style={styles.secondaryBtnText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.gridCard}>
                            <View style={styles.cardHeader}>
                                <FontAwesome name="cube" size={18} color="#2C1A1D" />
                                <Text style={styles.cardTitle}>My Orders</Text>
                            </View>
                            <Text style={styles.cardInfo}>View and track your recent purchases.</Text>

                            <TouchableOpacity style={styles.primaryBtn}>
                                <Text style={styles.primaryBtnText}>View History</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.card, styles.artistCard]}>
                        <Text style={styles.artistTitle}>🎨 Are you an Artist?</Text>
                        <Text style={styles.artistText}>Showcase your talent and reach a global audience.</Text>
                        <TouchableOpacity style={styles.maroonBtn}>
                            <Text style={styles.maroonBtnText}>Join as Artist</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                        <FontAwesome name="sign-out" size={18} color="#dc2626" />
                        <Text style={styles.logoutText}>Sign Out</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }

    // --- LOGGED OUT VIEW (AUTH FORM) ---
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.authContainer}>

                <View style={styles.authHeader}>
                    <Text style={styles.authTitle}>KalaSetu</Text>
                    <Text style={styles.authSubtitle}>{isLoginMode ? 'Sign in to your account' : 'Create a new account'}</Text>
                </View>

                <View style={styles.formContainer}>
                    {!isLoginMode && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="E.g. Srikanth"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    )}

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="you@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    {isLoginMode && (
                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
                            <Text style={styles.linkText}>Forgot password?</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
                        onPress={handleAuth}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.submitBtnText}>{isLoginMode ? 'Sign In' : 'Create Account'}</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.authFooter}>
                    <Text style={styles.footerText}>
                        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                    </Text>
                    <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
                        <Text style={[styles.linkText, { fontWeight: 'bold' }]}>
                            {isLoginMode ? 'Sign up' : 'Log in'}
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    // --- AUTH STYLES ---
    authContainer: { flexGrow: 1, justifyContent: 'center', padding: 24 },
    authHeader: { alignItems: 'center', marginBottom: 40 },
    authTitle: { fontSize: 32, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 8 },
    authSubtitle: { fontSize: 16, color: '#6b7280' },

    formContainer: { backgroundColor: 'white', padding: 24, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    inputGroup: { marginBottom: 16 },
    label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
    input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15 },

    submitBtn: { backgroundColor: '#f1501c', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
    submitBtnDisabled: { backgroundColor: '#fca5a5' },
    submitBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

    linkText: { color: '#f1501c', fontSize: 14 },
    authFooter: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
    footerText: { color: '#6b7280', fontSize: 14 },

    // --- DASHBOARD STYLES ---
    scrollPadding: { padding: 20 },
    headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 20 },

    card: { backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    welcomeTitle: { fontSize: 20, fontWeight: 'bold', color: '#111', marginBottom: 8 },
    welcomeText: { fontSize: 14, color: '#666', lineHeight: 20 },

    warningCard: { backgroundColor: '#fff8f1', borderLeftWidth: 4, borderLeftColor: '#f59e0b' },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    warningTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 4 },
    warningText: { fontSize: 12, color: '#666', paddingRight: 10 },
    actionBtn: { backgroundColor: '#f59e0b', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
    actionBtnText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    progressBarBg: { height: 8, backgroundColor: '#fef3c7', borderRadius: 4, marginTop: 16, overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: '#f59e0b' },

    grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    gridCard: { width: '48%', backgroundColor: 'white', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#2C1A1D', marginLeft: 8 },
    cardInfo: { fontSize: 13, color: '#666', marginBottom: 6 },

    primaryBtn: { backgroundColor: '#f1501c', paddingVertical: 8, borderRadius: 6, alignItems: 'center', marginTop: 12 },
    primaryBtnText: { color: 'white', fontSize: 13, fontWeight: 'bold' },
    secondaryBtn: { backgroundColor: '#f3f4f6', paddingVertical: 8, borderRadius: 6, alignItems: 'center', marginTop: 12 },
    secondaryBtnText: { color: '#374151', fontSize: 13, fontWeight: 'bold' },

    artistCard: { backgroundColor: '#fff1f2', borderColor: '#fecdd3', borderWidth: 1 },
    artistTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 8 },
    artistText: { fontSize: 14, color: '#666', marginBottom: 16 },
    maroonBtn: { backgroundColor: '#2C1A1D', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
    maroonBtnText: { color: 'white', fontSize: 14, fontWeight: 'bold' },

    logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, marginTop: 10 },
    logoutText: { color: '#dc2626', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }
});
