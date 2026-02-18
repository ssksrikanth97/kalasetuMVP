'use client';
import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './institution.module.css';

const Gallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#eee', marginBottom: '2rem' }}>
            {images.map((img, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: index === currentIndex ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            ))}

            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.7)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ←
                    </button>
                    <button
                        onClick={nextSlide}
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.7)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        →
                    </button>
                    <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: idx === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s'
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

function DetailsContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();
    const [institution, setInstitution] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstitution = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'institutions', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setInstitution({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such institution!");
                }
            } catch (error) {
                console.error("Error fetching institution:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstitution();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--color-maroon)' }}>
                Loading...
            </div>
        );
    }

    if (!institution) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>Institution not found</h2>
                <button
                    onClick={() => router.push('/explore-institutions')}
                    className="btn-primary"
                >
                    Back to Explore
                </button>
            </div>
        );
    }

    const { basicDetails, gallery } = institution;

    return (
        <>
            {/* Hero Section */}
            <div style={{
                backgroundColor: 'var(--color-maroon)',
                color: 'white',
                padding: '4rem 0',
                textAlign: 'center',
                backgroundImage: 'url("/pattern-bg.png")', // Assumed pattern
                backgroundBlendMode: 'overlay'
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{basicDetails?.instituteName}</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>📍 {basicDetails?.city || 'Location not available'}</p>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 2, paddingBottom: '4rem' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>

                    {/* Gallery Section */}
                    {gallery && gallery.length > 0 && (
                        <div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-maroon)' }}>Gallery</h2>
                            <Gallery images={gallery} />
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', marginTop: '2rem' }}>
                        {/* Main Content */}
                        <div>
                            <div style={{ marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-maroon)', borderBottom: '2px solid #f3f4f6', paddingBottom: '0.5rem' }}>About Us</h2>
                                <p style={{ lineHeight: '1.8', color: '#4b5563', whiteSpace: 'pre-line' }}>
                                    {institution.description || "No description provided for this institution yet."}
                                </p>
                            </div>

                            {institution.achievements && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-maroon)', borderBottom: '2px solid #f3f4f6', paddingBottom: '0.5rem' }}>Achievements</h2>
                                    <p style={{ lineHeight: '1.8', color: '#4b5563' }}>{institution.achievements}</p>
                                </div>
                            )}

                            {/* Example Programs Section if available (placeholder structure) */}
                            {/* 
                            <div style={{ marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-maroon)' }}>Programs Offered</h2>
                                <ul style={{ listStyle: 'disc', listStylePosition: 'inside', color: '#4b5563' }}>
                                    <li>Bharatanatyam Diploma (3 Years)</li>
                                    <li>Carnatic Vocal Basics</li>
                                </ul>
                            </div> 
                            */}
                        </div>

                        {/* Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>Contact Info</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Email</p>
                                        <p style={{ fontWeight: '500' }}>{basicDetails?.email}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Phone</p>
                                        <p style={{ fontWeight: '500' }}>{basicDetails?.mobile}</p>
                                    </div>
                                    {basicDetails?.website && (
                                        <div>
                                            <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Website</p>
                                            <a href={basicDetails.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-maroon)', textDecoration: 'underline' }}>Visit Website</a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                className="btn-primary"
                                style={{ padding: '1rem', width: '100%', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                                onClick={() => alert("Enrollment feature coming soon!")}
                            >
                                📝 Request to Enroll
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default function InstitutionDetailsPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#fcfcfc' }}>
            <Navbar />
            <Suspense fallback={<div>Loading Details...</div>}>
                <DetailsContent />
            </Suspense>
        </div>
    );
}
