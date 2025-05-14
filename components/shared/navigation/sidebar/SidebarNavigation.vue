<script setup lang="ts">
import { ChevronRight, type LucideIcon } from "lucide-vue-next";

interface NavGroup {
  label?: string;
  children: NavGroupChild[];
}
interface NavGroupChild {
  label: string;
  icon?: LucideIcon;
  new?: boolean;
  url: string;
}

defineProps<{
  navContent: NavGroup[];
}>();
</script>

<template>
  <SidebarContent>
    <template
      v-for="(group, index) in navContent"
      :key="`${group.label}-${index}`"
    >
      <Collapsible
        v-if="group.label"
        :title="$t(group.label)"
        default-open
        class="group/collapsible"
      >
        <SidebarGroup>
          <SidebarGroupLabel
            as-child
            class="group/label text-sidebar-foreground cursor-pointer"
          >
            <CollapsibleTrigger>
              {{ $t(group.label) }}
              <ChevronRight class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  v-for="childItem in group.children"
                  :key="childItem.label"
                  :tooltip="$t(childItem.label)"
                >
                  <SidebarMenuButton as-child>
                    <NuxtLinkLocale
                      :to="childItem.url"
                      active-class="bg-sidebar-accent text-sidebar-accent-foreground"
                    >
                      <component
                        :is="childItem.icon"
                        v-if="childItem.icon"
                      />
                      {{ $t(childItem.label) }}

                      <Badge
                        v-if="childItem.new"
                        class="ml-auto"
                      >
                        {{ $t("labels.new") }}
                      </Badge>
                    </NuxtLinkLocale>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      <SidebarGroup v-else>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="childItem in group.children"
              :key="childItem.label"
              :tooltip="$t(childItem.label)"
            >
              <SidebarMenuButton as-child>
                <NuxtLinkLocale
                  :to="childItem.url"
                  active-class="bg-sidebar-accent text-sidebar-accent-foreground"
                >
                  <component
                    :is="childItem.icon"
                    v-if="childItem.icon"
                  />
                  {{ $t(childItem.label) }}
                  <Badge
                    v-if="childItem.new"
                    class="ml-auto"
                  >
                    {{ $t("labels.new") }}
                  </Badge>
                </NuxtLinkLocale>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </template>
  </SidebarContent>
</template>
