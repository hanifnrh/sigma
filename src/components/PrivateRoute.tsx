// components/PrivateRoute.tsx
'use client'

import { useRouter } from 'next/navigation'; // Gunakan usePathname dari next/navigation
import { useEffect, useState } from 'react';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();  // Menggunakan useRouter yang lebih kompatibel di dalam halaman

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Jika token tidak ada, redirect ke halaman login
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) {
        return <p>Loading...</p>;  // Tampilkan loading sementara
    }

    return <>{children}</>;  // Jika sudah login, tampilkan konten yang ada di dalam PrivateRoute
};

export default PrivateRoute;
