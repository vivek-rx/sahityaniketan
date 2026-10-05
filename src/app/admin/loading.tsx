import { BobbingDots } from "@/components/ui/bobbing-dots";

export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <BobbingDots size="lg" className="text-[#00657E]" />
        <p
          className="text-slate-400 text-sm font-medium tracking-wider"
          style={{ fontFamily: "Kohinoor Devanagari, sans-serif" }}
        >
          प्रशासक नियंत्रण कक्ष लोड होत आहे...
        </p>
      </div>
    </div>
  );
}
