'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, userRole, loading, logout } = useAuth();
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith('/auth/');

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--color-maroon)' }}>
                        KalaSetu
                    </span>
                </Link>

                <div style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
                    <Link href="/explore-artists" className="nav-link">Artists</Link>
                    <Link href="/explore-institutions" className="nav-link">Institutions</Link>
                    <Link href="/shop" className="nav-link">Shop</Link>
                    <Link href="/about" className="nav-link">About</Link>

                    {!loading && (
                        user ? (
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Link href={`/${userRole || 'customer'}/dashboard`} className="btn-primary" style={{ padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center' }}>
                                    Dashboard
                                </Link>
                                <button onClick={logout} className="btn-secondary" style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    border: '1px solid var(--color-maroon)',
                                    background: 'transparent',
                                    color: 'var(--color-maroon)',
                                    borderRadius: '8px',
                                    fontWeight: '600'
                                }}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            !isAuthPage && (
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                    <Link href="/auth/login" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Login</Link>
                                    <Link href="/auth/signup" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Join</Link>
                                </div>
                            )
                        )
                    )}
                </div>
            </div>
        </nav>
    );
}
