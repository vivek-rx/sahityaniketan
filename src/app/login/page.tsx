"use client";

import { Suspense } from "react";
import Image from "next/image";
import { Navbar, Footer } from "@/components/layout";
import { LoginForm } from "@/components/login-form";
import { Loader2 } from "lucide-react";

function LoginContent() {
  return (
    <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center py-10 px-4 sm:px-6 bg-[#FAF8F5] dark:bg-[#120B0D] font-marathi-body">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        {/* Brand Header with Authentic Emblem Logo */}
        <div className="flex flex-col items-center text-center gap-2.5">
          <div className="relative group">
            <Image
              src="/images/logo.png"
              alt="साहित्य निकेतन सार्वजनिक ग्रंथालय बोधचिन्ह"
              width={88}
              height={88}
              className="h-20 w-20 sm:h-22 sm:w-22 object-contain drop-shadow-md rounded-full transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <h1 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-marathi-heading">
            साहित्य निकेतन ग्रंथालय
          </h1>
          <p className="text-xs text-stone-600 dark:text-[#D5C0AE] font-medium">
            महाराष्ट्र शासन वर्ग 'अ' सार्वजनिक ग्रंथालय, अंबाजोगाई (स्था. १ ऑगस्ट १९४५)
          </p>
        </div>

        {/* Dynamic Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Suspense
          fallback={
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-sm font-bold text-[#800020] dark:text-[#E5B869]">
              <Loader2 className="h-8 w-8 animate-spin text-[#800020] dark:text-[#E5B869]" />
              <span>लॉगिन पेज लोड होत आहे...</span>
            </div>
          }
        >
          <LoginContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
