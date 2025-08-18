'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github, 
  Facebook,
  Youtube,
  ArrowRight,
  Brain,
  Code,
  BookOpen,
  Users,
  MessageSquare,
  Shield,
  Zap
} from 'lucide-react';
import Button from '../ui/button';
import BottomFooter from './bottomFooter';

const Footer = () => {
  const locale = useLocale();
  const t = useTranslations('footer');

  const companyLinks = [
    { name: t('company.aboutUs'), href: `/${locale}/about` },
    { name: t('company.careers'), href: `/${locale}/careers` },
    { name: t('company.press'), href: `/${locale}/press` },
    { name: t('company.blog'), href: `/${locale}/blog` },
  ];

  // const productLinks = [
  //   { name: t('products.features'), href: `/${locale}/features` },
  //   { name: t('products.pricing'), href: `/${locale}/pricing` },
  //   { name: t('products.integrations'), href: `/${locale}/integration` },
  //   { name: t('products.api'), href: `/${locale}/api` },
  // ];

  const resourceLinks = [

    { name: t('resources.documentation'), href: `/${locale}/docs` },
    { name: t('resources.tutorials'), href: `/${locale}/tutorials` },
    { name: t('resources.caseStudies'), href: `/${locale}/case-studies` },
    { name: t('resources.community'), href: `/${locale}/community` },
  ];


  const features = [
    { icon: <Brain className="w-5 h-5" />, text: t('features.advancedAIModels') },
    { icon: <Code className="w-5 h-5" />, text: t('features.developerTools') },
    { icon: <BookOpen className="w-5 h-5" />, text: t('features.learningResources') },
    { icon: <Users className="w-5 h-5" />, text: t('features.communitySupport') },
    { icon: <MessageSquare className="w-5 h-5" />, text: t('features.chatSupport') },
    { icon: <Shield className="w-5 h-5" />, text: t('features.enterpriseSecurity') },
  ];

  return (
    <footer className=" border-t border-gray-100 ">
      {/* Top Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">Solve</span>
              <Image src="/solveit_logo.png"
              alt="logo"
              width="28"
              height = "28"
              className="text-blue-500"
              priority />
            </div>
            <p className="text-gray-500">
            {t('company.motto')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-500 ">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 ">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 ">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 ">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 ">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg title mb-4">{t('company.company')}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-blue-500 transition-colors flex items-center">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg title mb-4">{t('resources.title')}</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-blue-500 dark:hover:text-white transition-colors flex items-center">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg title mb-4">{t('contact.title')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-500">
                <Mail className="w-5 h-5 mr-2" />
                info@solveit.ai
              </li>
              <li className="flex items-center text-gray-500">
                <Phone className="w-5 h-5 mr-2" />
                +201503885386
              </li>
              <li className="flex items-center text-gray-500">
                <MapPin className="w-5 h-5 mr-2" />
                Egypt, Cairo
              </li>
            </ul>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 text-gray-600 rounded-lg hover:bg-blue-500 hover:text-white transition-colors">
              {feature.icon}
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12  text-gray-800  rounded-lg p-6">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl title mb-2">{t('newsletter.title')}</h3>
            <p className="text-gray-500 mb-4">
              {t('newsletter.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-2 rounded-lg  bg-[#f9fafb] border  border-gray-300  text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                {t('newsletter.subscribeButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer section */}
    <BottomFooter />
    </footer>
  );
};

export default Footer; 