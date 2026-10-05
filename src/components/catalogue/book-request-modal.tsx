"use client";

import { useState } from "react";
import { X, BookPlus, CheckCircle2, Send, FileText } from "lucide-react";
import { TurnstileWidget } from "@/components/security/turnstile-widget";
import { useLanguage } from "@/context/language-context";
import { MotionSubmitButton } from "@/components/ui/motion-submit-button";

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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim() || !requesterName.trim()) return;

    setLoading(true);
    // Simulate submission to library acquisition board
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setBookTitle("");
    setAuthor("");
    setReason("");
    setRequesterName("");
    setPhone("");
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
                {language === "mr" ? "नवीन पुस्तक / ग्रंथ मागणी" : "Request a New Book"}
              </h3>
              <p className="text-xs text-[#E5B869] font-marathi-body">
                साहित्य निकेतन ग्रंथ खरेदी समिती (Book Acquisition Committee)
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
                पुस्तक मागणी यशस्वीरित्या नोंदवली गेली!
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                ग्रंथ खरेदी समिती पुढील महिन्यात ग्रंथालयात दाखल करण्यासाठी तुमच्या शिफारशीची नोंद करेल.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white px-6 py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer font-marathi-body"
              >
                बंद करा (Close)
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-marathi-body">
              <div>
                <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                  पुस्तकाचे नाव (Book Title) *
                </label>
                <input
                  type="text"
                  required
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="उदा. राजा शिवछत्रपती / MPSC General Studies Manual"
                  className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                    लेखक (Author)
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="लेखकाचे नाव"
                    className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                    विभाग / श्रेणी (Category)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                  >
                    <option value="मराठी साहित्य">मराठी साहित्य / कादंबरी</option>
                    <option value="स्पर्धा परीक्षा">स्पर्धा परीक्षा (MPSC/UPSC)</option>
                    <option value="हिन्दी साहित्य">हिन्दी साहित्य</option>
                    <option value="संस्कृत व इतिहास">संस्कृत व इतिहास</option>
                    <option value="बाल साहित्य">बाल साहित्य</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                  तुमचे नाव (Your Name) *
                </label>
                <input
                  type="text"
                  required
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  placeholder="वाचकाचे नाव"
                  className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-700 dark:text-stone-300 mb-1">
                  संपर्क / फोन (Phone Number)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="उदा. 9876543210"
                  className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#120B0D] px-3.5 py-2.5 text-xs text-stone-900 dark:text-[#FAF2E8] focus:border-[#800020] dark:focus:border-[#E5B869] focus:outline-none"
                />
              </div>

              {/* Cloudflare Turnstile Bot Protection */}
              <TurnstileWidget onVerify={(token) => console.log("Turnstile verified:", token)} />

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#E5DDD0] dark:border-[#332228] px-4 py-2.5 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-[#F3ECE3] dark:hover:bg-[#180E11] transition-colors cursor-pointer"
                >
                  रद्द करा (Cancel)
                </button>
                <MotionSubmitButton
                  type="submit"
                  disabled={loading}
                  isPending={loading}
                  isSuccess={submitted}
                  label="मागणी नोंदवा (Submit Request)"
                  pendingLabel="नोंदवत आहे... (Submitting...)"
                  successLabel="मागणी नोंदवली! धन्यवाद."
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
