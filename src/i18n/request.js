'use server';

import { headers } from 'next/headers';

export default async function getRequestConfig() {
  // Await the headers to ensure they are resolved before accessing
  const requestHeaders = await headers();
  const acceptLanguage = requestHeaders.get('accept-language') || 'en';

  // Choose the best matching locale based on the Accept-Language header
  const locale = acceptLanguage.startsWith('ar') ? 'ar' : 'en';

  return {
    locale, // ✅ Required
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  };
}