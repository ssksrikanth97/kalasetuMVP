'use client';
import Navbar from '@/components/Navbar';

export default function Privacy() {
    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
            <Navbar />
            <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: 'var(--color-maroon)', marginBottom: '2rem' }}>Privacy Policy</h1>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', opacity: 0.8 }}>Last updated: February 17, 2026</p>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Introduction</h2>
                        <p>Welcome to KalaSetu ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. Information We Collect</h2>
                        <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website.</p>
                        <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                            <li>Name and Contact Data (Email, Phone)</li>
                            <li>Credentials (Passwords)</li>
                            <li>Payment Data (processed securely)</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. How We Use Your Information</h2>
                        <p>We use personal information collected via our website for a variety of business purposes described below:</p>
                        <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                            <li>To facilitate account creation and logon process.</li>
                            <li>To send you marketing and promotional communications.</li>
                            <li>To fulfill and manage your orders.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>4. Contact Us</h2>
                        <p>If you have questions or comments about this policy, you may email us at <a href="mailto:privacy@kalasetu.art" style={{ color: 'var(--color-maroon)' }}>privacy@kalasetu.art</a>.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
