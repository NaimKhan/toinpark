import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Force reload 1
import enMessages from "../messages/en.json";
import frMessages from "../messages/fr.json";
import deMessages from "../messages/de.json";

const messages = {
  en: enMessages,
  fr: frMessages,
  de: deMessages,
  // Add more locales as needed
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  // pick the valid locale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Get messages for the selected locale, fallback to default if not found
  const localeMessages =
    messages[locale as keyof typeof messages] || messages.en;

  return {
    locale,
    messages: localeMessages,
  };
});
