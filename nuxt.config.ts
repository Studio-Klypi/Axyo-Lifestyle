// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "shadcn-nuxt",
    "nuxt-mailer",
    "nuxt-scheduler",
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  devtools: { enabled: true },
  css: ["~/tailwind.css"],
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
    classPrefix: "",
  },
  runtimeConfig: {
    mailer: {
      host: "",
      port: "",
      user: "",
      pass: "",
      from: {
        name: "",
        email: "",
      },
    },
  },
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
  googleFonts: {
    families: {
      Lexend: {
        ital: "100..900",
        wght: "100..900",
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
  pinia: {
    storesDirs: ["./stores/**"],
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});
