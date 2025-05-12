<script setup lang="ts">
import { HelpCircle } from "lucide-vue-next";
import Layout from "~/components/shared/composition/Layout.vue";
import AppSidebar from "~/components/shared/navigation/AppSidebar.vue";
import UserDropdown from "~/components/shared/user/UserDropdown.vue";
import GettingHelp from "~/components/shared/utilities/GettingHelp.vue";

const store = useUserStore();
const { user } = storeToRefs(store);
const displayName = computed(() => useRoute().meta.displayName || "app.name");
</script>

<template>
  <Layout v-if="user">
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <div class="w-full min-h-dvh flex flex-col">
          <header class="h-12 flex items-center justify-between p-2.5 pl-4 border-b">
            <div class="flex items-center gap-2">
              <SidebarTrigger class="md:hidden" />
              <p class="font-medium">
                {{ $t(displayName) }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <UserDropdown />
            </div>
          </header>

          <main class="p-4 flex-1">
            <NuxtPage />
          </main>

          <GettingHelp />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </Layout>
</template>
