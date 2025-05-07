<script setup lang="ts">
import { Tailwind, Html, Head, Body, Container, Section, Link, Preview } from "@vue-email/components";
import config from "./tailwind.config";

defineProps<{
  title: string;
  preview: string;
}>();
</script>

<template>
  <Html lang="en">
    <Head>
      <meta charset="utf-8">
      <title>{{ title }}</title>
    </Head>
    <Preview>{{ preview }}</Preview>

    <Body>
      <Tailwind :config="config">
        <Container>
          <Section class="h-20 flex items-center justify-center bg-stone-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-md bg-stone-950 text-stone-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 w-4"
                >
                  <path d="M11.25 17.25h1.5L12 18z" />
                  <path d="m15 12 2 2" />
                  <path d="M18 6.5a.5.5 0 0 0-.5-.5" />
                  <path d="M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83" />
                  <path d="M6 6.5a.495.495 0 0 1 .5-.5" />
                  <path d="m9 12-2 2" />
                </svg>
              </div>
              <span class="font-semibold">Axyo</span>
            </div>
          </Section>

          <Section class="px-6">
            <slot />
          </Section>

          <Section class="px-6 py-3 bg-stone-950 text-stone-50 rounded-lg">
            &copy; All rights reserved - 2025, <Link
              href="http://localhost:3000/"
              class="text-stone-50 underline-offset-4 hover:underline"
            >
              Axyo
            </Link>
          </Section>
        </Container>
      </Tailwind>
    </Body>
  </Html>
</template>
