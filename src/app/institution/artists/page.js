'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '@/components/Navbar';
import styles from './artists.module.css';

export default function ManageArtists() {
    const { user } = useAuth();
    const [artists, setArtists] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newArtist, setNewArtist] = useState({ name: '', role: '', bio: '', image: null });
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchArtists = async () => {
            const docRef = doc(db, 'institutions', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && docSnap.data().artists) {
                setArtists(docSnap.data().artists);
            }
            setLoading(false);
        };
        fetchArtists();
    }, [user]);

    const handleInputChange = (e) => {
        setNewArtist({ ...newArtist, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setNewArtist({ ...newArtist, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAddArtist = async (e) => {
        e.preventDefault();
        if (!user || !newArtist.name) return;

        let imageUrl = '';
        if (newArtist.image) {
            const imageRef = ref(storage, `institutions/${user.uid}/artists/${newArtist.image.name}`);
            await uploadBytes(imageRef, newArtist.image);
            imageUrl = await getDownloadURL(imageRef);
        }

        const artistToAdd = { ...newArtist, id: Date.now().toString(), imageUrl, image: null };
        const instDocRef = doc(db, 'institutions', user.uid);
        await updateDoc(instDocRef, { artists: arrayUnion(artistToAdd) });
        
        setArtists([...artists, artistToAdd]);
        setNewArtist({ name: '', role: '', bio: '', image: null });
        setImagePreview('');
        setShowForm(false);
    };
    
    const handleRemoveArtist = async (artistId) => {
        if (!user) return;
        const artistToRemove = artists.find(a => a.id === artistId);
        if (!artistToRemove) return;

        const instDocRef = doc(db, 'institutions', user.uid);
        await updateDoc(instDocRef, { artists: arrayRemove(artistToRemove) });

        setArtists(artists.filter(a => a.id !== artistId));
    };

    return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <main className={styles.container}>
                <div className={styles.header}>
                    <Link href="/institution/dashboard" className={styles.backLink}>
                        &larr;
                    </Link>
                    <h1>Manage Artists & Team</h1>
                </div>

                <button onClick={() => setShowForm(!showForm)} className={styles.btnAdd}>
                    {showForm ? 'Cancel' : '+ Add New Artist'}
                </button>

                {showForm && (
                    <form onSubmit={handleAddArtist} className={styles.form}>
                        <h2>Add New Artist/Team Member</h2>
                        <input name="name" value={newArtist.name} onChange={handleInputChange} placeholder="Artist Name" required />
                        <input name="role" value={newArtist.role} onChange={handleInputChange} placeholder="Role (e.g., Senior Guru, Vocalist)" />
                        <textarea name="bio" value={newArtist.bio} onChange={handleInputChange} placeholder="Short Biography"></textarea>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                        {imagePreview && <img src={imagePreview} alt="Preview" className={styles.preview} />}
                        <button type="submit">Add Artist</button>
                    </form>
                )}

                <div className={styles.artistGrid}>
                    {loading ? <p>Loading artists...</p> : artists.map(artist => (
                        <div key={artist.id} className={styles.artistCard}>
                            <img src={artist.imageUrl || 'https://via.placeholder.com/150'} alt={artist.name} />
                            <h3>{artist.name}</h3>
                            <p>{artist.role}</p>
                            <button onClick={() => handleRemoveArtist(artist.id)} className={styles.btnRemove}>Remove</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
