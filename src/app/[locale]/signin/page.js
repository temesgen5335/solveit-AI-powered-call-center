"use client";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import "../styles/globals.css";

import { useState } from "react";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { login } from "../lib/apis";
import { setToken } from "../lib/auth";

export default function Signin() {
  const t = useTranslations('signinPage');
  const locale = useLocale();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

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
    const response = await login(formData.email, formData.password);

    if (response.access_token) {
      setToken(response.access_token);

      // Redirect based on role with internationalized routing
      const dashboardRoute =
        response.role === "company" ? `/${locale}/company-dashboard` : `/${locale}/user-dashboard`;

      router.push(dashboardRoute);
    }
  } catch (error) {
    setError(error.message || "Login failed. Please check your credentials.");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center default_bg_theme text-gray-700">
      <div className="tiles_theme p-8 rounded-lg shadow-lg w-full max-w-md">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <h2 className="text-2xl title mb-6">{t('title')}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>    
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('email.label')}
            </label>
            <Input 
              name="email" 
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('email.placeholder')}
              required 
            />
          </div>

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

          <Button type="submit" className="w-full text-md">
            {t('loginButton')}
          </Button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          {t('noAccount.text')}
          <a href={`/${locale}/register`} className="text-blue-500 underline">
          {t('noAccount.registerLink')}</a>
        </p>
      </div>
    </div>
  );
}
  
