'use client';
import Navbar from '@/components/Navbar';
import styles from '../explore.module.css';

export default function ExploreArtists() {
    return (
        <div className="page-wrapper">
            <Navbar />
            <main className={styles.pageContainer}>
                <section className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>Discover the Maestros</h1>
                    <p className={styles.heroSubtitle}>
                        Explore a curated list of India's finest classical artists, preserving the heritage of music, dance, and fine arts.
                    </p>
                </section>

                <div className={styles.mainContent}>
                    {/* Search & Filter Bar */}
                    <div className={styles.searchBar}>
                        <span style={{ fontSize: '1.2rem', color: '#9ca3af' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search by artist name, art form, or location..."
                            className={styles.searchInput}
                        />
                        <button className={styles.filterBtn}>
                            <span>Filter</span>
                            <span>▼</span>
                        </button>
                    </div>

                    {/* Artists Grid */}
                    <div className={styles.grid}>
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className={styles.card}>
                                <div className={styles.cardImage}>
                                    👤
                                    <span className={styles.cardBadge}>Verified</span>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Artist Name {item}</h3>
                                    <p className={styles.cardSubtitle}>Bharatnatyam • 10 Years Exp</p>

                                    <div className={styles.cardMeta}>
                                        <span>📍 Bangalore</span>
                                        <span>⭐ 4.9 (120)</span>
                                    </div>

                                    <div className={styles.cardActions}>
                                        <button className={styles.btnSecondary}>View Profile</button>
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
