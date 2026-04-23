import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n";

export default function SurveyRootPage() {
  redirect(`/${defaultLocale}/survey`);
}
