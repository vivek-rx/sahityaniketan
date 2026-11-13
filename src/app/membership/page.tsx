"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { CheckCircle2, UserCheck, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { MotionSubmitButton } from "@/components/ui/motion-submit-button";
import { TurnstileWidget } from "@/components/security/turnstile-widget";
import { submitMembershipApplication } from "@/lib/actions/public-forms";

export default function MembershipPage() {
  const { language } = useLanguage();
  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>();
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    idType: "aadhaar",
  });

  const errorMessage = (code: string) => {
    if (language === "hi") {
      if (code === "rate_limit") return "बहुत अधिक प्रयास। कृपया १० मिनट बाद पुनः प्रयास करें।";
      if (code === "captcha") return "मानव सत्यापन विफल रहा। कृपया पुनः प्रयास करें।";
      if (code === "validation") return "कृपया सभी आवश्यक जानकारी जाँचें।";
      return "आवेदन सहेजा नहीं जा सका। कृपया पुस्तकालय से संपर्क करें।";
    }
    if (language === "en") {
      if (code === "rate_limit") return "Too many attempts. Please try again in 10 minutes.";
      if (code === "captcha") return "Human verification failed. Please try again.";
      if (code === "validation") return "Please check the required fields.";
      return "Your application could not be saved. Please contact the library.";
    }
    if (code === "rate_limit") return "खूप वेळा प्रयत्न झाले. कृपया १० मिनिटांनंतर पुन्हा प्रयत्न करा.";
    if (code === "captcha") return "मानवी पडताळणी अयशस्वी झाली. कृपया पुन्हा प्रयत्न करा.";
    if (code === "validation") return "कृपया सर्व आवश्यक माहिती तपासा.";
    return "अर्ज साठवता आला नाही. कृपया ग्रंथालयाशी संपर्क साधा.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // DPDP Act 2023: no processing without an explicit, recorded consent.
    if (!consent) {
      setConsentError(true);
      return;
    }

    setConsentError(false);
    setSubmitError(null);

    if (!formData.fullName || !formData.email) return;

    setIsPending(true);

    const result = await submitMembershipApplication({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      idType: formData.idType as "aadhaar" | "voter" | "passport" | "student",
      consent: true,
      locale: language,
      website: honeypot,
      elapsedMs: Date.now() - startedAt.current,
      turnstileToken,
    });

    setIsPending(false);

    if (!result.ok) {
      setSubmitError(errorMessage(result.code));
      setTurnstileToken(undefined);
      setTurnstileKey((key) => key + 1);
      return;
    }

    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] min-h-screen transition-colors">
        <PageHeader
          title={
            language === "mr"
              ? "ग्रंथालय सभासदत्व नोंदणी अर्ज"
              : language === "hi"
                ? "पुस्तकालय सदस्यता पंजीकरण"
                : "Library Membership Application"
          }
          subtitle={
            language === "mr"
              ? "नोंदणीकृत ग्रंथसंग्रह, संदर्भ कक्ष व ग्रंथ देवाणघेवाण सेवेसाठी सभासदत्व अर्ज."
              : language === "hi"
                ? "पंजीकृत ग्रन्थ संग्रह, संदर्भ कक्ष एवं ग्रन्थ निर्गमन सेवा हेतु सदस्यता आवेदन।"
                : "Application for book borrowing, reading hall access, and institutional membership privileges."
          }
        />

        <section className="section py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Membership Benefits */}
            <div className="bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-6 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#800020]/10 dark:bg-[#800020]/25 text-[#800020] dark:text-[#E5B869] flex items-center justify-center">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-[#FAF2E8] font-marathi-heading">
                    {language === "mr" ? "सभासद नियम व सुविधा" : language === "hi" ? "सदस्य नियम व सुविधाएं" : "Membership Rules & Facilities"}
                  </h3>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {language === "mr" ? "ग्रंथालय नियमावलीनुसार" : language === "hi" ? "नियमानुसार" : "Subject to library rules"}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-0.5" />
                  <span>{language === "mr" ? "३९,९५३ मुद्रित ग्रंथ व संदर्भ साहित्याचा प्रत्यक्ष अभ्यास" : "Access to 39,953 registered printed volumes and reference collections"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-0.5" />
                  <span>{language === "mr" ? "एका वेळी २ पुस्तके १४ दिवसांच्या मुदतीसाठी घरी नेण्याची सुविधा" : "Borrow up to 2 books for 14 days per circulation rules"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-0.5" />
                  <span>{language === "mr" ? "शांत व प्रकाशमान अभ्यासिका व संदर्भ वाचन कक्ष सुविधा" : "Quiet study hall and reference reading room facilities"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-0.5" />
                  <span>{language === "mr" ? "वार्षिक व्याख्यानमाला, साहित्यिक कार्यक्रम व ग्रंथप्रदर्शने" : "Invitations to annual lectures, literary gatherings, and book exhibitions"}</span>
                </li>
              </ul>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-6 md:p-8 shadow-xs">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-[#FAF2E8] font-marathi-heading">
                    {language === "mr" ? "सभासद अर्ज यशस्वीरित्या सादर झाला!" : "Application Submitted Successfully!"}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                    {language === "mr"
                      ? "ग्रंथालय कार्यालयाकडून २४ तासांत अर्जाची छाननी केली जाईल आणि पुढील प्रक्रियेसाठी संपर्क साधला जाईल."
                      : language === "hi"
                        ? "पुस्तकालय कार्यालय द्वारा २४ घंटों में आवेदन की जाँच की जाएगी और आगे की प्रक्रिया हेतु संपर्क किया जाएगा।"
                        : "The library office will review your application within 24 hours and contact you with the next steps."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot — hidden from people, irresistible to naive bots. */}
                  <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="membership-website">Website</label>
                    <input
                      id="membership-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-[#FAF2E8] border-b border-[#E5DDD0] dark:border-[#332228] pb-3 font-marathi-heading">
                    {language === "mr" ? "ऑनलाइन सभासद नोंदणी अर्ज" : language === "hi" ? "ऑनलाइन सदस्यता पंजीकरण" : "Online Membership Form"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-[#FAF2E8] mb-1">
                        {language === "mr" ? "पूर्ण नाव *" : language === "hi" ? "पूरा नाम *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="उदा. रमेश कुमार शर्मा"
                        className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:ring-1 focus:ring-[#800020] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-[#FAF2E8] mb-1">
                        {language === "mr" ? "ईमेल पत्ता *" : language === "hi" ? "ईमेल पता *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ramesh@example.com"
                        className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:ring-1 focus:ring-[#800020] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-[#FAF2E8] mb-1">
                        {language === "mr" ? "मोबाईल क्रमांक *" : language === "hi" ? "मोबाइल नंबर *" : "Mobile Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 90966 42583"
                        className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:ring-1 focus:ring-[#800020] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-[#FAF2E8] mb-1">
                        {language === "mr" ? "ओळखपत्र पुरावा" : language === "hi" ? "पहचान पत्र" : "Government ID Proof"}
                      </label>
                      <select
                        value={formData.idType}
                        onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                        className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:ring-1 focus:ring-[#800020] focus:outline-none transition-all"
                      >
                        <option value="aadhaar">Aadhaar Card (आधार कार्ड)</option>
                        <option value="voter">Voter ID (मतदान ओळखपत्र)</option>
                        <option value="passport">Passport (पासपोर्ट)</option>
                        <option value="student">Student ID (विद्यार्थी ओळखपत्र)</option>
                      </select>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
                        {language === "mr"
                          ? "ओळखपत्राचा प्रकार फक्त सभासदत्व पडताळणीसाठी विचारला जातो. ओळखपत्र क्रमांक संकेतस्थळावर साठवला जात नाही."
                          : language === "hi"
                            ? "पहचान पत्र का प्रकार केवल सदस्यता सत्यापन हेतु पूछा जाता है। पहचान पत्र संख्या वेबसाइट पर संग्रहीत नहीं की जाती।"
                            : "ID type is collected only to verify membership eligibility. ID numbers are not stored on this website."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-[#FAF2E8] mb-1">
                      {language === "mr" ? "रहिवासी पत्ता" : language === "hi" ? "निवास का पता" : "Residential Address"}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder={language === "mr" ? "घर क्र., गल्ली, परिसर, शहर, पिन कोड..." : "Enter house no, street, area, city, pin code..."}
                      className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:ring-1 focus:ring-[#800020] focus:outline-none resize-none transition-all"
                    />
                  </div>

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
                        aria-describedby={consentError ? "consent-error" : undefined}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#800020]"
                      />
                      <span className="text-[11px] sm:text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                        {language === "mr" ? (
                          <>
                            मी{" "}
                            <Link href="/privacy" className="font-bold underline text-[#800020] dark:text-[#E5B869]">
                              गोपनीयता धोरण
                            </Link>{" "}
                            वाचले आहे आणि सभासदत्व प्रक्रियेसाठी माझी वैयक्तिक
                            माहिती (नाव, संपर्क, ओळखपत्राचा प्रकार) वापरण्यास
                            संमती देतो/देते. मी माझी संमती कधीही मागे घेऊ शकतो/शकते.
                          </>
                        ) : language === "hi" ? (
                          <>
                            मैंने{" "}
                            <Link href="/privacy" className="font-bold underline text-[#800020] dark:text-[#E5B869]">
                              गोपनीयता नीति
                            </Link>{" "}
                            पढ़ी है और सदस्यता प्रक्रिया हेतु अपनी व्यक्तिगत
                            जानकारी के उपयोग पर सहमति देता/देती हूँ। मैं यह
                            सहमति कभी भी वापस ले सकता/सकती हूँ।
                          </>
                        ) : (
                          <>
                            I have read the{" "}
                            <Link href="/privacy" className="font-bold underline text-[#800020] dark:text-[#E5B869]">
                              Privacy Policy
                            </Link>{" "}
                            and consent to my personal data (name, contact
                            details, ID type) being used to process this
                            membership application. I can withdraw consent at
                            any time.
                          </>
                        )}
                      </span>
                    </label>
                    {consentError && (
                      <p id="consent-error" role="alert" className="mt-2 text-[11px] font-semibold text-red-600 dark:text-red-400">
                        {language === "mr"
                          ? "कृपया पुढे जाण्यासाठी संमती द्या."
                          : language === "hi"
                            ? "आगे बढ़ने के लिए कृपया सहमति दें।"
                            : "Please give consent to continue."}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <TurnstileWidget
                    key={turnstileKey}
                    onVerify={setTurnstileToken}
                  />

                  <MotionSubmitButton
                    type="submit"
                    fullWidth
                    isPending={isPending}
                    isSuccess={submitted}
                    label={
                      language === "mr"
                        ? "सभासदत्व अर्ज सादर करा"
                        : language === "hi"
                          ? "सदस्यता आवेदन जमा करें"
                          : "Submit Membership Application"
                    }
                    pendingLabel={
                      language === "mr"
                        ? "अर्ज नोंदवला जात आहे..."
                        : language === "hi"
                          ? "आवेदन जमा हो रहा है..."
                          : "Submitting Application..."
                    }
                    successLabel={
                      language === "mr"
                        ? "सभासद अर्ज यशस्वीरित्या सादर झाला!"
                        : language === "hi"
                          ? "आवेदन सफलतापूर्वक जमा हुआ!"
                          : "Application Submitted Successfully!"
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
