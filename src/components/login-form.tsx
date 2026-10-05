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
            isMr
              ? "अवैध प्रशासक ईमेल किंवा संकेतशब्द. कृपया पुन्हा प्रयत्न करा."
              : "Invalid administrator email or password. Please try again."
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
            isMr
              ? "अवैध सभासद क्रमांक किंवा ईमेल पत्ता. कृपया कार्यालयात संपर्क साधा."
              : "Invalid membership number or email address. Please contact the library office."
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
        isMr
          ? "प्रवेश करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा."
          : "An error occurred during sign in. Please try again."
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
            <span>{isMr ? "वाचक / सभासद" : "Member"}</span>
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
            <span>{isMr ? "प्रशासक" : "Admin"}</span>
          </button>
        </div>

        {/* Quick Language Toggle */}
        <button
          type="button"
          onClick={() => setLanguage(isMr ? "en" : "mr")}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 cursor-pointer shadow-2xs flex items-center gap-1.5"
          title="भाषा बदला (Switch Language)"
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
              ? (isMr ? "प्रशासक प्रवेश द्वार" : "Administrator Sign In")
              : (isMr ? "सभासद प्रवेश" : "Member Sign In")}
          </CardTitle>
          <CardDescription className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            {role === "admin"
              ? (isMr ? "साहित्य निकेतन ग्रंथालय CMS व्यवस्थापन" : "Sahitya Niketan Library CMS Management")
              : (isMr ? "ग्रंथालय सेवा, ई-पुस्तके आणि डिजिटल पास" : "Access library catalogue, services & digital pass")}
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
                    ? (isMr ? "प्रशासक ईमेल (Email)" : "Administrator Email")
                    : (isMr ? "सभासद क्रमांक किंवा ईमेल" : "Membership ID or Email")}
                </FieldLabel>
                <Input
                  id="identifier"
                  type={role === "admin" ? "email" : "text"}
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={role === "admin" ? "admin@sahityaniketan.org" : (isMr ? "उदा. SN-MBR-100201 किंवा email" : "e.g. SN-MBR-100201 or email")}
                  className="rounded-xl p-3 text-base"
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between mb-1">
                  <FieldLabel htmlFor="password" className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {isMr ? "संकेतशब्द (Password)" : "Password"}
                  </FieldLabel>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(isMr ? "कृपया ग्रंथालय प्रशासकाशी कार्यालयात संपर्क साधा." : "Please contact the library administration office.");
                    }}
                    className="text-xs text-[#800020] dark:text-rose-400 hover:underline font-bold"
                  >
                    {isMr ? "संकेतशब्द विसरलात?" : "Forgot password?"}
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
                      ? (isMr ? "प्रशासक प्रवेश (Sign In)" : "Sign In as Administrator")
                      : (isMr ? "सभासद प्रवेश (Sign In)" : "Sign In as Member")
                  }
                  pendingLabel={isMr ? "प्रवेश होत आहे..." : "Signing in..."}
                  successLabel={isMr ? "प्रवेश यशस्वी!" : "Success!"}
                  variant={role === "admin" ? "gold" : "primary"}
                />
              </Field>

              <FieldSeparator className="text-xs text-slate-400 pt-1">
                {isMr ? "साहित्य निकेतन ग्रंथालय, अंबाजोगाई" : "Sahitya Niketan Library, Ambajogai"}
              </FieldSeparator>

              <FieldDescription className="text-center text-xs pt-1 text-slate-500">
                {role === "admin" ? (
                  <span>
                    {isMr ? "वाचक / सभासद लॉगिन करायचे आहे? " : "Looking for Reader / Member login? "}
                    <button
                      type="button"
                      onClick={() => setRole("member")}
                      className="text-[#800020] dark:text-rose-400 font-bold hover:underline cursor-pointer"
                    >
                      {isMr ? "येथे क्लिक करा" : "Click here"}
                    </button>
                  </span>
                ) : (
                  <span>
                    {isMr ? "नवीन सभासद नोंदणीसाठी? " : "New member registration? "}
                    <a href="/membership" className="text-[#800020] dark:text-rose-400 font-bold hover:underline">
                      {isMr ? "ऑनलाइन अर्ज करा" : "Apply online"}
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
