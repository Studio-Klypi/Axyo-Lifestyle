import type { IUser } from "~/types/authentication/users";
import type { IMediaStatus } from "~/types/home-cinema";

export default defineNuxtRouteMiddleware(async () => {
  const store = useUserStore();

  const userToken = useCookie("user-token");
  const authToken = useCookie("auth-token");

  if (!userToken.value || !authToken.value) return;

  const { user } = storeToRefs(useUserStore());
  if (user.value) return;

  await store.recover();

  if (!user.value) return;
  useHomeCinemaStore().storeStatus((user.value as IUser).mediaStatus ?? []);
});
