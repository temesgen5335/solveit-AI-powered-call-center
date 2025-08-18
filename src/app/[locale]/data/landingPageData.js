import { Calendar, Rocket, Users, Smartphone } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

// Sample data for companies - This will be replaced with backend data
export const getCompaniesData = (cdt) => [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: cdt('industry1.title'),
    iconColor: "bg-blue-500",
    services: [
      cdt('industry1.services.service1'),
      cdt('industry1.services.service2'),
      cdt('industry1.services.service3'),
      cdt('industry1.services.service4'),
      cdt('industry1.services.service5')
    ]
  },
  {
    id: 2,
    name: "FinancePro",
    industry: cdt('industry4.title'),
    iconColor: "bg-purple-500",
    services: [
      cdt('industry4.services.service1'),
      cdt('industry4.services.service2'),
      cdt('industry4.services.service3'),
      cdt('industry4.services.service4'),
      cdt('industry4.services.service5')
    ]
  },
  {
    id: 3,
    name: "HealthCare Plus",
    industry: cdt('industry3.title'),
    iconColor: "bg-green-500",
    services: [
      cdt('industry3.services.service1'),
      cdt('industry3.services.service2'),
      cdt('industry3.services.service3'),
      cdt('industry3.services.service4'),
      cdt('industry3.services.service5')
    ]
  },
  {
    id: 4,
    name: "TeleConnect",
    industry: cdt('industry5.title'),
    iconColor: "bg-red-500",
    services: [
      cdt('industry5.services.service1'),
      cdt('industry5.services.service2'),
      cdt('industry5.services.service3'),
      cdt('industry5.services.service4'),
      cdt('industry5.services.service5')
    ]
  },
  {
    id: 5,
    name: "10Academy University",
    industry: cdt('industry7.title'),
    iconColor: "bg-yellow-500",
    services: [
      cdt('industry7.services.service1'),
      cdt('industry7.services.service2'),
      cdt('industry7.services.service3'),
      cdt('industry7.services.service4'),
      cdt('industry7.services.service5')
    ]
  },
  {
    id: 6,
    name: "BankSecure",
    industry: "Banking Services",
    iconColor: "bg-indigo-500",
    services: [
      cdt('industry4.services.service1'),
      cdt('industry4.services.service2'),
      cdt('industry4.services.service3'),
      cdt('industry4.services.service4'),
      cdt('industry4.services.service5')
    ]
  },
  {
    id: 7,
    name: "ShopEase",
    industry: cdt('industry2.title'),
    iconColor: "bg-pink-500",
    services: [
      cdt('industry2.services.service1'),
      cdt('industry2.services.service2'),
      cdt('industry2.services.service3'),
      cdt('industry2.services.service4'),
      cdt('industry2.services.service5')
    ]
  },
  {
    id: 8,
    name: "TravelBuddy",
    industry: cdt('industry6.title'),
    iconColor: "bg-teal-500",
    services: [
      cdt('industry6.services.service1'),
      cdt('industry6.services.service2'),
      cdt('industry6.services.service3'),
      cdt('industry6.services.service4'),
      cdt('industry6.services.service5')
    ]
  },
  {
    id: 9,
    name: "EduTech Solutions",
    industry: cdt('industry7.title'),
    iconColor: "bg-blue-700",
    services: [
      cdt('industry7.services.service1'),
      cdt('industry7.services.service2'),
      cdt('industry7.services.service3'),
      cdt('industry7.services.service4'),
      cdt('industry7.services.service5')
    ]
  }
];


export const getPlatformFeatures = (pf) => [
    { id: 1,
      title: pf('feature1.title'),
      description: pf('feature1.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      color: 'bg-blue-500' 
    },
    { id: 2,
      title: pf('feature2.title'),
      description: pf('feature2.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      color: 'bg-green-500' },
    { id: 3,
      title: pf('feature3.title'),
      description: pf('feature3.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      color: 'bg-purple-500' },
    { id: 4,
      title: pf('feature4.title'),
      description: pf('feature4.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      color: 'bg-yellow-500'
    },
];

export const getKeyFeatures = (kf) => [
  {
    title: kf('keyFeatures.feature1.title'),
    description: kf('keyFeatures.feature1.description'),
    icon: kf('keyFeatures.feature1.icon'),
    color: 'bg-blue-500',
  },
  {
    title: kf('keyFeatures.feature2.title'),
    description: kf('keyFeatures.feature2.description'),
    icon: kf('keyFeatures.feature2.icon'),
    color: 'bg-green-500',
  },
  {
    title: kf('keyFeatures.feature3.title'),
    description: kf('keyFeatures.feature3.description'),
    icon: kf('keyFeatures.feature3.icon'),
    color: 'bg-purple-500',
  },
];

export const getTimelineData = (t) => [
  {
    month: t('april.month'),
    title: t('april.title'),
    description: t('april.description'),
    icon: Calendar,
    color: 'bg-blue-500',
  },
  {
    month: t('may.month'),
    title: t('may.title'),
    description: t('may.description'),
    icon: Rocket,
    color: 'bg-blue-500',
  },
  {
    month: t('june.month'),
    title: t('june.title'),
    description: t('june.description'),
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    month: t('july.month'),
    title: t('july.title'),
    description: t('july.description'),
    icon: Smartphone,
    color: 'bg-blue-500',
  },
];