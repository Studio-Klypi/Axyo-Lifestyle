import { toast } from "vue-sonner";
import type { HomeCinemaState } from "~/types/miscellaneous/states";
import type { IMediaEntity, IMediaStatus, IUpdateMediaStatus, IWatchlist } from "~/types/home-cinema";

export const useHomeCinemaStore = defineStore("home-cinema", {
  state: (): HomeCinemaState => ({
    database: [],
    watchlist: [],
    status: [],
    firstLoading: true,
    loading: false,
  }),
  getters: {
    richDatabase: (state): {
      media: IMediaEntity;
      status?: IMediaStatus;
      watchListed: boolean;
    }[] => {
      return state.database.map((media) => {
        return {
          media,
          status: state.status.find(s => s.mediaId === media.id),
          watchListed: !!state.watchlist.find(w => w.mediaId === media.id),
        };
      });
    },
    userWatchlist: (state): {
      media: IMediaEntity;
      status?: IMediaStatus;
    }[] => {
      return state.watchlist.map((el) => {
        const media = el.media as IMediaEntity;
        const status = state.status.find(s => s.mediaId === media.id);

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
    storeWatchlist(watchlist: IWatchlist[]) {
      this.watchlist = watchlist;
    },
    storeStatus(status: IMediaStatus[]) {
      this.status = status;
    },
    async loadMoreEntities() {
      const t = this.getTranslator;
      this.loading = true;

      try {
        const { data } = await useFetch<IMediaEntity[]>(`/api/home-cinema/database?limit=25&offset=${this.database.length}`);
        if (!data.value) return;
        this.database = [
          ...this.database,
          ...data.value,
        ];
      }
      catch {
        toast.error(t("toasters.server-error"));
      }
      finally {
        this.firstLoading = false;
        this.loading = false;
      }
    },
    async addToWatchlist(id: number) {
      const data = await $fetch<IWatchlist>(`/api/home-cinema/watchlist/${id}`, {
        method: "POST",
      });
      this.watchlist = [
        ...this.watchlist,
        data,
      ];
    },
    async removeFromWatchlist(id: number) {
      const data = await $fetch<IWatchlist>(`/api/home-cinema/watchlist/${id}`, {
        method: "DELETE",
      });
      this.watchlist = this.watchlist.filter(el => el.mediaId !== data.mediaId);
    },
    async updateMediaStatus(id: number, payload: IUpdateMediaStatus) {
      const data = await $fetch<IMediaStatus>(`/api/home-cinema/status/${id}`, {
        method: "PUT",
        body: payload,
      });
      if (!data) return;
      if (this.status.find(s => s.userUuid === data.userUuid && s.mediaId === data.mediaId)) this.status = this.status.map(s => s.userUuid === data.userUuid && s.mediaId === data.mediaId ? data : s);
      else this.status = [...this.status, data];
    },
  },
});
