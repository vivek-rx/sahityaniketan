import { redirect } from "next/navigation";

/**
 * /about/trustees is a legacy alias — the canonical page is /trustees.
 * Previously this re-exported the trustees page, producing duplicate
 * content at two URLs (bad for SEO). Redirect instead.
 */
export default function LegacyTrusteesPage() {
  redirect("/trustees");
}
