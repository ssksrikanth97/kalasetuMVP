'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import styles from '../explore.module.css';

export default function About() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fcfcfc', fontFamily: 'var(--font-body)' }}>
            <Navbar />

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <h1 className={styles.heroTitle}>Connecting Tradition with Opportunity</h1>
                <p className={styles.heroSubtitle}>
                    KalaSetu is the digital bridge for Indian Classical Arts—uniting artists, institutions, and audiences in one seamless ecosystem.
                </p>
            </section>

            <main style={{ flex: 1 }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>

                    {/* Mission Statement */}
                    <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '2rem',
                            color: '#1f2937',
                            marginBottom: '1.5rem',
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            Our Purpose
                            <span style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '3px', background: 'var(--color-gold)' }}></span>
                        </h2>
                        <div style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#4b5563', maxWidth: '800px', margin: '2rem auto 0' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                KalaSetu is built on a simple belief: <strong>art deserves visibility</strong>. Our mission is to bridge the gap between creators and opportunities, transforming how Indian Classical Arts are discovered and supported.
                            </p>
                            <p>
                                We bring together artists, cultural institutions, and organizers into a unified digital ecosystem, ensuring talent is showcased with dignity and scale.
                            </p>
                        </div>
                    </div>

                    {/* Vision & Mission Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
                        <div style={{
                            background: '#fff',
                            padding: '2.5rem',
                            borderRadius: '16px',
                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
                            border: '1px solid #f3f4f6',
                            transition: 'transform 0.3s ease'
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👁️</div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-maroon)', marginBottom: '1rem' }}>Our Vision</h3>
                            <p style={{ color: '#666', lineHeight: '1.7', fontSize: '1.05rem' }}>
                                To become the most trusted digital infrastructure for the arts—empowering creators and organizations to connect, collaborate, and grow through technology.
                            </p>
                        </div>

                        <div style={{
                            background: '#fff',
                            padding: '2.5rem',
                            borderRadius: '16px',
                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
                            border: '1px solid #f3f4f6',
                            transition: 'transform 0.3s ease'
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-maroon)', marginBottom: '1rem' }}>Our Mission</h3>
                            <ul style={{ padding: 0, listStyle: 'none' }}>
                                {[
                                    "Empower artists with digital presence",
                                    "Simplify event & catalog management",
                                    "Connect verified talent with institutions",
                                    "Automate workflows to reduce effort",
                                    "Build a scalable cultural network"
                                ].map((item, i) => (
                                    <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', color: '#555', fontSize: '1rem' }}>
                                        <span style={{ color: 'var(--color-gold)', marginRight: '10px', fontSize: '1.2rem' }}>•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* What We Offer - 3 Col Grid */}
                    <div style={{ marginBottom: '6rem' }}>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '2rem',
                            color: '#1f2937',
                            marginBottom: '3rem',
                            textAlign: 'center'
                        }}>
                            Empowering the Ecosystem
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            {/* Card 1 */}
                            <div style={{ padding: '2rem', background: '#fff9f9', borderRadius: '12px', borderLeft: '4px solid var(--color-maroon)' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-maroon)', marginBottom: '1rem' }}>For Artists</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {[
                                        "Structured digital portfolios",
                                        "Identity & career visibility",
                                        "Direct organizer connections",
                                        "Opportunity discovery"
                                    ].map((t, i) => <li key={i} style={{ marginBottom: '0.5rem', color: '#555' }}>✓ {t}</li>)}
                                </ul>
                            </div>

                            {/* Card 2 */}
                            <div style={{ padding: '2rem', background: '#fffef0', borderRadius: '12px', borderLeft: '4px solid var(--color-gold)' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#b45309', marginBottom: '1rem' }}>For Organizers</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {[
                                        "Verified talent discovery",
                                        "Smart search tools",
                                        "Faster onboarding",
                                        "Data-driven insights"
                                    ].map((t, i) => <li key={i} style={{ marginBottom: '0.5rem', color: '#555' }}>✓ {t}</li>)}
                                </ul>
                            </div>

                            {/* Card 3 */}
                            <div style={{ padding: '2rem', background: '#f0f9ff', borderRadius: '12px', borderLeft: '4px solid #0ea5e9' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0369a1', marginBottom: '1rem' }}>For Everyone</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {[
                                        "Standardized profiles",
                                        "Transparent discovery",
                                        "AI-assisted matching",
                                        "Cultural infrastructure"
                                    ].map((t, i) => <li key={i} style={{ marginBottom: '0.5rem', color: '#555' }}>✓ {t}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Approach & Commitment */}
                    <div style={{
                        background: '#1f2937',
                        color: '#fff',
                        borderRadius: '20px',
                        padding: '3rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem'
                    }}>
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>Our Approach</h3>
                            <p style={{ lineHeight: '1.7', opacity: 0.9 }}>
                                We honor cultural roots while embracing modern structure. KalaSetu ensures artists are presented with context and credibility. We use technology as a <em>bridge</em>—not a replacement—to amplify traditional talent and help it find the right stage.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>Our Commitment</h3>
                            <p style={{ lineHeight: '1.7', opacity: 0.9 }}>
                                We are dedicated to providing reliable technology, fair visibility, and continuous innovation. Our goal is simple: to ensure that every artist finds their audience, and every audience discovers the beauty of Indian Classical Arts.
                            </p>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
