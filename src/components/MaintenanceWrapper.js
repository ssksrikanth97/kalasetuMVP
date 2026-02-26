'use client';

import { usePathname } from 'next/navigation';
import { useStoreSettings } from '@/context/StoreSettingsContext';

export default function MaintenanceWrapper({ children }) {
    const { settings } = useStoreSettings();
    const pathname = usePathname();

    // Do not block admin routes or login so the site can be recovered
    const isExemptRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

    if (settings.loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fdfbf7' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid var(--color-maroon)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    if (settings.maintenanceMode && !isExemptRoute) {
        return (
            <div style={{
                display: 'flex', flexDirection: 'column', minHeight: '100vh',
                justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfbf7',
                textAlign: 'center', padding: '2rem'
            }}>
                <div style={{ maxWidth: '600px', backgroundColor: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-maroon)', marginBottom: '1rem' }}>
                        We'll be right back!
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Our platform is currently undergoing scheduled maintenance and upgrades.
                        Thank you for your patience while we improve your experience.
                    </p>
                </div>
            </div>
        );
    }

    return children;
}
