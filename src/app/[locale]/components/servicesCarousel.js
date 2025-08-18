'use client';
import "../styles/globals.css";
import { useTranslations } from 'next-intl';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { getCompaniesData } from '../data/landingPageData';

export default function ServicesCarousel() {
  const cdt = useTranslations('companiesServices');
  const companiesServices = getCompaniesData(cdt);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="py-20 " id="services">
      <div className="container mx-auto">
        <h2 className="text-4xl title text-center mb-16">{cdt('title')}</h2>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-2 p-4">
              {companiesServices.map((company) => (
                <motion.div
                  key={company.id}
                  className="flex-[0_0_350px] min-w-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="tiles_theme shadow-lg ml-8 rounded-xl overflow-hidden shadow-lg h-full">
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 ${company.iconColor} rounded-xl flex items-center justify-center`}>
                          <span className="text-2xl title text-white">{company.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl title">{company.name}</h3>
                          <p className="text-gray-500">{company.industry}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {company.services.map((service, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            onClick={scrollPrev}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            onClick={scrollNext}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
