
'use client';
import { useTranslations } from 'next-intl';
import '../styles/globals.css';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from './navbar';
import Footer from './footer/footer';
import Timeline from './timeline/timeline';
import { getPlatformFeatures } from '../data/landingPageData';
import ServicesCarousel from './servicesCarousel';



export default function LandingPage() {
  const t = useTranslations('landingPage');
  const kf = useTranslations('keyFeatures');
  const pf = useTranslations('platformFeatures');
  const platformFeatures = getPlatformFeatures(pf);

  return (
    <div className="">
      <Navbar />
      <div className="pt-20 default_bg_theme overflow-x-hidden">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 ">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h1 className="text-5xl title mb-6">
                {t('header.title')} <span className="text-[#029A71]">{t('header.titleTag')}</span>
              </h1>
              <p className="text-xl text-[#8e91a7] mb-8">
                {t('header.description')}
              </p>
              <Link 
                href="/contact/request-demo"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 text-xl rounded-3xl transition duration-300"
              >
                {t('header.bookDemoButton')}
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="relative h-[400px] w-full rounded-3xl">
                <Image
                  src="/hero-image.jpg"
                  alt="AI Call Center Solution"
                  fill
                  className="object-contain rounded-3xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className=" py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl title text-center mb-16">{kf('title')}</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Real-time Resolution */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="tiles_theme shadow-xl text-gray-600 text-medium p-8 rounded-xl"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl title mb-4">{kf('feature1.title')}</h3>
                <ul className="space-y-3 text-gray-600 text-medium">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    {kf('feature1.description1')}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    {kf('feature1.description2')}
                  </li>
                </ul>
              </motion.div>

              {/* Intelligent Routing */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="tiles_theme shadow-xl text-gray-600 text-medium p-8 rounded-xl"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-2xl title mb-4">{kf('feature2.title')}</h3>
                <ul className="space-y-3 text-gray-600 text-medium">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    {kf('feature2.description1')}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    {kf('feature2.description2')}
                  </li>
                </ul>
              </motion.div>

              {/* Workplace Optimization */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="tiles_theme shadow-xl text-gray-600 text-medium p-8 rounded-xl"
              >
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl title mb-4">{kf('feature3.title')}</h3>
                <ul className="space-y-3 text-gray-600 text-medium">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    {kf('feature3.description1')}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    {kf('feature3.description2')}
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <ServicesCarousel />
            
            {/* Platform Features */}
        <section className=" py-20 p-6">
            <h2 className="text-4xl title text-center mb-16">{t('platformFeatures.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platformFeatures.map((feature) => (
                <motion.div 
                  key={feature.id}
                  whileHover={{ scale: 1.05 }}
                  className="tiles_theme shadow-xl text-gray-600 text-medium p-6 rounded-xl text-center"
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl title mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-medium">{feature.description}</p>
                </motion.div>
              ))}
            </div>
        </section>

        {/* Timeline Section */}
        <Timeline />

        {/* CTA Section */}
        <section className=" py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl title mb-8">{t('ctaSection.title')}</h2>
            <p className="text-xl text-[#8e91a7] mb-8 max-w-2xl mx-auto">
              {t('ctaSection.description')}
            </p>
            <Link 
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-3xl text-lg transition duration-300 inline-block"
            >
              {t('ctaSection.startFreeTrialButton')}
            </Link>
          </div>
        </section>
        
        {/* Footer section */}
        <Footer />
      </div>
    </div>
  );
}












