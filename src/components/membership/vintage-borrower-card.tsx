"use client";

import React, { useState } from "react";
import { Check, UserCheck, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MEMBERSHIP_PLANS = [
  {
    id: "life",
    title: "आजीवन सभासदत्व (Life Membership)",
    badge: "आजीवन",
    deposit: "अनामत ठेव: निरंक",
    fee: "₹२,०००/-",
    period: "आजीवन (एकवेळ देय)",
    cardType: "LIFETIME PATRON",
    tagline: "ग्रंथालय नियमावलीनुसार आजीवन ग्रंथ देवाणघेवाण सवलत",
    features: [
      "ग्रंथालयातील सर्व ३९,९५३ मुद्रित ग्रंथांचा लाभ",
      "एका वेळी ४ पुस्तके व २ नियतकालिके घरी नेण्याची मुभा",
      "वार्षिक सर्वसाधारण सभेत सहभागाचा अधिकार",
      "वार्षिक व्याख्यानमाला व विशेष कार्यक्रम निमंत्रण",
    ],
  },
  {
    id: "annual",
    title: "वार्षिक वाचक सभासद (Annual Reader)",
    badge: "वार्षिक",
    deposit: "अनामत ठेव: ₹२००/- (परतावा योग्य)",
    fee: "₹६००/-",
    period: "प्रति वर्ष (₹५०/- प्रति महिना)",
    cardType: "ANNUAL READER",
    tagline: "१४ दिवसांच्या मुदतीवर ग्रंथ देवाणघेवाण सुविधा",
    features: [
      "कथा, कादंबरी, इतिहास व वैचारिक ग्रंथांचे वाचन",
      "१४ दिवसांच्या मुदतीसाठी २ पुस्तके घरी नेण्याची सवलत",
      "संदर्भ दालन व दैनिक वृत्तपत्र दालनाचा वापर",
      "ग्रंथसूची (OPAC) संगणकीय शोध कक्ष",
    ],
  },
  {
    id: "study",
    title: "वातानुकूलित अभ्यासिका (AC Study Wing)",
    badge: "अभ्यासिका",
    deposit: "अनामत ठेव: ₹१००/-",
    fee: "₹३५०/-",
    period: "प्रति महिना",
    cardType: "STUDY WING SCHOLAR",
    tagline: "शांत, वातानुकूलित व संदर्भ साधनांनी सुसज्ज अभ्यासिका",
    features: [
      "वातानुकूलित, शांत व प्रशस्त वैयक्तिक वाचन कक्ष",
      "दैनिक १६ तास अखंड प्रवेश (सकाळी ६ ते रात्री १०)",
      "MPSC, UPSC, स्पर्धा परीक्षा संदर्भ संग्रह",
      "हाय-स्पीड इंटरनेट व स्वतंत्र चार्जिंग सॉकेट",
    ],
  },
  {
    id: "reading_hall",
    title: "सार्वजनिक वृत्तपत्र व नियतकालिक कक्ष",
    badge: "दैनिक वाचनालय",
    deposit: "अनामत ठेव: निरंक",
    fee: "विनामूल्य",
    period: "सर्व नागरिकांसाठी खुले",
    cardType: "PUBLIC READING HALL",
    tagline: "दैनिक वर्तमानपत्रे, साप्ताहिके व मासिके वाचन कक्ष",
    features: [
      "३५ दैनिक वर्तमानपत्रे व ७० नियतकालिके वाचनासाठी उपलब्ध",
      "वाचकांसाठी बैठक व्यवस्था व संदर्भ साहाय्य",
      "वृत्तपत्र कात्रणे व संदर्भ साहित्याचा वापर",
      "सर्व नागरिकांसाठी विनामूल्य प्रवेश (सकाळी ७.०० ते रात्री ८.३०)",
    ],
  },
];

export function VintageBorrowerCard() {
  const [selectedPlanId, setSelectedPlanId] = useState("life");
  const selectedPlan = MEMBERSHIP_PLANS.find((p) => p.id === selectedPlanId) || MEMBERSHIP_PLANS[0];

  return (
    <section className="section py-12 sm:py-16">
      {/* Section Header: Dignified Committee Heading, NO Eyebrow Badge */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-white">
          ग्रंथालय सभासदत्व व वाचक नोंदणी
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-marathi-body mt-2">
          महाराष्ट्र शासन सार्वजनिक ग्रंथालय नियमावलीनुसार निश्चित वर्गणी दर व अनामत ठेव तपशील.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 Cols): Interactive Membership Tiers */}
        <div className="lg:col-span-7 space-y-3.5">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={cn(
                  "rounded-2xl p-5 border transition-all cursor-pointer relative",
                  isSelected
                    ? "bg-white dark:bg-stone-900 border-[#881337] dark:border-amber-400 shadow-md ring-2 ring-[#881337]/15 dark:ring-amber-400/20"
                    : "bg-white/80 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-marathi-heading text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                        {plan.title}
                      </h3>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                        isSelected
                          ? "bg-[#881337] text-white dark:bg-amber-400 dark:text-stone-900"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                      )}>
                        {plan.badge}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{plan.deposit}</p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-xl sm:text-2xl font-black text-[#881337] dark:text-amber-400">
                      {plan.fee}
                    </div>
                    <div className="text-[11px] text-stone-500 font-medium">{plan.period}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 text-xs text-stone-600 dark:text-stone-300 font-marathi-body">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-between">
            <p className="text-xs text-stone-500 dark:text-stone-400 font-marathi-body">
              * नोंदणीसाठी आधार कार्ड, पासपोर्ट फोटो व अनामत रक्कम रोख/ऑनलाइन स्वीकारली जाते.
            </p>
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#881337] hover:bg-[#72102E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <UserCheck className="h-4 w-4 text-amber-300" />
              <span>सभासदत्व नोंदणी अर्ज</span>
            </Link>
          </div>
        </div>

        {/* Right Column (5 Cols): Modern Digital Patron Pass */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-3xl bg-gradient-to-br from-[#881337] via-[#991B1B] to-[#580A10] p-6 sm:p-7 text-white shadow-xl border border-rose-900/40 relative overflow-hidden">
            {/* Top decorative subtle light accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header: Library Brand & Registration */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-amber-200">
                  महाराष्ट्र शासन मान्य वर्ग &apos;अ&apos;
                </p>
                <h4 className="font-marathi-heading text-lg font-bold text-white tracking-tight mt-0.5">
                  साहित्य निकेतन ग्रंथालय
                </h4>
                <p className="text-[11px] text-white/80">
                  शुक्रवार पेठ, अंबाजोगाई (स्थापना: १ ऑगस्ट १९४५)
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-mono font-bold text-amber-300 border border-white/20">
                  {selectedPlan.cardType}
                </span>
                <p className="text-[10px] text-white/70 font-mono mt-1">SN-2026/0482</p>
              </div>
            </div>

            {/* Card Body: Selected Plan Details */}
            <div className="py-5 space-y-4">
              <div>
                <span className="text-[11px] text-amber-200 uppercase tracking-wider block font-mono">
                  निवडलेले सभासदत्व
                </span>
                <p className="font-marathi-heading text-xl font-extrabold text-white mt-0.5">
                  {selectedPlan.title}
                </p>
                <p className="text-xs text-white/80 mt-1 font-marathi-body">
                  {selectedPlan.tagline}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 text-xs">
                <div>
                  <span className="text-[10px] text-white/60 block font-mono uppercase">शुल्क</span>
                  <span className="font-extrabold text-amber-300 text-sm">{selectedPlan.fee}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/60 block font-mono uppercase">मुदत</span>
                  <span className="font-bold text-white text-xs">{selectedPlan.period}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/70 pt-1">
                <span>पुस्तके देवाण-घेवाण: अधिकृत ओळखपत्र</span>
                <span className="text-emerald-300 font-bold">सक्रिय वाचक</span>
              </div>
            </div>

            {/* Footer Action Button */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-semibold text-white/90">ग्रंथालय अधिकृत ओळखपत्र</span>
              </div>

              <Link
                href="/membership"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold shadow-md transition-all"
              >
                <span>नोंदणी करा</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
