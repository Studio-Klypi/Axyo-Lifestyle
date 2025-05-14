<script setup lang="ts">
import { Bookmark, BookmarkCheck, Heart, Star, ThumbsDown, ThumbsUp } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import type { Side } from "@floating-ui/utils";
import { cn } from "~/lib/utils";
import type { IMediaEntity, IMediaStatus } from "~/types/home-cinema";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  media: IMediaEntity;
  status: IMediaStatus;
  watchListed: boolean;
  side?: Side;
}>();
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
          :variant="status.note ? (status.note === 'BAD' ? 'destructive' : 'default') : 'outline'"
        >
          <Star v-if="status.note === 'VERY_GOOD'" />
          <ThumbsUp v-else-if="status.note === 'GOOD'" />
          <ThumbsDown v-else-if="status.note === 'BAD'" />
          <Heart v-else />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent :side="side">
        <DropdownMenuItem :variant="status.note === 'BAD' ? 'primary' : 'default'">
          <ThumbsDown />
          Bad
        </DropdownMenuItem>
        <DropdownMenuItem :variant="status.note === 'GOOD' ? 'primary' : 'default'">
          <ThumbsUp />
          Good
        </DropdownMenuItem>
        <DropdownMenuItem :variant="status.note === 'VERY_GOOD' ? 'primary' : 'default'">
          <Star />
          Very Good
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Button
      size="icon"
      :variant="watchListed ? 'default' : 'secondary'"
    >
      <BookmarkCheck v-if="watchListed" />
      <Bookmark v-else />
    </Button>
  </div>
</template>
