'use client';
import "../styles/globals.css";

import { useState } from 'react';
import { LogOut, UserCog } from 'lucide-react';
import { removeToken } from '../lib/auth';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const DashboardNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
      removeToken();
      setIsLoggedIn(false);
      router.push('/');
    };
    return( 

          <div className=" mx-auto px-6 navbar_bg_theme border-gray-100 dark:border-gray-700">
            <div className="flex items-center h-16 justify-end gap-2">

                <Link href="/profile" className="p-2 title hover:text-blue-600 transition rounded-lg">
                  <UserCog className="w-5 h-5" />
                </Link>

                {/* Logout Buttons */}
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-1 title hover:text-blue-600 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>


           </div>

         </div>
      );
};

export default DashboardNavbar;