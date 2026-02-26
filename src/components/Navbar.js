'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, userRole, loading, logout } = useAuth();
    const { cartCount } = useCart();
    const { settings } = useStoreSettings();
    const pathname = usePathname();
    const router = useRouter();
    const isAuthPage = pathname?.startsWith('/auth/');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
            setIsMenuOpen(false); // Close mobile menu if open
        }
    };

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
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

                {/* Main Search Bar (Etsy Style) */}
                <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '600px', margin: '0 6rem', display: 'flex', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search for anything..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.6rem 3rem 0.6rem 1.2rem',
                            borderRadius: '30px',
                            border: '2px solid var(--color-maroon)',
                            fontSize: '0.95rem',
                            outline: 'none',
                        }}
                    />
                    <button type="submit" style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', background: 'var(--color-maroon)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </form>

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
                    {/* <Link href="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link> */}

                    {settings?.purchaseMode !== 'Order via WhatsApp' && (
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
                    )}

                    {!loading && (
                        user ? (
                            <div className="auth-buttons">
                                <Link
                                    href={`/${userRole || 'customer'}/dashboard`}
                                    className="btn-primary"
                                    style={{ padding: '7px 12px', fontSize: '14px', display: 'inline-flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="7" height="9" />
                                        <rect x="14" y="3" width="7" height="5" />
                                        <rect x="14" y="12" width="7" height="9" />
                                        <rect x="3" y="16" width="7" height="5" />
                                    </svg>
                                    Dashboard
                                </Link>
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="btn-secondary" style={{
                                    padding: '0.5rem 1rem',
                                    display: 'inline-flex',
                                    gap: '0.5rem',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    border: '1px solid var(--color-maroon)',
                                    background: 'transparent',
                                    color: 'var(--color-maroon)',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    minWidth: '100px'
                                }}>
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            !isAuthPage && (
                                <div className="auth-buttons">
                                    <Link href="/auth/login" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.9rem', display: 'inline-flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsMenuOpen(false)}>
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                            <polyline points="10 17 15 12 10 7" />
                                            <line x1="15" y1="12" x2="3" y2="12" />
                                        </svg>
                                        Login
                                    </Link>
                                    <Link href="/auth/signup" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'inline-flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsMenuOpen(false)}>
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <line x1="20" y1="8" x2="20" y2="14" />
                                            <line x1="23" y1="11" x2="17" y2="11" />
                                        </svg>
                                        Join
                                    </Link>
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
                        position: relative;
                        z-index: 101;
                    }

                    .nav-links-container {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        height: 100vh;
                        background-color: #ffffff;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        padding: 2rem;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                        transform: translateY(-10px);
                        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
                        z-index: 99;
                        opacity: 0;
                        visibility: hidden;
                        overflow-y: auto;
                    }

                    .nav-links-container.active {
                        transform: translateY(0);
                        opacity: 1;
                        visibility: visible;
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
                        width: 100% !important;
                        justify-content: center;
                        box-sizing: border-box;
                    }
                }
            `}</style>
        </nav >
    );
}
