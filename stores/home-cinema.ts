import { toast } from "vue-sonner";
import type { HomeCinemaState } from "~/types/miscellaneous/states";
import type { IMediaEntity, IMediaStatus } from "~/types/home-cinema";

export const useHomeCinemaStore = defineStore("home-cinema", {
  state: (): HomeCinemaState => ({
    database: [],
    status: [],
    firstLoading: true,
    loading: false,
  }),
  getters: {
    richDatabase: (state) => {
      return state.database.map((media) => {
        return {
          media,
          status: state.status.find(s => s.mediaId === media.id) as IMediaStatus,
        };
      });
    },
    userWatchlist: (state): {
      media: IMediaEntity;
      status: IMediaStatus;
    }[] => {
      const userStore = useUserStore();
      const { user } = storeToRefs(userStore);

      const userWatchlist = user.value?.watchlist;
      return userWatchlist?.map((el) => {
        const media = el.media as IMediaEntity;
        const status = state.status.find(s => s.mediaId === media.id) as IMediaStatus;

        return {
          media,
          status,
        };
      }) ?? [];
    },
    getTranslator: () => {
      return useNuxtApp().$i18n.t;
    },
  },
  actions: {
    async loadMoreEntities() {
      const t = this.getTranslator;
      this.loading = true;

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      catch {
        toast.error(t("toasters.server-error"));
      }
      finally {
        this.firstLoading = false;
        this.loading = false;
      }
    },
    storeStatus(status: IMediaStatus[]) {
      this.status = status;
    },
  },
});
