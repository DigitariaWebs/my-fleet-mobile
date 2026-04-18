// Polyfill Intl.PluralRules so i18next v4 plural format works on RN JSC.
// Must come before i18next initialization.
import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import fr from "./fr.json";
import en from "./en.json";

export type AppLocale = "fr" | "en";

export const SUPPORTED_LOCALES: AppLocale[] = ["fr", "en"];

const STORAGE_KEY = "my-fleet-mobile.locale";

const resources = {
  fr: { translation: fr },
  en: { translation: en },
};

function resolveDeviceLocale(): AppLocale {
  const tag =
    (Localization.getLocales?.()[0]?.languageCode as string | undefined) ?? "fr";
  const base = tag.toLowerCase().slice(0, 2);
  return base === "en" ? "en" : "fr";
}

// Bootstrap synchronously with the device locale so the first render has
// translations. Hydrate the persisted choice asynchronously right after.
i18n.use(initReactI18next).init({
  resources,
  lng: resolveDeviceLocale(),
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
  compatibilityJSON: "v4",
  returnNull: false,
});

void (async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored as AppLocale)) {
      if (i18n.language !== stored) {
        await i18n.changeLanguage(stored);
      }
    }
  } catch {
    // best-effort; keep the device-derived default
  }
})();

export async function setAppLocale(locale: AppLocale): Promise<void> {
  await i18n.changeLanguage(locale);
  try {
    await AsyncStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // non-fatal
  }
}

export function getCurrentLocale(): AppLocale {
  const current = (i18n.language?.slice(0, 2) ?? "fr") as AppLocale;
  return SUPPORTED_LOCALES.includes(current) ? current : "fr";
}

export default i18n;
