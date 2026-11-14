"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ShieldCheck, UserCheck, Eye, EyeOff, BookOpen, AlertCircle, Languages } from "lucide-react";
import { MotionSubmitButton } from "@/components/ui/motion-submit-button";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "admin" ? "admin" : "member";
  const { language, setLanguage } = useLanguage();
  const isMr = language === "mr";
  const isHi = language === "hi";
  const isEn = language === "en";

  const [role, setRole] = useState<"member" | "admin">(initialRole);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchParams.get("role") === "admin") {
      setRole("admin");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      if (role === "admin") {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: identifier.trim().toLowerCase(),
          password,
        });

        if (authError || !data.user) {
          setError(
            isEn
              ? "Invalid administrator email or password. Please try again."
              : isHi
                ? "अवैध प्रशासक ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।"
                : "अवैध प्रशासक ईमेल किंवा संकेतशब्द. कृपया पुन्हा प्रयत्न करा."
          );
          setLoading(false);
          return;
        }

        router.push("/admin");
        router.refresh();
      } else {
        const cleanId = identifier.trim();

        if (cleanId.includes("@")) {
          const { data, error: authError } = await supabase.auth.signInWithPassword({
            email: cleanId.toLowerCase(),
            password,
          });

          if (!authError && data.user) {
            router.push("/membership");
            router.refresh();
            return;
          }
        }

        const { data: member, error: dbError } = await (supabase as any)
          .from("members")
          .select("*")
          .or(`member_number.eq.${cleanId},email.eq.${cleanId}`)
          .maybeSingle();

        if (dbError || !member) {
          setError(
            isEn
              ? "Invalid membership number or email address. Please contact the library office."
              : isHi
                ? "अवैध सदस्य क्रमांक या ईमेल पता। कृपया कार्यालय से संपर्क करें।"
                : "अवैध सभासद क्रमांक किंवा ईमेल पत्ता. कृपया कार्यालयात संपर्क साधा."
          );
          setLoading(false);
          return;
        }

        router.push("/membership");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        isEn
          ? "An error occurred during sign in. Please try again."
          : isHi
            ? "साइन इन करते समय त्रुटि हुई। कृपया पुनः प्रयास करें।"
            : "प्रवेश करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full font-sans", className)} {...props}>
      {/* Top Language & Role Header */}
      <div className="flex items-center justify-between gap-2">
        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex-1">
          <button
            type="button"
            onClick={() => {
              setRole("member");
              setError("");
            }}
            className={cn(
              "flex items-center justify-center gap-2 py-2 px-3 text-sm font-bold rounded-lg transition-all cursor-pointer",
              role === "member"
                ? "bg-[#800020] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
            )}
          >
            <UserCheck className="h-4 w-4" />
            <span>{isEn ? "Reader / Member" : isHi ? "पाठक / सदस्य" : "वाचक / सभासद"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setError("");
            }}
            className={cn(
              "flex items-center justify-center gap-2 py-2 px-3 text-sm font-bold rounded-lg transition-all cursor-pointer",
              role === "admin"
                ? "bg-[#800020] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
            )}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{isEn ? "Admin" : isHi ? "प्रशासक" : "प्रशासक"}</span>
          </button>
        </div>

        {/* Quick Language Toggle */}
        <button
          type="button"
          onClick={() => setLanguage(isMr ? "en" : "mr")}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 cursor-pointer shadow-2xs flex items-center gap-1.5"
          title={isEn ? "Switch Language" : isHi ? "भाषा बदलें" : "भाषा बदला"}
        >
          <Languages className="h-3.5 w-3.5 text-[#800020]" />
          <span>{isMr ? "EN" : "मराठी"}</span>
        </button>
      </div>

      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md rounded-2xl">
        <CardHeader className="text-center pb-4 pt-6">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#800020]/10 dark:bg-rose-950/40 text-[#800020] dark:text-rose-300 border border-[#800020]/20">
            {role === "admin" ? (
              <ShieldCheck className="h-7 w-7 text-[#800020] dark:text-rose-400" />
            ) : (
              <BookOpen className="h-7 w-7 text-[#800020] dark:text-rose-400" />
            )}
          </div>
          <CardTitle className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
            {role === "admin"
              ? (isEn ? "Administrator Sign In" : isHi ? "प्रशासक प्रवेश" : "प्रशासक प्रवेश द्वार")
              : (isEn ? "Member Sign In" : isHi ? "सदस्य प्रवेश" : "सभासद प्रवेश")}
          </CardTitle>
          <CardDescription className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            {role === "admin"
              ? (isEn ? "Sahitya Niketan Library CMS Management" : isHi ? "साहित्य निकेतन पुस्तकालय CMS प्रबंधन" : "साहित्य निकेतन ग्रंथालय CMS व्यवस्थापन")
              : (isEn ? "Access library catalogue, services & digital pass" : isHi ? "पुस्तकालय सेवाएँ, ई-पुस्तकें एवं डिजिटल पास" : "ग्रंथालय सेवा, ई-पुस्तके आणि डिजिटल पास")}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-semibold">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="identifier" className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {role === "admin"
                    ? (isEn ? "Administrator Email" : isHi ? "प्रशासक ईमेल" : "प्रशासक ईमेल")
                    : (isEn ? "Membership ID or Email" : isHi ? "सदस्य क्रमांक या ईमेल" : "सभासद क्रमांक किंवा ईमेल")}
                </FieldLabel>
                <Input
                  id="identifier"
                  type={role === "admin" ? "email" : "text"}
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={role === "admin" ? "admin@sahityaniketan.org" : (isEn ? "e.g. SN-MBR-100201 or email" : "उदा. SN-MBR-100201 किंवा email")}
                  className="rounded-xl p-3 text-base"
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between mb-1">
                  <FieldLabel htmlFor="password" className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {isEn ? "Password" : isHi ? "पासवर्ड" : "संकेतशब्द"}
                  </FieldLabel>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(isEn ? "Please contact the library administration office." : isHi ? "कृपया पुस्तकालय प्रशासन कार्यालय से संपर्क करें।" : "कृपया ग्रंथालय प्रशासकाशी कार्यालयात संपर्क साधा.");
                    }}
                    className="text-xs text-[#800020] dark:text-rose-400 hover:underline font-bold"
                  >
                    {isEn ? "Forgot password?" : isHi ? "पासवर्ड भूल गए?" : "संकेतशब्द विसरलात?"}
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-xl p-3 text-base pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>

              <Field className="pt-2">
                <MotionSubmitButton
                  type="submit"
                  fullWidth
                  disabled={loading}
                  isPending={loading}
                  label={
                    role === "admin"
                      ? (isEn ? "Sign In as Administrator" : isHi ? "प्रशासक के रूप में साइन इन करें" : "प्रशासक प्रवेश")
                      : (isEn ? "Sign In as Member" : isHi ? "सदस्य के रूप में साइन इन करें" : "सभासद प्रवेश")
                  }
                  pendingLabel={isEn ? "Signing in..." : isHi ? "साइन इन हो रहा है..." : "प्रवेश होत आहे..."}
                  successLabel={isEn ? "Success!" : isHi ? "सफल!" : "प्रवेश यशस्वी!"}
                  variant={role === "admin" ? "gold" : "primary"}
                />
              </Field>

              <FieldSeparator className="text-xs text-slate-400 pt-1">
                {isEn ? "Sahitya Niketan Library, Ambajogai" : isHi ? "साहित्य निकेतन पुस्तकालय, अंबाजोगाई" : "साहित्य निकेतन ग्रंथालय, अंबाजोगाई"}
              </FieldSeparator>

              <FieldDescription className="text-center text-xs pt-1 text-slate-500">
                {role === "admin" ? (
                  <span>
                    {isEn ? "Looking for Reader / Member login? " : isHi ? "पाठक / सदस्य लॉगिन चाहिए? " : "वाचक / सभासद लॉगिन करायचे आहे? "}
                    <button
                      type="button"
                      onClick={() => setRole("member")}
                      className="text-[#800020] dark:text-rose-400 font-bold hover:underline cursor-pointer"
                    >
                      {isEn ? "Click here" : isHi ? "यहाँ क्लिक करें" : "येथे क्लिक करा"}
                    </button>
                  </span>
                ) : (
                  <span>
                    {isEn ? "New member registration? " : isHi ? "नए सदस्य पंजीकरण के लिए? " : "नवीन सभासद नोंदणीसाठी? "}
                    <a href="/membership" className="text-[#800020] dark:text-rose-400 font-bold hover:underline">
                      {isEn ? "Apply online" : isHi ? "ऑनलाइन आवेदन करें" : "ऑनलाइन अर्ज करा"}
                    </a>
                  </span>
                )}
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
