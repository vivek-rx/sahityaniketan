import type { Metadata } from "next";
import AwardsClient from "./awards-client";

export const metadata: Metadata = {
  title: "वाचकांचा निवड पुरस्कार | Readers' Choice Awards",
  description:
    "साहित्य निकेतन ग्रंथालयाचा वाचकांचा निवड पुरस्कार — आवडते पुस्तक निवडा आणि मतदान करा. Readers' Choice Book Awards of Sahitya Niketan Library, Ambajogai.",
};

export default function AwardsPage() {
  return <AwardsClient />;
}
