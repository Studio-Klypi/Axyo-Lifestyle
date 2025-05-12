<script setup lang="ts">
import { HelpCircle } from "lucide-vue-next";
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        size="iconLg"
        class="bottom-6 right-6 fixed rounded-full"
      >
        <HelpCircle class="size-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      side="top"
      align="end"
    >
      <DropdownMenuItem>
        <HelpCircle />
        {{ $t("context.get-help.help-center") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
