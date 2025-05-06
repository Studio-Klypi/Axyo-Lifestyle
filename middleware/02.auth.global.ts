import type { RouteAuthRule, StrictRouteAuthRule } from "~/types/miscellaneous/front-router";

export default defineNuxtRouteMiddleware((to) => {
  const auth = (to.meta.auth ?? {
    mode: "lax",
  }) as RouteAuthRule;

  if (auth.mode === "lax") return;

  const { user } = storeToRefs(useUserStore());

  if ((auth as StrictRouteAuthRule).value && !user.value) return navigateTo(useLocalePath()("/auth/sign-in"));
  if (!(auth as StrictRouteAuthRule).value && user.value) return navigateTo(useLocalePath()("/app"));
});
