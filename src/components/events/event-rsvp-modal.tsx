"use client";

import { useState } from "react";
import { X, Calendar, CheckCircle2, Download, ExternalLink, MapPin, Clock, Users } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { MotionSubmitButton } from "@/components/ui/motion-submit-button";

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsRSVPed(true);
    }, 600);
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
                {language === "mr" ? "उपस्थिती नोंदणी (Event RSVP)" : "Event Seat Registration"}
              </h3>
              <p className="text-xs text-[#E5B869] font-marathi-body">
                साहित्य निकेतन ग्रंथालय, अंबाजोगाई
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
                उपस्थिती यशस्वीरित्या नोंदवली गेली!
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                तुमची सीट आरक्षित करण्यात आली आहे. कार्यक्रमाचे रिमांडर तुमच्या कॅलेंडरमध्ये जोडा:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto rounded-xl bg-[#800020] hover:bg-[#66001A] text-white px-5 py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm font-marathi-body cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Google Calendar मध्ये जोडा</span>
                </a>

                <button
                  type="button"
                  onClick={handleDownloadICS}
                  className="w-full sm:w-auto rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] text-stone-800 dark:text-[#FAF2E8] px-4 py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-[#F3ECE3] dark:hover:bg-[#25151C] font-marathi-body cursor-pointer"
                >
                  <Download className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
                  <span>.ICS फाइल डाउनलोड करा</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="mt-3 text-xs font-bold text-stone-500 hover:underline cursor-pointer"
              >
                बंद करा
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-marathi-body">
              <div>
                <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                  पूर्ण नाव *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. राहुल देशपांडे"
                  className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                    मोबाईल नंबर *
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
                    आसन संख्या
                  </label>
                  <select
                    value={attendees}
                    onChange={(e) => setAttendees(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                  >
                    <option value="1">१ व्यक्ती</option>
                    <option value="2">२ व्यक्ती</option>
                    <option value="3">३ व्यक्ती</option>
                    <option value="4">४+ कौटुंबिक</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-[#E5DDD0] dark:border-[#332228] px-4 py-2.5 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-[#F3ECE3] dark:hover:bg-[#180E11] transition-colors cursor-pointer"
                >
                  रद्द करा
                </button>
                <MotionSubmitButton
                  type="submit"
                  disabled={loading}
                  isPending={loading}
                  isSuccess={isRSVPed}
                  label="सीट आरक्षित करा"
                  pendingLabel="नोंदवत आहे..."
                  successLabel="आरक्षण यशस्वी! धन्यवाद."
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
