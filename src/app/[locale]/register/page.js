"use client";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import "../styles/globals.css";

import { useState } from "react";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { companyRegister, userRegister } from "../lib/apis";
import { setToken } from "../lib/auth";

export default function Register() {
  const t = useTranslations('registerPage');
  const locale = useLocale();
  const router = useRouter();


  const [isCompany, setIsCompany] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    domain: "",
    business_phone_number: "",
    whatsapp_number: ""
  });
  const [error, setError] = useState("");

  const handleToggle = () => setIsCompany(!isCompany);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      let response;
      if (isCompany) {
        const { full_name, email, password, domain, business_phone_number } = formData;
        response = await companyRegister({
          full_name,
          email,
          password,
          domain,
          business_phone_number
        });
      } else {
        const { full_name, email, password, whatsapp_number } = formData;
        response = await userRegister({
          full_name,
          email,
          password,
          whatsapp_number
        });
      }

      if (response.access_token) {
        setToken(response.access_token);
        router.push("/signin");
      }
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center default_bg_theme text-gray-800 dark:text-white dark:text-white">
      <div className="tiles_theme p-2 rounded-lg shadow-lg w-full max-w-md">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Filter for User/Company */}
        <div className="flex justify-between rounded-xl">
          <button
            onClick={() => setIsCompany(false)}
            className={`px-4 py-2 w-full rounded-l-xl  ${!isCompany ? 'bg-blue-600 text-white' : 'dark:bg-gray-800 bg-[#f9fafb] text-gray-400'}`}
          >
            {t('userType.user')}
          </button>
          <button
            onClick={() => setIsCompany(true)}
            className={`px-4 py-2 w-full rounded-r-xl ${isCompany ? 'bg-blue-600 text-white' : 'dark:bg-gray-800 bg-[#f9fafb] text-gray-400'}`}
          >
            {t('userType.company')}
          </button>
        </div>

        <div className="p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl title mb-6">{t('title')}</h2>

          <form className="space-y-4 " onSubmit={handleSubmit}>
            <div>
              <label className="block  font-medium text-gray-700 mb-2">
                {t('name.label')}
              </label>
              <Input 
                type="text" 
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder={isCompany ? t('name.companyNamePlaceholder') : t('name.userNamePlaceholder')}
                required
              />
            </div>
            <div>    
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('email.label')}
              </label>
              <Input 
                name="email" 
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={isCompany ? t('email.companyEmailPlaceholder') : t('email.userEmailPlacholder')}
                required 
              />
            </div>

            {isCompany ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('domain')}
                  </label>
                  <Input 
                    type="text" 
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    placeholder={t('domainPlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('phone.companyPhoneNumber')}
                  </label>
                  <Input 
                    type="text" 
                    name="business_phone_number"
                    value={formData.business_phone_number}
                    onChange={handleChange}
                    placeholder="+200-000-0000"
                    required 
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                 {t('phone.userPhoneNumber')} 
                </label>
                <Input 
                  type="text" 
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                  placeholder="+200-000-0000"
                  required 
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('password.label')}
              </label>
              <Input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="*******"
                required 
              />
            </div>

            <Button type="submit" className="w-full">
              {t('registerButton')}
            </Button> 
          </form>

          <p className="text-sm text-gray-600 mt-4">
            {t('alreadyHaveAccount')}
            <a href={`/${locale}/signin`} className="text-blue-500 underline">
            {t('loginLink')}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

