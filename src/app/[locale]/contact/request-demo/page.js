'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Mail, 
  Phone, 
  Users, 
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/[locale]/components/ui/select';
import Button from '../../components/ui/button';
import Input from '../../components/ui/input';
import Textarea from '../../components/ui/textarea';

const industries = [
  "Healthcare",
  "Finance and Banking",
  "E-commerce and Retail",
  "Technology abd Software",
  "Manufacturing",
  "Education",
  "Government",
  "Travel and Hospitality",
  "Other"
];

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees"
];

export default function RequestDemo() {
  const locale = useLocale();
  const t = useTranslations('bookDemoPage');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    companySize: '',
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
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.companySize) newErrors.companySize = 'Company size is required';
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
        phone: '',
        company: '',
        industry: '',
        companySize: '',
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
    <div className="min-h-screen default_bg_theme py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl title mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-500">
            {t('hero.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="tiles_theme shadow-xl rounded-lg p-8"
        >
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('form.successMessage')}
              </h2>
              <p className="text-gray-600 mb-6">
                We've received your demo request. Our team will contact you shortly.
              </p>
              <Button
                onClick={() => setSubmitStatus(null)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Submit Another Request
              </Button>
            </motion.div>
          ) : submitStatus === 'error' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('form.errorMessage')}
              </h2>
              <p className="text-gray-600 mb-6">
                Please try again later or contact our support team.
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
                  <label className="block text-gray-600 b-2">
                    {t('form.fields.name')}
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                      placeholder={t('form.placeholders.name')}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">
                  {t('form.fields.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder={t('form.placeholders.email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">
                  {t('form.fields.phone')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">
                  {t('form.fields.company')}
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`pl-10 ${errors.company ? 'border-red-500' : ''}`}
                      placeholder={t('form.placeholders.company')}
                    />
                  </div>
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-500">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">
                  {t('form.fields.industry')}
                  </label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, industry: value }));
                      if (errors.industry) {
                        setErrors(prev => ({ ...prev, industry: '' }));
                      }
                    }}
                  >
                    <SelectTrigger className={`${errors.industry ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder={t('form.placeholders.industry')} />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="mt-1 text-sm text-red-500">{errors.industry}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">
                  {t('form.fields.companySize')}
                  </label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, companySize: value }));
                      if (errors.companySize) {
                        setErrors(prev => ({ ...prev, companySize: '' }));
                      }
                    }}
                  >
                    <SelectTrigger className={`${errors.companySize ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder={t('form.placeholders.companySize')} />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.companySize && (
                    <p className="mt-1 text-sm text-red-500">{errors.companySize}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-2">
                {t('form.fields.message')}
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" />
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`pl-10 ${errors.message ? 'border-red-500' : ''}`}
                    rows={4}
                    placeholder={t('form.placeholders.message')}
                  />
                </div>
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
                      Submitting...
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

