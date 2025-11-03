'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noNavbarRoutes = ['/sign-in', '/sign-up']; // Add any other routes where you don't want the navbar

  return (
    <>
      {!noNavbarRoutes.includes(pathname) && <Navbar />}
      {children}
    </>
  );
}
