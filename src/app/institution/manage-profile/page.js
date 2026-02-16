'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '@/components/Navbar';
import styles from './manage-profile.module.css';

export default function ManageProfile() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({
        basicDetails: { instituteName: '', city: '', yearEstablished: '' },
        about: { description: '' },
        contact: { primaryEmail: '', website: '' },
        media: { logoUrl: '' },
    });
    const [logoImage, setLogoImage] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');

    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            const docRef = doc(db, 'institutions', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setProfile({
                    basicDetails: data.basicDetails || { instituteName: '', city: '', yearEstablished: '' },
                    about: data.about || { description: '' },
                    contact: data.contact || { primaryEmail: '', website: '' },
                    media: data.media || { logoUrl: '' },
                });
                setLogoPreview(data.media?.logoUrl || '');
            }
        };
        fetchData();
    }, [user]);

    const handleInputChange = (section, field, value) => {
        setProfile(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setLogoImage(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let logoUrl = profile.media?.logoUrl;
            if (logoImage) {
                const logoRef = ref(storage, `institutions/${user.uid}/logo/${logoImage.name}`);
                await uploadBytes(logoRef, logoImage);
                logoUrl = await getDownloadURL(logoRef);
            }

            const updatedData = { ...profile, media: { ...profile.media, logoUrl } };
            await updateDoc(doc(db, 'institutions', user.uid), updatedData);
            
            alert('Profile updated successfully!');
            router.push('/institution/dashboard');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <main className={styles.container}>
                <form onSubmit={handleUpdate} className={styles.form}>
                    <header className={styles.header}>
                        <div className={styles.headerLeft}>
                            <Link href="/institution/dashboard" className={styles.backLink}>
                                &larr;
                            </Link>
                            <h1>Edit Institution Profile</h1>
                        </div>
                        <button type="submit" className={styles.saveButton} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </header>

                    <div className={styles.section}>
                        <h2>Basic Details</h2>
                        <div className={styles.fieldGrid}>
                            <div className={styles.field}>
                                <label>Institute Name</label>
                                <input value={profile.basicDetails.instituteName} onChange={e => handleInputChange('basicDetails', 'instituteName', e.target.value)} />
                            </div>
                            <div className={styles.field}>
                                <label>City</label>
                                <input value={profile.basicDetails.city} onChange={e => handleInputChange('basicDetails', 'city', e.target.value)} />
                            </div>
                            <div className={styles.field}>
                                <label>Year Established</label>
                                <input type="number" value={profile.basicDetails.yearEstablished} onChange={e => handleInputChange('basicDetails', 'yearEstablished', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Contact Information</h2>
                        <div className={styles.fieldGrid}>
                            <div className={styles.field}>
                                <label>Primary Email</label>
                                <input type="email" value={profile.contact.primaryEmail} onChange={e => handleInputChange('contact', 'primaryEmail', e.target.value)} />
                            </div>
                            <div className={styles.field}>
                                <label>Website</label>
                                <input type="url" value={profile.contact.website} onChange={e => handleInputChange('contact', 'website', e.target.value)} placeholder="https://example.com" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>About the Institution</h2>
                        <div className={styles.field}>
                            <label>Description</label>
                            <textarea value={profile.about.description} onChange={e => handleInputChange('about', 'description', e.target.value)} rows="6"></textarea>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Institution Logo</h2>
                        <div className={styles.field}>
                           <input type="file" onChange={handleFileChange} accept="image/*" />
                           {logoPreview && <img src={logoPreview} alt="Logo Preview" className={styles.preview} />}
                        </div>
                    </div>

                </form>
            </main>
        </div>
    );
}
