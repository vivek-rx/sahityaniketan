"use client";

import { useState } from "react";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Send, CheckCircle2, ExternalLink, AlertCircle } from "lucide-react";
import { TurnstileWidget } from "@/components/security/turnstile-widget";
import { useLanguage } from "@/context/language-context";
import { MotionSubmitButton } from "@/components/ui/motion-submit-button";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (currentData = formData) => {
    const newErrors: Record<string, string> = {};

    if (!currentData.name.trim()) {
      newErrors.name =
        language === "mr"
          ? "कृपया आपले नाव प्रविष्ट करा."
          : language === "hi"
            ? "कृपया अपना नाम दर्ज करें।"
            : "Please enter your full name.";
    }

    if (!currentData.phone.trim()) {
      newErrors.phone =
        language === "mr"
          ? "कृपया मोबाईल क्रमांक प्रविष्ट करा."
          : language === "hi"
            ? "कृपया मोबाइल नंबर दर्ज करें।"
            : "Please enter your mobile number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!currentData.email.trim()) {
      newErrors.email =
        language === "mr"
          ? "कृपया ईमेल पत्ता प्रविष्ट करा."
          : language === "hi"
            ? "कृपया ईमेल पता दर्ज करें।"
            : "Please enter your email address.";
    } else if (!emailRegex.test(currentData.email.trim())) {
      newErrors.email =
        language === "mr"
          ? "कृपया वैध ईमेल पत्ता प्रविष्ट करा (उदा. user@domain.com)."
          : language === "hi"
            ? "कृपया वैध ईमेल पता दर्ज करें (उदा. user@domain.com)।"
            : "Please enter a valid email address (e.g. user@domain.com).";
    }

    if (!currentData.message.trim()) {
      newErrors.message =
        language === "mr"
          ? "कृपया आपला संदेश प्रविष्ट करा."
          : language === "hi"
            ? "कृपया अपना संदेश दर्ज करें।"
            : "Please enter your message.";
    } else if (currentData.message.trim().length < 10) {
      newErrors.message =
        language === "mr"
          ? `संदेश किमान १० अक्षरांचा असणे आवश्यक आहे (सध्या: ${currentData.message.trim().length} अक्षरे).`
          : language === "hi"
            ? `संदेश न्यूनतम १० अक्षरों का होना चाहिए (वर्तमान: ${currentData.message.trim().length} अक्षर)।`
            : `Message must be at least 10 characters long (currently: ${currentData.message.trim().length}).`;
    }

    return newErrors;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate();
    setErrors(currentErrors);
  };

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      const currentErrors = validate(updated);
      setErrors(currentErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setErrors({});
        setTouched({});
      }, 4000);
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] min-h-screen transition-colors">
        <PageHeader
          title={
            language === "mr"
              ? "ग्रंथालय संपर्क व वाचनालय वेळ"
              : language === "hi"
                ? "पुस्तकालय सम्पर्क एवं वाचनालय समय"
                : "Contact Secretariat & Library Hours"
          }
          subtitle={
            language === "mr"
              ? "ग्रंथालयाशी थेट संपर्क साधा, सभासद नोंदणी करा किंवा वाचन कक्षाला प्रत्यक्ष भेट द्या."
              : language === "hi"
                ? "ग्रन्थालय से सीधा सम्पर्क करें, सदस्यता हेतु पूछताछ करें या वाचनालय आएं।"
                : "Reach out to the Chief Librarian, inquire about memberships, or visit our reading halls."
          }
        />

        <section className="section py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details Column */}
            <div className="bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#800020]/10 dark:bg-[#800020]/25 text-[#800020] dark:text-[#E5B869] flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#800020] dark:text-[#E5B869] text-base font-marathi-heading">
                    {language === "mr" ? "ग्रंथालय कार्यालय" : language === "hi" ? "ग्रन्थालय कार्यालय" : "Library Secretariat"}
                  </h3>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    अंबाजोगाई, महाराष्ट्र
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-devanagari">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-1" />
                  <span>
                    साहित्य निकेतन सार्वजनिक ग्रंथालय, शुक्रवार पेठ, अंबाजोगाई - ४३१५१७, जि. बीड, महाराष्ट्र.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-0.5" />
                  <div>
                    <a href="tel:+919096642583" className="font-bold block text-gray-900 dark:text-[#FAF2E8] hover:text-[#800020] dark:hover:text-[#E5B869]">
                      +91 90966 42583
                    </a>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      कार्यालय: +91 2446 247125
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-0.5" />
                  <div>
                    <a href="mailto:ta2601001@gmail.com" className="font-bold block text-gray-900 dark:text-[#FAF2E8] hover:text-[#800020] dark:hover:text-[#E5B869]">
                      ta2601001@gmail.com
                    </a>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      पर्यायी: sahityaniketan.ambajogai@gmail.com
                    </span>
                  </div>
                </div>

                {/* Facebook Button */}
                <div className="pt-2 border-t border-[#E5DDD0] dark:border-[#332228]">
                  <a
                    href="https://www.facebook.com/p/%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF-%E0%A4%A8%E0%A4%BF%E0%A4%95%E0%A5%87%E0%A4%A4%E0%A4%A8-%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%82%E0%A4%A5%E0%A4%BE%E0%A4%B2%E0%A4%AF-%E0%A4%85%E0%A4%82%E0%A4%AC%E0%A4%BE%E0%A4%9C%E0%A5%8B%E0%A4%97%E0%A4%BE%E0%A4%88-100083041525325/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white px-3.5 py-2.5 text-xs font-bold transition-colors w-full justify-center shadow-xs"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>{language === "mr" ? "अधिकृत फेसबुक पेजला भेट द्या" : language === "hi" ? "आधिकारिक फेसबुक पेज देखें" : "Visit Official Facebook Page"}</span>
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </a>
                </div>

                <div className="flex items-start gap-2.5 border-t border-[#E5DDD0] dark:border-[#332228] pt-3">
                  <Clock className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-gray-900 dark:text-[#FAF2E8] block">
                      {t.footerHours}
                    </span>
                    <span className="block text-stone-600 dark:text-stone-300">{t.footerHoursText}</span>
                    <span className="block text-stone-500 dark:text-stone-400 text-xs mt-0.5">
                      {language === "mr" ? "अभ्यासिका: सकाळी ६:०० ते रात्री १०:००" : language === "hi" ? "अध्ययन कक्ष: प्रातः ६:०० से रात्रि १०:००" : "Study Hall: 6:00 AM – 10:00 PM"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Form Column (2 cols) */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-6 sm:p-8 shadow-sm">
              <h3 className="font-devanagari text-xl font-bold text-gray-900 dark:text-[#FAF2E8] mb-1">
                {language === "mr" ? "ग्रंथालय प्रशासनास संदेश पाठवा" : language === "hi" ? "पुस्तकालय प्रशासन को संदेश भेजें" : "Send a Message to the Library Administration"}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-devanagari mb-6">
                {language === "mr" ? "पुस्तक मागणी, सभासद चौकशी किंवा अभिप्राय नोंदवा" : language === "hi" ? "पुस्तक मांग, सदस्यता पूछताछ या सुझाव दर्ज करें" : "Book request, membership query, or feedback"}
              </p>

              {isSubmitted ? (
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-6 text-center text-emerald-800 dark:text-emerald-300 space-y-2 font-devanagari">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base">
                    {language === "mr" ? "आपला संदेश यशस्वीरित्या पाठवला गेला आहे!" : language === "hi" ? "आपका संदेश सफलतापूर्वक भेजा गया!" : "Your message has been received!"}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    {language === "mr" ? "साहित्य निकेतन ग्रंथालय प्रशासन लवकरच आपल्याशी संपर्क करेल." : language === "hi" ? "साहित्य निकेतन प्रशासन शीघ्र ही आपसे सम्पर्क करेगा।" : "Our secretariat will get back to you shortly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-[#FAF2E8] mb-1">
                        {language === "mr" ? "आपले पूर्ण नाव *" : language === "hi" ? "आपका पूरा नाम *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className={`w-full rounded-xl border bg-[#FAF8F5] dark:bg-[#120B0D] text-stone-900 dark:text-[#FAF2E8] px-3.5 py-2.5 text-xs sm:text-sm focus:ring-1 focus:outline-none transition-all ${
                          touched.name && errors.name
                            ? "border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                            : "border-[#E5DDD0] dark:border-[#332228] focus:border-[#800020] dark:focus:border-[#E5B869] focus:ring-[#800020]"
                        }`}
                      />
                      {touched.name && errors.name && (
                        <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-devanagari">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-[#FAF2E8] mb-1">
                        {language === "mr" ? "मोबाईल क्रमांक *" : language === "hi" ? "मोबाइल नंबर *" : "Mobile Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        className={`w-full rounded-xl border bg-[#FAF8F5] dark:bg-[#120B0D] text-stone-900 dark:text-[#FAF2E8] px-3.5 py-2.5 text-xs sm:text-sm focus:ring-1 focus:outline-none transition-all ${
                          touched.phone && errors.phone
                            ? "border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                            : "border-[#E5DDD0] dark:border-[#332228] focus:border-[#800020] dark:focus:border-[#E5B869] focus:ring-[#800020]"
                        }`}
                      />
                      {touched.phone && errors.phone && (
                        <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-devanagari">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-stone-700 dark:text-[#FAF2E8]">
                          {language === "mr" ? "ईमेल पत्ता *" : language === "hi" ? "ईमेल पता *" : "Email Address *"}
                        </label>
                        {touched.email && errors.email && (
                          <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                            {language === "mr" ? "अवैध स्वरूप" : language === "hi" ? "अमान्य प्रारूप" : "Invalid format"}
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        placeholder="name@example.com"
                        className={`w-full rounded-xl border bg-[#FAF8F5] dark:bg-[#120B0D] text-stone-900 dark:text-[#FAF2E8] px-3.5 py-2.5 text-xs sm:text-sm focus:ring-1 focus:outline-none transition-all ${
                          touched.email && errors.email
                            ? "border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                            : "border-[#E5DDD0] dark:border-[#332228] focus:border-[#800020] dark:focus:border-[#E5B869] focus:ring-[#800020]"
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-devanagari">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-[#FAF2E8] mb-1">
                        {language === "mr" ? "विषय" : language === "hi" ? "विषय" : "Subject"}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] text-stone-900 dark:text-[#FAF2E8] px-3.5 py-2.5 text-xs sm:text-sm focus:border-[#800020] dark:focus:border-[#E5B869] focus:ring-1 focus:ring-[#800020] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-stone-700 dark:text-[#FAF2E8]">
                        {language === "mr" ? "संदेश किंवा पुस्तक मागणी *" : language === "hi" ? "संदेश या पुस्तक मांग *" : "Message / Book Request *"}
                      </label>
                      <span className={`text-[11px] font-mono ${
                        formData.message.trim().length >= 10
                          ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                          : "text-stone-400 dark:text-stone-500"
                      }`}>
                        {formData.message.trim().length}/10 {language === "mr" ? "किमान अक्षरे" : language === "hi" ? "न्यूनतम अक्षर" : "min chars"}
                      </span>
                    </div>
                    <textarea
                      required
                      minLength={10}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      placeholder={
                        language === "mr"
                          ? "येथे आपला संदेश किंवा पुस्तक मागणी सविस्तर लिहा (किमान १० अक्षरे)..."
                          : language === "hi"
                            ? "यहाँ अपना संदेश या पुस्तक मांग विस्तार से लिखें (न्यूनतम १० अक्षर)..."
                            : "Write your detailed message or book request here (min 10 characters)..."
                      }
                      className={`w-full rounded-xl border bg-[#FAF8F5] dark:bg-[#120B0D] text-stone-900 dark:text-[#FAF2E8] px-3.5 py-2.5 text-xs sm:text-sm focus:ring-1 focus:outline-none resize-none transition-all ${
                        touched.message && errors.message
                          ? "border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                          : "border-[#E5DDD0] dark:border-[#332228] focus:border-[#800020] dark:focus:border-[#E5B869] focus:ring-[#800020]"
                      }`}
                    />
                    {touched.message && errors.message && (
                      <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-devanagari">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Cloudflare Turnstile Protection */}
                  <TurnstileWidget onVerify={(token) => console.log("Turnstile Token Verified:", token)} />

                  <MotionSubmitButton
                    type="submit"
                    isPending={isPending}
                    isSuccess={isSubmitted}
                    label={
                      language === "mr"
                        ? "संदेश पाठवा (Send Message)"
                        : language === "hi"
                          ? "संदेश भेजें (Send Message)"
                          : "Send Message"
                    }
                    pendingLabel={
                      language === "mr"
                        ? "पाठवत आहे... (Sending...)"
                        : language === "hi"
                          ? "भेजा जा रहा है..."
                          : "Sending..."
                    }
                    successLabel={
                      language === "mr"
                        ? "धन्यवाद! संदेश प्राप्त झाला (Received)"
                        : language === "hi"
                          ? "धन्यवाद! संदेश प्राप्त हुआ"
                          : "Thank you, message received"
                    }
                    variant="primary"
                  />
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
