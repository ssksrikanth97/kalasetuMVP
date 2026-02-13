'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Navbar() {
    const { user, userRole, loading, logout } = useAuth();
    const { cartCount } = useCart();
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith('/auth/');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/" style={{ textDecoration: 'none', zIndex: 101, display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '180px', height: '50px' }}>
                        <Image
                            src="/logo.png"
                            alt="KalaSetu"
                            fill
                            style={{ objectFit: 'contain', objectPosition: 'left' }}
                            priority
                        />
                    </div>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle Navigation"
                >
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                </button>

                {/* Navigation Links */}
                <div className={`nav-links-container ${isMenuOpen ? 'active' : ''}`}>

                    <Link href="/explore-institutions" className="nav-link" onClick={() => setIsMenuOpen(false)}>Institutions</Link>
                    <Link href="/shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                    <Link href="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>

                    <Link href="/cart" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>🛒</span>
                        {cartCount > 0 && (
                            <span style={{
                                background: 'var(--color-maroon)',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 8px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {!loading && (
                        user ? (
                            <div className="auth-buttons">
                                <Link
                                    href={`/${userRole || 'customer'}/dashboard`}
                                    className="btn-primary"
                                    style={{ padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="btn-secondary" style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    border: '1px solid var(--color-maroon)',
                                    background: 'transparent',
                                    color: 'var(--color-maroon)',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    minWidth: '100px'
                                }}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            !isAuthPage && (
                                <div className="auth-buttons">
                                    <Link href="/auth/login" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textAlign: 'center' }} onClick={() => setIsMenuOpen(false)}>Login</Link>
                                    <Link href="/auth/signup" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textAlign: 'center' }} onClick={() => setIsMenuOpen(false)}>Join</Link>
                                </div>
                            )
                        )
                    )}
                </div>
            </div>

            <style jsx>{`
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    z-index: 101;
                }

                .hamburger {
                    display: block;
                    width: 24px;
                    height: 2px;
                    background: var(--color-maroon);
                    position: relative;
                    transition: all 0.3s ease-in-out;
                }

                .hamburger::before,
                .hamburger::after {
                    content: '';
                    position: absolute;
                    width: 24px;
                    height: 2px;
                    background: var(--color-maroon);
                    transition: all 0.3s ease-in-out;
                    left: 0;
                }

                .hamburger::before { top: -8px; }
                .hamburger::after { top: 8px; }

                .hamburger.open { background: transparent; }
                .hamburger.open::before { transform: rotate(45deg); top: 0; }
                .hamburger.open::after { transform: rotate(-45deg); top: 0; }

                .nav-links-container {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-lg);
                }

                .auth-buttons {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block;
                    }

                    .nav-links-container {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(255, 255, 255, 0.98);
                        backdrop-filter: blur(10px);
                        flex-direction: column;
                        justify-content: center;
                        padding: 2rem;
                        transform: translateY(-100%);
                        transition: transform 0.3s ease-in-out;
                        z-index: 100;
                    }

                    .nav-links-container.active {
                        transform: translateY(0);
                    }

                    .nav-link {
                        font-size: 1.5rem;
                        margin: 1rem 0;
                    }

                    .auth-buttons {
                        flex-direction: column;
                        width: 100%;
                        margin-top: 1rem;
                        gap: 1rem;
                    }

                    .auth-buttons a, .auth-buttons button {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </nav>
    );
}
