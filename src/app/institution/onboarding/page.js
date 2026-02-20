'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '@/components/Navbar';
import styles from '@/app/artist/onboarding/onboarding.module.css'; // Reusing the same CSS

const Steps = { 1: 'Basic Information', 2: 'About & Contact', 3: 'Logo & Media' };

export default function InstitutionOnboarding() {
    const { user } = useAuth();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form Data
    const [basicDetails, setBasicDetails] = useState({ instituteName: '', city: '', yearEstablished: '' });
    const [about, setAbout] = useState({ description: '' });
    const [contact, setContact] = useState({ primaryEmail: '', website: '' });
    const [media, setMedia] = useState({ logoUrl: null });
    const [preview, setPreview] = useState(null);

    const handleBasicChange = (e) => setBasicDetails({ ...basicDetails, [e.target.name]: e.target.value });
    const handleAboutChange = (e) => setAbout({ ...about, [e.target.name]: e.target.value });
    const handleContactChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setMedia({ ...media, logoUrl: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async () => {
        if (!user) return alert('You must be logged in.');
        setLoading(true);

        try {
            let logoUrlString = '';
            if (media.logoUrl) {
                const fileRef = ref(storage, `institutions/${user.uid}/logo_${media.logoUrl.name}`);
                await uploadBytes(fileRef, media.logoUrl);
                logoUrlString = await getDownloadURL(fileRef);
            }

            const institutionData = {
                basicDetails,
                about,
                contact,
                media: { logoUrl: logoUrlString },
                userId: user.uid,
                isProfileComplete: true,
            };

            await setDoc(doc(db, 'institutions', user.uid), institutionData, { merge: true });

            router.push('/institution/dashboard');
        } catch (error) {
            console.error("Onboarding error:", error);
            alert("Failed to save profile. " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <main className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <div className={styles.stepper}>
                        {[1, 2, 3].map(step => (
                            <div key={step} className={`${styles.step} ${currentStep === step ? styles.activeStep : ''}`}>
                                {Steps[step]}
                            </div>
                        ))}
                    </div>

                    {currentStep === 1 && (
                        <div>
                            <h2>Basic Information</h2>
                            <div className={styles.inputGroup}>
                                <label>Institution Name</label>
                                <input name="instituteName" value={basicDetails.instituteName} onChange={handleBasicChange} placeholder="e.g., Kalakshetra Foundation" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>City, State</label>
                                <input name="city" value={basicDetails.city} onChange={handleBasicChange} placeholder="e.g., Chennai, Tamil Nadu" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Year Established</label>
                                <input name="yearEstablished" type="number" value={basicDetails.yearEstablished} onChange={handleBasicChange} placeholder="e.g., 1936" />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <h2>About & Contact</h2>
                            <div className={styles.inputGroup}>
                                <label>About the Institution</label>
                                <textarea name="description" value={about.description} onChange={handleAboutChange} rows="5" placeholder="Describe the mission and history of your institution..."></textarea>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Primary Email</label>
                                <input name="primaryEmail" type="email" value={contact.primaryEmail} onChange={handleContactChange} placeholder="e.g., contact@kalakshetra.com" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Website (Optional)</label>
                                <input name="website" type="url" value={contact.website} onChange={handleContactChange} placeholder="e.g., https://www.kalakshetra.in" />
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <h2>Logo & Media</h2>
                            <div className={styles.inputGroup}>
                                <label>Upload Logo</label>
                                <input type="file" onChange={handleFileChange} accept="image/*" />
                                {preview && <img src={preview} alt="Preview" className={styles.previewImage} />}
                            </div>
                        </div>
                    )}

                    <div className={styles.navigation}>
                        {currentStep > 1 && <button onClick={prevStep} className={styles.btnSecondary}>Back</button>}
                        {currentStep < 3 && <button onClick={nextStep} className={styles.btnPrimary}>Next</button>}
                        {currentStep === 3 && <button onClick={handleSubmit} disabled={loading} className={styles.btnPrimary}>{loading ? 'Saving...' : 'Finish & Save'}</button>}
                    </div>
                </div>
            </main>
        </div>
    );
}
