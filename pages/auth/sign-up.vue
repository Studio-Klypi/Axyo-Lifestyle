<script setup lang="ts">
import { Facebook } from "lucide-vue-next";
import Page from "~/components/shared/composition/Page.vue";

definePageMeta({
  layout: "authentication",
});
</script>

<template>
  <Page name="auth/login">
    <form class="flex flex-col gap-6">
      <header class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-bold">
          {{ $t("register.title") }}
        </h1>
        <p class="text-balance text-sm text-muted-foreground">
          {{ $t("register.caption") }}
        </p>
      </header>

      <main class="grid gap-6">
        <FormField
          v-slot="{ componentField }"
          name="username"
        >
          <FormItem>
            <FormLabel>{{ $t("register.form.username") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="john.doe" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>{{ $t("register.form.email") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="email"
                placeholder="m@example.com"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="password"
        >
          <FormItem>
            <FormLabel>{{ $t("register.form.password") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input type="password" />
            </FormControl>
          </FormItem>
        </FormField>

        <Button
          type="submit"
          class="w-full"
        >
          {{ $t("register.form.register-btn") }}
        </Button>
        <div class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span class="relative z-10 bg-background px-2 text-muted-foreground">
            {{ $t("labels.continue-with") }}
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
        >
          <Facebook />
          {{ $t("register.form.register-with", { provider: $t("labels.providers.facebook") }) }}
        </Button>
      </main>

      <footer class="text-center text-sm">
        {{ $t("register.form.got-account") }}
        <NuxtLinkLocale
          to="/auth/sign-in"
          class="underline underline-offset-4"
        >
          {{ $t("btn.sign-in") }}
        </NuxtLinkLocale>
      </footer>
    </form>
  </Page>
</template>
