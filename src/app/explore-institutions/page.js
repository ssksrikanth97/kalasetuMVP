'use client';
import Navbar from '@/components/Navbar';
import styles from '../explore.module.css';

export default function ExploreInstitutions() {
    return (
        <div className="page-wrapper">
            <Navbar />
            <main className={styles.pageContainer}>
                <section className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>Premier Institutions</h1>
                    <p className={styles.heroSubtitle}>
                        Join academies that uphold the traditions of Indian Classical Arts.
                        Find your perfect place to learn and grow.
                    </p>
                </section>

                <div className={styles.mainContent}>
                    {/* Search Bar */}
                    <div className={styles.searchBar}>
                        <h2 style={{ fontSize: '1.2rem', color: '#1f2937', marginRight: '1rem', fontWeight: 600 }}>Find Institution</h2>
                        <input
                            type="text"
                            placeholder="e.g. Carnatic Music Academy, Kathak Kendra..."
                            className={styles.searchInput}
                        />
                        <button className={styles.filterBtn}>
                            <span>All Forms</span>
                            <span>▼</span>
                        </button>
                    </div>

                    <div className={styles.grid}>
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className={styles.card}>
                                <div className={styles.cardImage}>
                                    🏛️
                                    <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#ffd700', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>Featured</span>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Classical Arts Academy {item}</h3>
                                    <p className={styles.cardSubtitle}>Music • Dance • Fine Arts</p>

                                    <div className={styles.cardMeta} style={{ justifyContent: 'space-between' }}>
                                        <span>📍 Chennai, India</span>
                                        <span>🎓 50+ Courses</span>
                                    </div>

                                    <div className={styles.cardActions}>
                                        <button className={styles.btnPrimary}>View Courses</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
