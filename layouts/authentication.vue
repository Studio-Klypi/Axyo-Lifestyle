<script setup lang="ts">
import Layout from "~/components/shared/composition/Layout.vue";
import { Panda } from "~/components/shared/icons";
</script>

<template>
  <Layout
    name="authentication"
    class="grid lg:grid-cols-2"
  >
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div class="flex justify-center gap-2 md:justify-start">
        <NuxtLinkLocale
          to="/"
          class="flex items-center gap-2 font-medium"
        >
          <span class="grid place-items-center size-8 rounded-md bg-primary text-primary-foreground">
            <Panda class="size-4" />
          </span>
          {{ $t("app.name") }}
        </NuxtLinkLocale>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-sm">
          <NuxtPage />
        </div>
      </div>
    </div>

    <div class="relative hidden bg-muted lg:block">
      <NuxtImg
        src="/images/placeholder.webp"
        alt=""
        class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </Layout>
</template>
