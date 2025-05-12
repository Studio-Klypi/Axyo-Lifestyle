<script setup lang="ts">
import { LogOut, Settings, Globe, Palette, Sparkles } from "lucide-vue-next";

const store = useUserStore();
const { user } = storeToRefs(store);

const colorMode = useColorMode();
const { locale, locales } = useI18n();
const switchLocale = useSwitchLocalePath();
</script>

<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger as-child>
      <Button
        size="icon"
        variant="outline"
        class="rounded-full"
      >
        <Avatar>
          <AvatarImage
            v-if="user.avatar?.thumbnail"
            :src="user.avatar?.thumbnail"
          />
          <AvatarFallback class="uppercase">
            {{ user.username.substring(0, 2) }}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      class="min-w-56"
      align="end"
    >
      <DropdownMenuGroup>
        <div class="flex items-center gap-3 px-1.5 py-2">
          <Avatar class="size-10">
            <AvatarImage
              v-if="user.avatar?.thumbnail"
              :src="user.avatar?.thumbnail"
            />
            <AvatarFallback class="uppercase">
              {{ user.username.substring(0, 2) }}
            </AvatarFallback>
          </Avatar>

          <div class="leading-none">
            <p class="text-foreground font-medium">
              {{ user.username }}
            </p>
            <span class="text-sm">{{ user.email }}</span>
          </div>
        </div>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <template v-if="user.subscriptionPlan !== 'PREMIUM'">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            {{ $t("labels.go-to-premium.button") }}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </template>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Settings />
          {{ $t("context.user-menu.settings") }}
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Globe />
            {{ $t("context.user-menu.language") }}
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup v-model="locale">
                <DropdownMenuRadioItem
                  v-for="aloc in locales"
                  :key="aloc.code"
                  :value="aloc.code"
                  @click="navigateTo(switchLocale(aloc.code))"
                >
                  {{ aloc.name }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette />
            {{ $t("context.user-menu.theme") }}
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup v-model="colorMode.preference">
                <DropdownMenuRadioItem value="system">
                  {{ $t("labels.themes.system") }}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="light">
                  {{ $t("labels.themes.light") }}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  {{ $t("labels.themes.dark") }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive">
          <LogOut />
          {{ $t("btn.log-out") }}
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
