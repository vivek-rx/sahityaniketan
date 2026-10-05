"use client";

import { useState } from "react";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { CheckCircle2, ShieldCheck, FileText, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { MotionSubmitButton } from "@/components/ui/motion-submit-button";

export default function MembershipPage() {
  const { language } = useLanguage();
  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    idType: "aadhaar",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email) {
      setIsPending(true);
      setTimeout(() => {
        setIsPending(false);
        setSubmitted(true);
      }, 1000);
    }
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
                      ? "आपला सभासद नोंदणी क्रमांक SN-2026-8942 आहे. ग्रंथालय कार्यालयाकडून २४ तासांत छाननी केली जाईल."
                      : "Your membership application has been received. Your registration ID is SN-2026-8942."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
