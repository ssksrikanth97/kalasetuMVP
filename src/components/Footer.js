'use client';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer" style={{ borderTop: '1px solid #e5e7eb', backgroundColor: '#fff', marginTop: 'auto' }}>
            <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-maroon)', marginBottom: '1rem' }}>KalaSetu</h3>
                <p style={{ marginBottom: '2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 2rem', color: '#4b5563', lineHeight: '1.6' }}>
                    "Preserving the past, inspiring the future."<br />
                    Join us in our mission to keep the eternal flame of Indian Classical Arts burning bright.
                </p>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <Link href="/about" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-maroon">About Us</Link>
                    <Link href="/contact" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-maroon">Contact</Link>
                    <Link href="/privacy" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-maroon">Privacy Policy</Link>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>© 2026 KalaSetu. All rights reserved.</p>
            </div>
        </footer>
    );
}
