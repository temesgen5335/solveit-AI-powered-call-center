'use client';
import "../../styles/globals.css";
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { getTimelineData } from '../../data/landingPageData';


export default function Timeline() {
    const t = useTranslations('timeline');
    const timelineData = getTimelineData(t);

  
  return (
    <div id= "timeline" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl title text-center mb-16"
        >
          {t('title')}
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className=" left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700"></div>
          
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`mb-16 flex justify-between items-center w-full ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="tiles_theme shadow-xl rounded-lg shadow-xl p-6"
                >
                  <h3 className="text-xl title mb-2">{item.title}</h3>
                  <p className="text-[#8e91a7]">{item.description}</p>
                  <div className="mt-4">
                    <span className="text-blue-500 font-semibold">{item.month}</span>
                  </div>
                </motion.div>
              </div>

              {/* Icon */}
              <div className="w-2/12 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg`}
                >
                  <item.icon className="w-8 h-8" />
                </motion.div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}