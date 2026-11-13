"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, BookPlus, CheckCircle2, AlertCircle } from "lucide-react";
import { TurnstileWidget } from "@/components/security/turnstile-widget";
import { useLanguage } from "@/context/language-context";
import { MotionSubmitButton } from "@/components/ui/motion-submit-button";
import { submitBookRequest } from "@/lib/actions/public-forms";

interface BookRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookRequestModal({ isOpen, onClose }: BookRequestModalProps) {
  const { language } = useLanguage();
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("मराठी साहित्य");
  const [reason, setReason] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>();
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    if (isOpen) startedAt.current = Date.now();
  }, [isOpen]);

  if (!isOpen) return null;

  const errorMessage = (code: string) => {
    if (language === "hi") {
      if (code === "rate_limit") return "बहुत अधिक प्रयास। कृपया १० मिनट बाद पुनः प्रयास करें।";
      if (code === "captcha") return "मानव सत्यापन विफल रहा। कृपया पुनः प्रयास करें।";
      if (code === "validation") return "कृपया सभी आवश्यक जानकारी जाँचें।";
      return "मांग सहेजी नहीं जा सकी। कृपया पुस्तकालय से संपर्क करें।";
    }
    if (language === "en") {
      if (code === "rate_limit") return "Too many attempts. Please try again in 10 minutes.";
      if (code === "captcha") return "Human verification failed. Please try again.";
      if (code === "validation") return "Please check the required fields.";
      return "Your request could not be saved. Please contact the library.";
    }
    if (code === "rate_limit") return "खूप वेळा प्रयत्न झाले. कृपया १० मिनिटांनंतर पुन्हा प्रयत्न करा.";
    if (code === "captcha") return "मानवी पडताळणी अयशस्वी झाली. कृपया पुन्हा प्रयत्न करा.";
    if (code === "validation") return "कृपया सर्व आवश्यक माहिती तपासा.";
    return "मागणी साठवता आली नाही. कृपया ग्रंथालयाशी संपर्क साधा.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim() || !requesterName.trim()) return;
    if (!consent) {
      setConsentError(true);
      return;
    }

    setConsentError(false);
    setSubmitError(null);
    setLoading(true);

    const result = await submitBookRequest({
      bookTitle,
      author,
      category,
      reason,
      requesterName,
      phone,
      email,
      consent: true,
      locale: language,
      website: honeypot,
      elapsedMs: Date.now() - startedAt.current,
      turnstileToken,
    });

    setLoading(false);

    if (!result.ok) {
      setSubmitError(errorMessage(result.code));
      setTurnstileToken(undefined);
      setTurnstileKey((key) => key + 1);
      return;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setBookTitle("");
    setAuthor("");
    setReason("");
    setRequesterName("");
    setPhone("");
    setEmail("");
    setConsent(false);
    setSubmitError(null);
    startedAt.current = Date.now();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-marathi-body">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#800020] p-5 text-white flex items-center justify-between border-b border-[#B8860B]/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#E5B869]">
              <BookPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-marathi-heading">
                {language === "en"
                  ? "Request a Book"
                  : language === "hi"
                    ? "नवीन पुस्तक मांग"
                    : "नवीन पुस्तक / ग्रंथ मागणी"}
              </h3>
              <p className="text-xs text-[#E5B869] font-marathi-body">
                {language === "en"
                  ? "Sahitya Niketan Book Acquisition Committee"
                  : language === "hi"
                    ? "साहित्य निकेतन पुस्तक खरीद समिति"
                    : "साहित्य निकेतन ग्रंथ खरेदी समिती"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4 font-marathi-body">
              <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white font-marathi-heading">
                {language === "en"
                  ? "Book Request Successfully Submitted!"
                  : language === "hi"
                    ? "पुस्तक मांग सफलतापूर्वक दर्ज की गई!"
                    : "पुस्तक मागणी यशस्वीरित्या नोंदवली गेली!"}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                {language === "en"
                  ? "The Acquisition Committee will evaluate your recommendation for inclusion in the upcoming monthly catalogue."
                  : language === "hi"
                    ? "ग्रन्थ खरीद समिति अगले माह ग्रन्थालय में जोड़ने हेतु आपकी अनुशंसा पर विचार करेगी।"
                    : "ग्रंथ खरेदी समिती पुढील महिन्यात ग्रंथालयात दाखल करण्यासाठी तुमच्या शिफारशीची नोंद करेल."}
              </p>
              <button
                onClick={handleReset}
                className="mt-4 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white px-6 py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer font-marathi-body"
              >
                {language === "en" ? "Close" : language === "hi" ? "बंद करें" : "बंद करा"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-marathi-body">
              {/* Honeypot — hidden from people, irresistible to naive bots. */}
              <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="book-request-website">Website</label>
                <input
                  id="book-request-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                  {language === "en" ? "Book Title *" : language === "hi" ? "पुस्तक का नाम *" : "पुस्तकाचे नाव *"}
                </label>
                <input
                  type="text"
                  required
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder={
                    language === "en"
                      ? "e.g. Discovery of India / MPSC GS Manual"
                      : language === "hi"
                        ? "उदा. राजा शिवछत्रपति / प्रतियोगी परीक्षा मार्गदर्शिका"
                        : "उदा. राजा शिवछत्रपती / MPSC मार्गदर्शिका"
                  }
                  className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                    {language === "en" ? "Author" : language === "hi" ? "लेखक" : "लेखक"}
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder={language === "en" ? "Author Name" : language === "hi" ? "लेखक का नाम" : "लेखकाचे नाव"}
                    className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                    {language === "en" ? "Category / Genre" : language === "hi" ? "विभाग / श्रेणी" : "विभाग / श्रेणी"}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                  >
                    <option value="मराठी साहित्य">
                      {language === "en" ? "Marathi Literature & Novels" : language === "hi" ? "मराठी साहित्य / उपन्यास" : "मराठी साहित्य / कादंबरी"}
                    </option>
                    <option value="स्पर्धा परीक्षा">
                      {language === "en" ? "Competitive Exams (MPSC/UPSC)" : language === "hi" ? "प्रतियोगी परीक्षा (MPSC/UPSC)" : "स्पर्धा परीक्षा (MPSC/UPSC)"}
                    </option>
                    <option value="हिन्दी साहित्य">
                      {language === "en" ? "Hindi Literature" : language === "hi" ? "हिन्दी साहित्य" : "हिन्दी साहित्य"}
                    </option>
                    <option value="संस्कृत व इतिहास">
                      {language === "en" ? "Sanskrit & History" : language === "hi" ? "संस्कृत एवं इतिहास" : "संस्कृत व इतिहास"}
                    </option>
                    <option value="बाल साहित्य">
                      {language === "en" ? "Children's Literature" : language === "hi" ? "बाल साहित्य" : "बाल साहित्य"}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                  {language === "en" ? "Your Full Name *" : language === "hi" ? "आपका पूरा नाम *" : "तुमचे पूर्ण नाव *"}
                </label>
                <input
                  type="text"
                  required
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  placeholder={language === "en" ? "Patron Name" : language === "hi" ? "पाठक का नाम" : "वाचकाचे नाव"}
                  className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                    {language === "en" ? "Contact Number" : language === "hi" ? "सम्पर्क नंबर" : "संपर्क / मोबाईल नंबर"}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                    {language === "en" ? "Email (optional)" : language === "hi" ? "ईमेल (वैकल्पिक)" : "ईमेल (ऐच्छिक)"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                  {language === "en" ? "Why do you need this book?" : language === "hi" ? "आपको यह पुस्तक क्यों चाहिए?" : "हे पुस्तक का आवश्यक आहे?"}
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={
                    language === "en"
                      ? "Study, competitive exam, research…"
                      : language === "hi"
                        ? "अध्ययन, प्रतियोगी परीक्षा, शोध…"
                        : "अभ्यास, स्पर्धा परीक्षा, संशोधन…"
                  }
                  className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none resize-none"
                />
              </div>

              {/* DPDP Act 2023: explicit, recorded consent. */}
              <div className="rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] p-3.5">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (e.target.checked) setConsentError(false);
                    }}
                    required
                    aria-invalid={consentError}
                    aria-describedby={consentError ? "book-request-consent-error" : undefined}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#800020]"
                  />
                  <span className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-300">
                    {language === "en" ? (
                      <>
                        I have read the{" "}
                        <Link href="/privacy" className="font-bold underline text-[#800020] dark:text-[#E5B869]">
                          Privacy Policy
                        </Link>{" "}
                        and consent to my details being used to process this
                        book request.
                      </>
                    ) : language === "hi" ? (
                      <>
                        मैंने{" "}
                        <Link href="/privacy" className="font-bold underline text-[#800020] dark:text-[#E5B869]">
                          गोपनीयता नीति
                        </Link>{" "}
                        पढ़ी है और इस पुस्तक मांग को संसाधित करने हेतु अपनी
                        जानकारी के उपयोग की सहमति देता/देती हूँ।
                      </>
                    ) : (
                      <>
                        मी{" "}
                        <Link href="/privacy" className="font-bold underline text-[#800020] dark:text-[#E5B869]">
                          गोपनीयता धोरण
                        </Link>{" "}
                        वाचले आहे आणि ही ग्रंथ मागणी प्रक्रिया करण्यासाठी माझी
                        माहिती वापरण्यास संमती देतो/देते.
                      </>
                    )}
                  </span>
                </label>
                {consentError && (
                  <p id="book-request-consent-error" role="alert" className="mt-2 text-[11px] font-semibold text-red-600 dark:text-red-400">
                    {language === "en"
                      ? "Please give consent to continue."
                      : language === "hi"
                        ? "आगे बढ़ने के लिए कृपया सहमति दें।"
                        : "कृपया पुढे जाण्यासाठी संमती द्या."}
                  </p>
                )}
              </div>

              {submitError && (
                <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Cloudflare Turnstile Bot Protection */}
              <TurnstileWidget key={turnstileKey} onVerify={setTurnstileToken} />

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#E5DDD0] dark:border-[#332228] px-4 py-2.5 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-[#F3ECE3] dark:hover:bg-[#180E11] transition-colors cursor-pointer"
                >
                  {language === "en" ? "Cancel" : language === "hi" ? "रद्द करें" : "रद्द करा"}
                </button>
                <MotionSubmitButton
                  type="submit"
                  disabled={loading}
                  isPending={loading}
                  isSuccess={submitted}
                  label={
                    language === "en"
                      ? "Submit Request"
                      : language === "hi"
                        ? "मांग दर्ज करें"
                        : "मागणी नोंदवा"
                  }
                  pendingLabel={
                    language === "en"
                      ? "Submitting..."
                      : language === "hi"
                        ? "दर्ज की जा रही है..."
                        : "नोंदवत आहे..."
                  }
                  successLabel={
                    language === "en"
                      ? "Request Submitted! Thank you."
                      : language === "hi"
                        ? "मांग दर्ज हुई! धन्यवाद।"
                        : "मागणी नोंदवली! धन्यवाद."
                  }
                  variant="primary"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
