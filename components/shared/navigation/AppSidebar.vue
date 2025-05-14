<script setup lang="ts">
import { Sparkles, AlarmClockCheck, LayoutDashboard, Film, Bookmark } from "lucide-vue-next";
import { Panda } from "~/components/shared/icons";
import SidebarNavigation from "~/components/shared/navigation/sidebar/SidebarNavigation.vue";

const store = useUserStore();
const { user } = storeToRefs(store);

const sidebarContent = [
  {
    children: [
      {
        label: "navigation.default.overview",
        icon: LayoutDashboard,
        url: "/app",
      },
    ],
  },
  {
    label: "navigation.productivity.title",
    children: [
      {
        label: "navigation.productivity.quick-tasks",
        icon: AlarmClockCheck,
        url: "/app/productivity/quick-tasks",
      },
    ],
  },
  {
    label: "navigation.home-cinema.title",
    children: [
      {
        label: "navigation.home-cinema.database",
        icon: Film,
        url: "/app/home-cinema/database",
      },
      {
        label: "navigation.home-cinema.watchlist",
        icon: Bookmark,
        url: "/app/home-cinema/watchlist",
      },
    ],
  },
];
</script>

<template>
  <Sidebar
    v-if="user"
    collapsible="icon"
  >
    <SidebarHeader>
      <div class="flex items-center gap-2 overflow-hidden">
        <span class="shrink-0 size-8 rounded-md grid place-items-center bg-stone-950 dark:bg-stone-50 text-stone-50 dark:text-stone-950">
          <Panda class="size-4" />
        </span>
        <p class="font-medium text-foreground">
          {{ $t("app.name") }}
        </p>
      </div>
    </SidebarHeader>

    <SidebarNavigation :nav-content="sidebarContent" />

    <SidebarFooter v-if="user.subscriptionPlan !== 'PREMIUM'">
      <Card class="pt-4 pb-2 gap-4">
        <CardContent class="px-4 grid gap-2">
          <CardTitle>{{ $t("labels.go-to-premium.title") }}</CardTitle>
          <CardDescription class="text-muted-foreground">
            {{ $t("labels.go-to-premium.caption") }}
          </CardDescription>
        </CardContent>

        <CardFooter class="px-2">
          <Button
            size="sm"
            class="w-full"
          >
            <Sparkles />
            {{ $t("labels.go-to-premium.button") }}
          </Button>
        </CardFooter>
      </Card>
    </SidebarFooter>
  </Sidebar>
</template>
