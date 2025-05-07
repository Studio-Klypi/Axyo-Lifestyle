// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

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
  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },
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
    admin: {
      key: "",
    },
    public: {
      assistant: {
        name: "",
      },
    },
  },
  compatibilityDate: "2024-11-01",
  nitro: {
    rollupConfig: {
      plugins: [
        vue(),
      ],
    },
  },
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
      Poppins: {
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
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
