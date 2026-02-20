'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '@/components/Navbar';
import styles from '@/app/artist/onboarding/onboarding.module.css';

const Steps = { 1: 'Personal Details', 2: 'Professional Info', 3: 'Media' };

export default function ArtistOnboarding() {
    const { user } = useAuth();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form Data State
    const [personalDetails, setPersonalDetails] = useState({ name: '', location: '', specialization: '', phone: '', gender: '' });
    const [professionalDetails, setProfessionalDetails] = useState({ bio: '', experience: '', instagram: '', youtube: '', website: '' });
    const [media, setMedia] = useState({ profilePicture: null, gallery: [] });
    const [preview, setPreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    useEffect(() => {
        const fetchArtistData = async () => {
            if (user?.uid) {
                try {
                    const docRef = doc(db, 'artists', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setPersonalDetails(prev => ({
                            ...prev,
                            ...data.personalDetails,
                            phone: data.personalDetails?.phone || data.phone || prev.phone
                        }));
                        setProfessionalDetails(prev => ({
                            ...prev,
                            ...data.professionalDetails
                        }));

                        // If phone or name is missing in artist doc, try to fetch from user doc
                        if (!data.personalDetails?.name || !data.personalDetails?.phone) {
                            const userDocRef = doc(db, 'users', user.uid);
                            const userDocSnap = await getDoc(userDocRef);
                            if (userDocSnap.exists()) {
                                const userData = userDocSnap.data();
                                setPersonalDetails(prev => ({
                                    ...prev,
                                    name: prev.name || userData.name || '',
                                    phone: prev.phone || userData.phone || ''
                                }));
                            }
                        }

                        // Set media state if it exists
                        if (data.media) {
                            setMedia(prev => ({
                                ...prev,
                                profilePicture: null, // Keep file input empty, will use URL for preview
                                gallery: [] // Keep file input empty
                            }));

                            if (data.media.profilePicture) {
                                setPreview(data.media.profilePicture);
                            }

                            if (data.media.gallery && Array.isArray(data.media.gallery)) {
                                setGalleryPreviews(data.media.gallery);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error fetching artist details:", error);
                }
            }
        };

        fetchArtistData();
    }, [user]);

    const handlePersonalChange = (e) => setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
    const handleProfessionalChange = (e) => setProfessionalDetails({ ...professionalDetails, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setMedia({ ...media, profilePicture: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleGalleryChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setMedia(prev => ({ ...prev, gallery: [...prev.gallery, ...files] }));

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setGalleryPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async () => {
        if (!user) return alert('You must be logged in.');
        setLoading(true);

        try {
            let profilePictureUrl = preview; // Default to existing preview (URL) if no new file
            if (media.profilePicture && media.profilePicture instanceof File) {
                const fileRef = ref(storage, `artists/${user.uid}/profile_${Date.now()}_${media.profilePicture.name}`);
                await uploadBytes(fileRef, media.profilePicture);
                profilePictureUrl = await getDownloadURL(fileRef);
            }

            // Upload new gallery images
            let newGalleryUrls = [];
            if (media.gallery && media.gallery.length > 0) {
                const uploadPromises = media.gallery.map(async (file) => {
                    if (file instanceof File) {
                        const fileRef = ref(storage, `artists/${user.uid}/gallery_${Date.now()}_${file.name}`);
                        await uploadBytes(fileRef, file);
                        return getDownloadURL(fileRef);
                    }
                    return null;
                });
                const results = await Promise.all(uploadPromises);
                newGalleryUrls = results.filter(url => url !== null);
            }

            // Combine existing gallery URLs (from previews) with new ones
            // Filter out blob URLs (local previews) from galleryPreviews to get only remote URLs
            const existingGalleryUrls = galleryPreviews.filter(url => url.startsWith('http') && !url.startsWith('blob:'));
            const finalGalleryUrls = [...existingGalleryUrls, ...newGalleryUrls];

            const artistData = {
                personalDetails,
                professionalDetails,
                media: {
                    profilePicture: profilePictureUrl,
                    gallery: finalGalleryUrls
                },
                // userId: user.uid, // Redundant if doc ID is uid
                isProfileComplete: true,
                updatedAt: new Date(),
            };

            // Ensure document exists for the user before setting artist data if needed, 
            // but for artist collection we usually use setDoc(..., {merge: true}) which is fine.
            // However, we must ensure we are writing to the correct path that rules allow: artists/{userId}

            await setDoc(doc(db, 'artists', user.uid), artistData, { merge: true });

            // Also update the main user document role if not already artist
            await setDoc(doc(db, 'users', user.uid), { role: 'artist' }, { merge: true });

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
                            <div
                                key={step}
                                className={`${styles.step} ${currentStep === step ? styles.activeStep : ''}`}
                                onClick={() => setCurrentStep(step)}
                                style={{ cursor: 'pointer' }}
                            >
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
                                <label>Phone Number</label>
                                <input name="phone" value={personalDetails.phone || ''} onChange={handlePersonalChange} placeholder="e.g., +91 98765 43210" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Gender</label>
                                <select name="gender" value={personalDetails.gender || ''} onChange={handlePersonalChange} className={styles.selectInput}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-binary">Non-binary</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
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

                            <h3>Social Media Presence</h3>
                            <div className={styles.inputGroup}>
                                <label>Instagram Profile URL</label>
                                <input name="instagram" value={professionalDetails.instagram || ''} onChange={handleProfessionalChange} placeholder="https://instagram.com/yourhandle" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>YouTube Channel URL</label>
                                <input name="youtube" value={professionalDetails.youtube || ''} onChange={handleProfessionalChange} placeholder="https://youtube.com/@yourchannel" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Website / Portfolio URL</label>
                                <input name="website" value={professionalDetails.website || ''} onChange={handleProfessionalChange} placeholder="https://yourwebsite.com" />
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <h2>Media Upload</h2>
                            <div className={styles.inputGroup}>
                                <label>Profile Picture</label>
                                <input type="file" onChange={handleFileChange} accept="image/*" />
                                {preview && <img src={preview} alt="Profile Preview" className={styles.previewImage} />}
                            </div>

                            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
                                <label>Gallery Photos (Select multiple)</label>
                                <input type="file" multiple onChange={handleGalleryChange} accept="image/*" />
                                <div className={styles.galleryPreview}>
                                    {galleryPreviews.map((src, index) => (
                                        <img key={index} src={src} alt={`Gallery Preview ${index + 1}`} className={styles.galleryImage} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={styles.navigation} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button onClick={() => router.push('/artist/dashboard')} className={styles.btnSecondary} style={{ marginRight: 'auto', outline: 'none', border: 'none', backgroundColor: 'transparent', textDecoration: 'underline' }}>Cancel</button>
                        {currentStep > 1 ? <button onClick={prevStep} className={styles.btnSecondary}>Back</button> : null}
                        {currentStep < 3 && <button onClick={nextStep} className={styles.btnPrimary}>Next</button>}
                        {currentStep === 3 && <button onClick={handleSubmit} disabled={loading} className={styles.btnPrimary}>{loading ? 'Saving...' : 'Finish & Save'}</button>}
                    </div>
                </div>
            </main>
        </div>
    );
}
