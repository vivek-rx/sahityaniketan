"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Calendar, CheckCircle2, Download, ExternalLink, MapPin, Clock, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { MotionSubmitButton } from "@/components/ui/motion-submit-button";
import { TurnstileWidget } from "@/components/security/turnstile-widget";
import { submitEventRsvp } from "@/lib/actions/public-forms";

interface EventRSVPModalProps {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EventRSVPModal({
  eventTitle,
  eventDate,
  eventTime,
  venue,
  isOpen,
  onClose,
}: EventRSVPModalProps) {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendees, setAttendees] = useState("1");
  const [loading, setLoading] = useState(false);
  const [isRSVPed, setIsRSVPed] = useState(false);
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
      return "आरक्षण सहेजा नहीं जा सका। कृपया पुस्तकालय से संपर्क करें।";
    }
    if (language === "en") {
      if (code === "rate_limit") return "Too many attempts. Please try again in 10 minutes.";
      if (code === "captcha") return "Human verification failed. Please try again.";
      if (code === "validation") return "Please check the required fields.";
      return "Your reservation could not be saved. Please contact the library.";
    }
    if (code === "rate_limit") return "खूप वेळा प्रयत्न झाले. कृपया १० मिनिटांनंतर पुन्हा प्रयत्न करा.";
    if (code === "captcha") return "मानवी पडताळणी अयशस्वी झाली. कृपया पुन्हा प्रयत्न करा.";
    if (code === "validation") return "कृपया सर्व आवश्यक माहिती तपासा.";
    return "आरक्षण साठवता आले नाही. कृपया ग्रंथालयाशी संपर्क साधा.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!consent) {
      setConsentError(true);
      return;
    }

    setConsentError(false);
    setSubmitError(null);
    setLoading(true);

    const result = await submitEventRsvp({
      eventTitle,
      eventDate,
      eventTime,
      venue,
      name,
      phone,
      attendees: Number(attendees),
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

    setIsRSVPed(true);
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(eventTitle);
    const details = encodeURIComponent(`साहित्य निकेतन ग्रंथालय कार्यक्रम • ${eventTitle}`);
    const loc = encodeURIComponent(venue || "साहित्य निकेतन ग्रंथालय, अंबाजोगाई");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${loc}`;
  };

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sahitya Niketan Granthalaya//Ambajogai//EN
BEGIN:VEVENT
SUMMARY:${eventTitle}
DESCRIPTION:साहित्य निकेतन ग्रंथालय कार्यक्रम • ${eventTitle}
LOCATION:${venue || "Sahitya Niketan Library, Ambajogai"}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `event-${Date.now()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-marathi-body">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#800020] p-5 text-white flex items-center justify-between border-b border-[#B8860B]/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#E5B869]">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-marathi-heading">
                {language === "en"
                  ? "Seat Registration (RSVP)"
                  : language === "hi"
                    ? "उपस्थिति पंजीकरण (RSVP)"
                    : "उपस्थिती नोंदणी (Event RSVP)"}
              </h3>
              <p className="text-xs text-[#E5B869] font-marathi-body">
                {language === "en" ? "Sahitya Niketan Library, Ambajogai" : "साहित्य निकेतन ग्रंथालय, अंबाजोगाई"}
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
          {/* Event Summary Card */}
          <div className="bg-[#FAF8F5] dark:bg-[#180E11] p-4 rounded-2xl border border-[#E5DDD0] dark:border-[#332228] mb-5 space-y-2">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-[#FAF2E8] font-marathi-heading leading-snug">
              {eventTitle}
            </h4>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 dark:text-stone-300 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869]" />
                {eventDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869]" />
                {eventTime}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869]" />
                {venue}
              </span>
            </div>
          </div>

          {isRSVPed ? (
            <div className="py-6 text-center space-y-4 font-marathi-body">
              <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <h4 className="text-lg font-bold text-gray-900 dark:text-[#FAF2E8] font-marathi-heading">
                {language === "en"
                  ? "Registration Confirmed!"
                  : language === "hi"
                    ? "उपस्थिति सफलतापूर्वक दर्ज की गई!"
                    : "उपस्थिती यशस्वीरित्या नोंदवली गेली!"}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                {language === "en"
                  ? "Your seat has been reserved. Add an event reminder to your calendar:"
                  : language === "hi"
                    ? "आपकी सीट आरक्षित कर दी गई है। कार्यक्रम स्मरण पत्र अपने कैलेंडर में जोड़ें:"
                    : "तुमची सीट आरक्षित करण्यात आली आहे. कार्यक्रमाचे रिमांडर तुमच्या कॅलेंडरमध्ये जोडा:"}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto rounded-xl bg-[#800020] hover:bg-[#66001A] text-white px-5 py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm font-marathi-body cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>
                    {language === "en"
                      ? "Add to Google Calendar"
                      : language === "hi"
                        ? "Google Calendar में जोड़ें"
                        : "Google Calendar मध्ये जोडा"}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={handleDownloadICS}
                  className="w-full sm:w-auto rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] text-stone-800 dark:text-[#FAF2E8] px-4 py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-[#F3ECE3] dark:hover:bg-[#25151C] font-marathi-body cursor-pointer"
                >
                  <Download className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
                  <span>
                    {language === "en"
                      ? "Download .ICS file"
                      : language === "hi"
                        ? ".ICS फाइल डाउनलोड करें"
                        : ".ICS फाइल डाउनलोड करा"}
                  </span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="mt-3 text-xs font-bold text-stone-500 hover:underline cursor-pointer"
              >
                {language === "en" ? "Close" : language === "hi" ? "बंद करें" : "बंद करा"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-marathi-body">
              {/* Honeypot — hidden from people, irresistible to naive bots. */}
              <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="rsvp-website">Website</label>
                <input
                  id="rsvp-website"
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
                  {language === "en" ? "Full Name *" : language === "hi" ? "पूरा नाम *" : "पूर्ण नाव *"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === "en" ? "e.g. Rahul Deshpande" : "उदा. राहुल देशपांडे"}
                  className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                    {language === "en" ? "Mobile Number *" : language === "hi" ? "मोबाइल नंबर *" : "मोबाईल नंबर *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                    {language === "en" ? "Seats / Attendees" : language === "hi" ? "सीट संख्या" : "आसन संख्या"}
                  </label>
                  <select
                    value={attendees}
                    onChange={(e) => setAttendees(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                  >
                    <option value="1">
                      {language === "en" ? "1 Person" : language === "hi" ? "१ व्यक्ति" : "१ व्यक्ती"}
                    </option>
                    <option value="2">
                      {language === "en" ? "2 Persons" : language === "hi" ? "२ व्यक्ति" : "२ व्यक्ती"}
                    </option>
                    <option value="3">
                      {language === "en" ? "3 Persons" : language === "hi" ? "३ व्यक्ति" : "३ व्यक्ती"}
                    </option>
                    <option value="4">
                      {language === "en" ? "4+ Family" : language === "hi" ? "४+ पारिवारिक" : "४+ कौटुंबिक"}
                    </option>
                  </select>
                </div>
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
                    aria-describedby={consentError ? "rsvp-consent-error" : undefined}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#800020]"
                  />
                  <span className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-300">
                    {language === "en" ? (
                      <>
                        I have read the{" "}
                        <Link href="/privacy" className="font-bold underline text-[#800020] dark:text-[#E5B869]">
                          Privacy Policy
                        </Link>{" "}
                        and consent to my name and phone number being used for
                        this event reservation.
                      </>
                    ) : language === "hi" ? (
                      <>
                        मैंने{" "}
                        <Link href="/privacy" className="font-bold underline text-[#800020] dark:text-[#E5B869]">
                          गोपनीयता नीति
                        </Link>{" "}
                        पढ़ी है और इस कार्यक्रम के आरक्षण हेतु अपने नाम व फोन
                        नंबर के उपयोग की सहमति देता/देती हूँ।
                      </>
                    ) : (
                      <>
                        मी{" "}
                        <Link href="/privacy" className="font-bold underline text-[#800020] dark:text-[#E5B869]">
                          गोपनीयता धोरण
                        </Link>{" "}
                        वाचले आहे आणि या कार्यक्रमाच्या आरक्षणासाठी माझे नाव व
                        मोबाईल क्रमांक वापरण्यास संमती देतो/देते.
                      </>
                    )}
                  </span>
                </label>
                {consentError && (
                  <p id="rsvp-consent-error" role="alert" className="mt-2 text-[11px] font-semibold text-red-600 dark:text-red-400">
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

              <TurnstileWidget key={turnstileKey} onVerify={setTurnstileToken} />

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-[#E5DDD0] dark:border-[#332228] px-4 py-2.5 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-[#F3ECE3] dark:hover:bg-[#180E11] transition-colors cursor-pointer"
                >
                  {language === "en" ? "Cancel" : language === "hi" ? "रद्द करें" : "रद्द करा"}
                </button>
                <MotionSubmitButton
                  type="submit"
                  disabled={loading}
                  isPending={loading}
                  isSuccess={isRSVPed}
                  label={
                    language === "en"
                      ? "Reserve Seat"
                      : language === "hi"
                        ? "सीट आरक्षित करें"
                        : "सीट आरक्षित करा"
                  }
                  pendingLabel={
                    language === "en"
                      ? "Reserving..."
                      : language === "hi"
                        ? "आरक्षित किया जा रहा है..."
                        : "नोंदवत आहे..."
                  }
                  successLabel={
                    language === "en"
                      ? "Reserved! Thank You."
                      : language === "hi"
                        ? "आरक्षण सफल! धन्यवाद।"
                        : "आरक्षण यशस्वी! धन्यवाद."
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
