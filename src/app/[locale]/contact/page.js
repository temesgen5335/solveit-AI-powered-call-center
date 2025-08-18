'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  XCircle,

} from 'lucide-react';
import Button from '../components/ui/button';
import Input from '../components/ui/input.js';
import Textarea from '../components/ui/textarea';
import Link from 'next/link';

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    description: "Get in touch with our team",
    details: "contact@solveit.ai",
    link: "mailto:contact@solveit.ai"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    description: "Speak with our sales team",
    details: "+1 (555) 123-4567",
    link: "tel:+15551234567"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Office",
    description: "Visit our headquarters",
    details: "Egypt, Cairo, 123 Street",
    link: "https://maps.app.goo.gl/BSqPnVdFqUtchrhn8"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Hours",
    description: "Our working hours",
    details: "Monday - Friday: 9:00 AM - 6:00 PM EST",
    link: null
  }
];

export default function Contact() {
  const locale = useLocale();
  const t = useTranslations('contactPage');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className=" default_bg_theme py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mt-10 bg-blue-600 text-white py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>
        </div>
      </div>

      {/* Contact Information */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 tiles_theme rounded-lg shadow-md"
            >
              <div className="text-blue-600 mb-4">{info.icon}</div>
              <h3 className="text-lg font-semibold dark:text-gray-500 mb-2">
                {info.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {info.description}
              </p>
              {info.link ? (
                <Link
                  href={info.link}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {info.details}
                </Link>
              ) : (
                <p className="text-blue-600 hover:text-blue-700">{info.details}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl  mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="tiles_theme shadow-xl rounded-lg p-8"
        >
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold dark:text-gray-500 mb-2">
                Message Sent!
              </h2>
              <p className="text-gray-600 mb-6">
                {t('form.successMessage')}
              </p>
              <Button
                onClick={() => setSubmitStatus(null)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : submitStatus === 'error' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold dark:text-gray-500 mb-2">
                {t('form.errorMessage')}
              </h2>
              <p className="text-gray-600 mb-6">
                Please try again later or use one of our other contact methods.
              </p>
              <Button
                onClick={() => setSubmitStatus(null)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Try Again
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.fields.name')}
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'border-red-500' : ''}
                    placeholder={t('form.placeholders.name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.fields.email')}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'border-red-500' : ''}
                    placeholder={t('form.placeholders.email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.fields.subject')}
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'border-red-500' : ''}
                  placeholder={t('form.placeholders.subject')}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.fields.message')}
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'border-red-500' : ''}
                  rows={4}
                  placeholder={t('form.placeholders.message')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      {t('form.submitButton')}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
