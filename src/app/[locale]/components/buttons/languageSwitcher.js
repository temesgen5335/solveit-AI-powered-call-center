'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname(); // current path (e.g., /en/about)
  const locale = useLocale();     // current locale (e.g., 'en')

  const switchTo = locale === 'en' ? 'ar' : 'en';

  const handleLanguageSwitch = () => {
    const newPath = `/${switchTo}${pathname.replace(`/${locale}`, '')}`;
    router.push(newPath);
  };

  return (
    <button
      onClick={handleLanguageSwitch}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 font-medium transition hover:text-blue-600"
    >
      <Globe className="w-5 h-5" />
      {switchTo === 'en' ? 'Eng' : 'العربية'}
    </button>
  );
}
