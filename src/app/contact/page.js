'use client';
import Navbar from '@/components/Navbar';

export default function Contact() {
    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
            <Navbar />
            <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: 'var(--color-maroon)', marginBottom: '2rem' }}>Contact Us</h1>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We'd love to hear from you! Whether you have questions about our artists, products, or services, please reach out.
                    </p>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Email</h3>
                            <a href="mailto:support@kalasetu.art" style={{ color: 'var(--color-maroon)' }}>support@kalasetu.art</a>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Phone</h3>
                            <p>+91 98765 43210</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
