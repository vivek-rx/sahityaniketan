"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AdminLang, AdminTranslations, ADMIN_TRANSLATIONS } from "@/lib/admin-translations";

interface AdminLanguageContextType {
  lang: AdminLang;
  setLang: (lang: AdminLang) => void;
  toggleLang: () => void;
  t: AdminTranslations;
}

const AdminLanguageContext = createContext<AdminLanguageContextType>({
  lang: "mr",
  setLang: () => {},
  toggleLang: () => {},
  t: ADMIN_TRANSLATIONS.mr,
});

export function AdminLanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<AdminLang>("mr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sn_admin_lang") as AdminLang | null;
      if (saved === "mr" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: AdminLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("sn_admin_lang", newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    const next = lang === "mr" ? "en" : "mr";
    setLang(next);
  };

  const t = ADMIN_TRANSLATIONS[lang] || ADMIN_TRANSLATIONS.mr;

  return (
    <AdminLanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </AdminLanguageContext.Provider>
  );
}

export function useAdminLanguage() {
  const context = useContext(AdminLanguageContext);
  if (!context) {
    return {
      lang: "mr" as AdminLang,
      setLang: () => {},
      toggleLang: () => {},
      t: ADMIN_TRANSLATIONS.mr,
    };
  }
  return context;
}
