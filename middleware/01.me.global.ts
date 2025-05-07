export default defineNuxtRouteMiddleware(async () => {
  const store = useUserStore();

  const userToken = useCookie("user-token");
  const authToken = useCookie("auth-token");

  if (!userToken.value || !authToken.value) return;

  const { user } = storeToRefs(useUserStore());
  if (user.value) return;

  await store.recover();
});
