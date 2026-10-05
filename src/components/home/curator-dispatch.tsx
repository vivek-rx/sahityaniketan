"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ShieldCheck, Quote, Stamp, History, Award } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Button, 
  Chip 
} from "@heroui/react";
import { useLanguage } from "@/context/language-context";

export function CuratorDispatch() {
  const { language, t } = useLanguage();

  return (
    <section className="py-14 sm:py-18 bg-[#FAF6F0] border-b border-[#E8E0D5] font-marathi-body relative overflow-hidden">
      {/* Subtle traditional sacred background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C89B3C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="bg-white rounded-3xl border border-[#E8E0D5] p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Curator Portrait with Archival Seal */}
              <div className="lg:col-span-4 relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border-4 border-[#FAF2E6] shadow-md">
                  <Image
                    src="/images/real/library_savarkar_portrait.png"
                    alt="साहित्य निकेतन ग्रंथालय — मुख्य ग्रंथपाल व संग्रह संरक्षक"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#240609]/95 via-[#240609]/60 to-transparent p-4 text-white text-center">
                    <span className="font-marathi-heading font-extrabold text-base sm:text-lg block drop-shadow-xs">
                      {t.curatorName}
                    </span>
                    <span className="text-xs sm:text-sm text-[#DDB258] block font-marathi-body font-bold">
                      {t.curatorRole}
                    </span>
                    <span className="text-[11px] text-[#E8DACB] block font-marathi-body mt-0.5">
                      साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई
                    </span>
                  </div>
                </div>

                {/* Physical Accession Tag using HeroUI */}
                <div className="mt-3 bg-[#FAF2E6] rounded-xl p-3 border border-[#C89B3C]/30 text-center font-marathi-body">
                  <span className="text-[11px] font-mono text-[#78350F] block uppercase tracking-wider font-bold">
                    CLASSIFICATION: 027.45479 / SNG-AMB
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#C0392B] block mt-0.5">
                    महाराष्ट्र शासन मान्यताप्राप्त सार्वजनिक ग्रंथालय वर्ग &apos;अ&apos;
                  </span>
                </div>
              </div>

              {/* Middle: Curator Note & Literary Reflection */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip
                    variant="primary"
                    size="md"
                    className="bg-[#FAF2E6] text-[#C0392B] border border-[#C89B3C]/50 font-bold px-3 py-1 shadow-2xs"
                  >
                    <div className="flex items-center gap-1.5">
                      <Quote className="h-4 w-4 text-[#BF4B1A]" />
                      <span>{t.curatorTitle}</span>
                    </div>
                  </Chip>
                  <Chip
                    variant="secondary"
                    size="sm"
                    className="bg-[#F5EFE4] text-[#8C3410] font-bold text-xs"
                  >
                    ९५ वर्षांची विचारसंस्कृती
                  </Chip>
                </div>

                <h2 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1A18] leading-tight">
                  पुस्तके ही केवळ अक्षरे नसतात, ती{" "}
                  <span className="text-[#C0392B] underline decoration-[#C89B3C] decoration-2 underline-offset-4">
                    जिवंत विचारसंस्कृती
                  </span>{" "}
                  असतात
                </h2>

                <blockquote className="font-marathi-serif text-base sm:text-lg lg:text-xl text-[#3D3531] leading-relaxed italic border-l-4 border-[#C0392B] pl-5 py-2 font-medium bg-[#FAF6F0]/60 rounded-r-xl">
                  {t.curatorQuote}
                </blockquote>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E8E0D5] flex items-center gap-3">
                    <History className="h-6 w-6 text-[#BF4B1A] shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-[#8C3410]">अखंड सेवा</span>
                      <span className="text-sm font-extrabold text-[#1F1A18]">स्थापना १९३१ पासून निरंतर</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E8E0D5] flex items-center gap-3">
                    <Award className="h-6 w-6 text-[#C89B3C] shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-[#8C3410]">शासकीय मान्यता</span>
                      <span className="text-sm font-extrabold text-[#1F1A18]">उच्चतम दर्जा &apos;अ&apos; वर्ग संस्था</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link href="/about">
                    <Button
                      variant="primary"
                      className="rounded-full bg-[#C0392B] hover:bg-[#A93226] text-white px-6 py-3 text-xs sm:text-sm font-extrabold transition-all font-marathi-body shadow-xs flex items-center gap-2 border border-[#C89B3C]/40 cursor-pointer"
                    >
                      <span>{t.readNote}</span>
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="rounded-full border border-[#D5C9B8] bg-white hover:bg-[#FAF2E6] text-[#1F1A18] px-5 py-3 text-xs sm:text-sm font-bold transition-all font-marathi-body shadow-2xs cursor-pointer"
                    >
                      <span>{t.contactUs}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
