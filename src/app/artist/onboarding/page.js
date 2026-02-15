'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '@/components/Navbar';
import styles from './onboarding.module.css';

const Steps = { 1: 'Personal Details', 2: 'Professional Info', 3: 'Media' };

export default function ArtistOnboarding() {
    const { user } = useAuth();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    
    // Form Data State
    const [personalDetails, setPersonalDetails] = useState({ name: '', location: '', specialization: '' });
    const [professionalDetails, setProfessionalDetails] = useState({ bio: '', experience: '' });
    const [media, setMedia] = useState({ profilePicture: null, gallery: [] });
    const [preview, setPreview] = useState(null);

    const handlePersonalChange = (e) => setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
    const handleProfessionalChange = (e) => setProfessionalDetails({ ...professionalDetails, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setMedia({ ...media, profilePicture: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async () => {
        if (!user) return alert('You must be logged in.');
        setLoading(true);

        try {
            let profilePictureUrl = '';
            if (media.profilePicture) {
                const fileRef = ref(storage, `artists/${user.uid}/profile_${media.profilePicture.name}`);
                await uploadBytes(fileRef, media.profilePicture);
                profilePictureUrl = await getDownloadURL(fileRef);
            }

            const artistData = {
                personalDetails,
                professionalDetails,
                media: { profilePicture: profilePictureUrl, gallery: [] }, // Gallery to be handled separately
                userId: user.uid,
                isProfileComplete: true,
            };

            await setDoc(doc(db, 'artists', user.uid), artistData, { merge: true });
            
            router.push('/artist/dashboard');
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
                            <h2>Personal Details</h2>
                            <div className={styles.inputGroup}>
                                <label>Full Name</label>
                                <input name="name" value={personalDetails.name} onChange={handlePersonalChange} placeholder="e.g., Ravi Shankar" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Location</label>
                                <input name="location" value={personalDetails.location} onChange={handlePersonalChange} placeholder="e.g., Mumbai, India" />
                            </div>
                             <div className={styles.inputGroup}>
                                <label>Specialization</label>
                                <input name="specialization" value={personalDetails.specialization} onChange={handlePersonalChange} placeholder="e.g., Sitar Player, Kathak Dancer" />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <h2>Professional Information</h2>
                            <div className={styles.inputGroup}>
                                <label>Biography / About</label>
                                <textarea name="bio" value={professionalDetails.bio} onChange={handleProfessionalChange} rows="5" placeholder="Tell us about your artistic journey..."></textarea>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Years of Experience</label>
                                <input name="experience" type="number" value={professionalDetails.experience} onChange={handleProfessionalChange} placeholder="e.g., 15" />
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <h2>Media Upload</h2>
                            <div className={styles.inputGroup}>
                                <label>Profile Picture</label>
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
