<script setup lang="ts">
import { Facebook } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import Page from "~/components/shared/composition/Page.vue";
import { PasswordRegex } from "~/lib/constants";

definePageMeta({
  layout: "authentication",
});

const schema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().regex(PasswordRegex),
}));
const form = useForm({
  validationSchema: schema,
});
const submit = form.handleSubmit(async values => console.log(values));
</script>

<template>
  <Page name="auth/login">
    <form
      class="flex flex-col gap-6"
      @submit="submit"
    >
      <header class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-bold">
          {{ $t("login.title") }}
        </h1>
        <p class="text-balance text-sm text-muted-foreground">
          {{ $t("login.caption") }}
        </p>
      </header>

      <main class="grid gap-6">
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>{{ $t("login.form.email") }}</FormLabel>
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
            <div class="flex items-center">
              <FormLabel>{{ $t("login.form.password") }}</FormLabel>
              <NuxtLinkLocale
                to="/auth/login"
                class="ml-auto text-sm underline-offset-4 hover:underline"
              >
                {{ $t("login.form.forgot-password") }}
              </NuxtLinkLocale>
            </div>
            <FormControl v-bind="componentField">
              <Input type="password" />
            </FormControl>
          </FormItem>
        </FormField>

        <Button
          type="submit"
          class="w-full"
        >
          {{ $t("login.form.login-btn") }}
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
          {{ $t("login.form.login-with", { provider: $t("labels.providers.facebook") }) }}
        </Button>
      </main>

      <footer class="text-center text-sm">
        {{ $t("login.form.no-account") }}
        <NuxtLinkLocale
          to="/auth/sign-up"
          class="underline underline-offset-4"
        >
          {{ $t("btn.sign-up") }}
        </NuxtLinkLocale>
      </footer>
    </form>
  </Page>
</template>
