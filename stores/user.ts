import { toast } from "vue-sonner";
import type { FetchError } from "ofetch";
import type { UserState } from "~/types/miscellaneous/states";
import type { IUser } from "~/types/authentication/users";
import { EStatusCode } from "~/types/miscellaneous/http";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    loading: {
      register: false,
      login: false,
    },
  }),
  getters: {
    getTranslator: () => {
      const { $i18n } = useNuxtApp();
      return $i18n.t;
    },
  },
  actions: {
    async recover() {
      const { data } = await useFetch<IUser>("/api/auth/me");
      if (!data.value) return;
      console.log(data.value);
      this.user = data.value;
    },
    async register(data: {
      username: string;
      email: string;
      password: string;
    }) {
      const t = this.getTranslator;
      this.loading.register = true;

      try {
        this.user = await $fetch<IUser>("/api/auth/sign-up", {
          method: "POST",
          body: data,
        });
        toast.success(t("register.toasters.account-created", {
          username: this.user.username,
          appName: t("app.name"),
        }));
        navigateTo(useLocalePath()("/app"));
      }
      catch (e) {
        switch ((e as FetchError).statusCode) {
          case EStatusCode.Conflict: {
            toast.error(t("register.toasters.invalid-credentials"));
            break;
          }
          default: {
            toast.error(t("toasters.server-error"));
            break;
          }
        }
      }
      finally {
        this.loading.register = false;
      }
    },
    async login(data: {
      email: string;
      password: string;
    }) {
      const t = this.getTranslator;
      this.loading.register = true;

      try {
        this.user = await $fetch<IUser>("/api/auth/sign-in", {
          method: "POST",
          body: data,
        });
        toast.success(t("login.toasters.login-successfully", {
          username: this.user.username,
        }));
        navigateTo(useLocalePath()("/app"));
      }
      catch (e) {
        switch ((e as FetchError).statusCode) {
          case EStatusCode.Conflict: {
            toast.error(t("login.toasters.invalid-credentials"));
            break;
          }
          default: {
            toast.error(t("toasters.server-error"));
            break;
          }
        }
      }
      finally {
        this.loading.register = false;
      }
    },
  },
});
