// components/PrivateRoute.tsx
'use client';

import { useRouter } from 'next/navigation'; // Gunakan usePathname dari next/navigation
import { useEffect, useState } from 'react';
import { Loader } from './ui/loader';
interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null untuk status belum diverifikasi
    const router = useRouter(); // Gunakan useRouter untuk navigasi

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (!token) {
                // Jika token tidak ada, redirect ke halaman login
                router.push('/login');
                setIsAuthenticated(false); // Status login false
            } else {
                setIsAuthenticated(true); // Status login true
            }
        }
    }, [router]);

    // Saat status belum diverifikasi
    if (isAuthenticated === null) {
        return(
            <div className="flex justify-center items-center h-screen">
                <Loader/>
            </div>
        );
    }

    // Jika sudah login, tampilkan konten anak-anak
    return <>{children}</>;
};

export default PrivateRoute;
