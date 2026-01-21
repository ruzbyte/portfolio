import { register, init, getLocaleFromNavigator } from "svelte-i18n";

register("en", () => import("./en.json"));
register("de", () => import("./de.json"));

// Extract base language (en-US -> en)
const browserLocale = getLocaleFromNavigator();
const supportedLocales = ["en", "de"];
const initialLocale =
  supportedLocales.find((l) => browserLocale?.startsWith(l)) || "en";

init({
  fallbackLocale: "en",
  initialLocale,
});
