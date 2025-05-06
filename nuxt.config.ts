// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxtjs/i18n", "@nuxtjs/color-mode"],
  devtools: { enabled: true },
  css: ["~/tailwind.css"],
  compatibilityDate: "2024-11-01",
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json",
      },
    ],
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
    classPrefix: "",
  },
});
