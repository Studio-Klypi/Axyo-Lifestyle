<script setup lang="ts">
import { Bookmark, BookmarkCheck, Heart, Star, ThumbsDown, ThumbsUp } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import type { Side } from "@floating-ui/utils";
import { toast } from "vue-sonner";
import { cn } from "~/lib/utils";
import type { EMediaNotation, IMediaEntity, IMediaStatus } from "~/types/home-cinema";

const { t } = useI18n();

const props = defineProps<{
  class?: HTMLAttributes["class"];
  media: IMediaEntity;
  status?: IMediaStatus;
  watchListed: boolean;
  side?: Side;
}>();

const hcStore = useHomeCinemaStore();

function rateMedia(rating: EMediaNotation) {
  const currentRating = props.status?.note;

  if (currentRating === rating) {
    toast.promise(async () => await hcStore.updateMediaStatus(props.media.id, {
      note: null,
    }), {
      loading: t("home-cinema.toasters.save-rating.loading", { name: props.media.title }),
      success: t("home-cinema.toasters.save-rating.success", { name: props.media.title }),
      error: t("home-cinema.toasters.save-rating.error", { name: props.media.title }),
    });
    return;
  }

  toast.promise(async () => await hcStore.updateMediaStatus(props.media.id, {
    note: rating,
  }), {
    loading: t("home-cinema.toasters.save-rating.loading", { name: props.media.title }),
    success: t("home-cinema.toasters.save-rating.success", { name: props.media.title }),
    error: t("home-cinema.toasters.save-rating.error", { name: props.media.title }),
  });
}
function addToWatchList() {
  toast.promise(async () => await hcStore.addToWatchlist(props.media.id), {
    loading: t("home-cinema.toasters.add-to-watchlist.loading", {
      name: props.media.title,
    }),
    success: t("home-cinema.toasters.add-to-watchlist.success", {
      name: props.media.title,
    }),
    error: t("home-cinema.toasters.add-to-watchlist.error", {
      name: props.media.title,
    }),
  });
}
function removeFromWatchList() {
  toast.promise(async () => await hcStore.removeFromWatchlist(props.media.id), {
    loading: t("home-cinema.toasters.remove-from-watchlist.loading", {
      name: props.media.title,
    }),
    success: t("home-cinema.toasters.remove-from-watchlist.success", {
      name: props.media.title,
    }),
    error: t("home-cinema.toasters.remove-from-watchlist.error", {
      name: props.media.title,
    }),
  });
}
</script>

<template>
  <div
    :class="cn(
      'flex items-center gap-2',
      props.class,
    )"
  >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          size="icon"
          :variant="status?.note ? (status?.note === 'BAD' ? 'destructive' : 'default') : 'outline'"
        >
          <Star v-if="status?.note === 'VERY_GOOD'" />
          <ThumbsUp v-else-if="status?.note === 'GOOD'" />
          <ThumbsDown v-else-if="status?.note === 'BAD'" />
          <Heart v-else />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent :side="side">
        <DropdownMenuItem
          :variant="status?.note === 'BAD' ? 'primary' : 'default'"
          @click="rateMedia('BAD')"
        >
          <ThumbsDown />
          Bad
        </DropdownMenuItem>
        <DropdownMenuItem
          :variant="status?.note === 'GOOD' ? 'primary' : 'default'"
          @click="rateMedia('GOOD')"
        >
          <ThumbsUp />
          Good
        </DropdownMenuItem>
        <DropdownMenuItem
          :variant="status?.note === 'VERY_GOOD' ? 'primary' : 'default'"
          @click="rateMedia('VERY_GOOD')"
        >
          <Star />
          Very Good
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button
      v-if="watchListed"
      size="icon"
      variant="default"
      @click="removeFromWatchList"
    >
      <BookmarkCheck />
    </Button>
    <Button
      v-else
      size="icon"
      variant="outline"
      @click="addToWatchList"
    >
      <Bookmark />
    </Button>
  </div>
</template>
