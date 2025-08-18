'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import "../styles/globals.css";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { isAuthenticated, removeToken } from '../lib/auth';
import { LogIn, LogOut, User, Mail, Atom, ServerIcon , Home as HomeIcon } from 'lucide-react';
import LanguageSwitcher from './buttons/languageSwitcher';

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations('navbar');
  const router = useRouter();
  const pathname = usePathname();


  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    setIsLoggedIn(isAuthenticated());
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    router.push(`/${locale}/`);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className= "navbar_bg_theme fixed w-full z-50 backdrop-blur-md transition-all duration-300 shadow-md"
    >
      <div className=" mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}/`} className="flex items-center gap-1 text-2xl title tracking-tight">
            <h2 className="text-white">Solve</h2>
            <Image src="/solveit_logo.png"
              alt="logo"
              width={28}
              height = {28}
              className="text-blue-500"
              priority />
          </Link>


          {/* Nav Links */}
          <div className="hidden md:flex space-x-10 text-lg font-medium">
            <NavLink href={`/${locale}/`} locale={locale} icon={<HomeIcon size={18} />} active={pathname === '/'}>
            {t('home')}
            </NavLink>
            <NavLink href={`/${locale}/#services`}  locale={locale} icon={<HomeIcon size={18} />} active={pathname === '/services'}>
            {t('services')}
            </NavLink>
            <NavLink href={`/${locale}/#features`}  locale={locale} icon={<ServerIcon size={18} />} active={pathname === '/services'}>
            {t('features')}
            </NavLink>
            <NavLink href={`/${locale}/#timeline`}  locale={locale} icon={<Atom size={18} />} active={pathname === '/services'}>
            {t('timeline')}
            </NavLink>
            <NavLink href={`/${locale}/contact`} locale={locale} icon={<Mail size={18} />} active={pathname === '/contact'}>
            {t('contact')}
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4 text-lg">
            {/* language switcher Button */}
            <LanguageSwitcher />
            {!isLoggedIn ? (
              <>
                <Link
                  href={`/${locale}/contact/request-demo`}
                  className=" hidden md:flex bg-blue-600 text-white px-5 py-2 rounded-3xl hover:bg-[#0043FF] shadow transition"
                >
                  {t('bookDemo')}
                </Link>
                <Link
                  href={`/${locale}/signin`}
                  className="md:flex items-center gap-1 bg-blue-600 text-white px-5 py-2 rounded-3xl hover:bg-[#0043FF] shadow transition"
                >
                  <LogIn className="hidden md:inline"  />
                  {t('login')}
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
                >
                  <LogOut size={18} />
                  {t('logout')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children, icon, active }) {
  return (
    <Link href={href}>
      <span
        className={`group relative flex items-center gap-2 cursor-pointer transition duration-300 ${
          active ? 'text-blue-600' : 'text-gray-700'
        } hover:text-blue-600`}
      >
        {icon}
        {children}
        <span
          className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
            active ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </span>
    </Link>
  );
}
