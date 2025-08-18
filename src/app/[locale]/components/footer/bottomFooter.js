"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import LanguageSwitcher from '../buttons/languageSwitcher';

const BottomFooter = () => {
  const locale = useLocale();
  const t = useTranslations('footer.bottomFooter');

  const legalLinks = [
    { name: t('privacyPolicy'), href: `/${locale}/privacy` },
    { name: t('termsOfService'), href: `/${locale}/terms` },
    { name: t('security'), href: `/${locale}/security` },
    { name: t('cookiePolicy'), href: `/${locale}/cookies` },
  ];

    return (
        
      <div className="navbar_bg_theme text-gray-800">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
            <Link href="/" className="flex items-center gap-1 text-gray-600 dark:text-white">
            <h2 className="text-2xl font-semibold text-white">Solve</h2>
              <Image
                src="/solveit_logo.png"
                alt="logo"
                width={28}
                height={28}
                className="text-blue-500"
                priority
              />
            </Link>
            <LanguageSwitcher />
            </div>            
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {t('copyright')}
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-blue-500 dark:hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      );

};

export default BottomFooter;