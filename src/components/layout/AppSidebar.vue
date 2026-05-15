<script setup lang="ts">
import {
  ChevronsUpDown,
  Files,
  Home,
  LogOut,
  NotebookPen,
  PanelLeft,
  Settings,
  X,
} from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { computed, ref } from "vue"
import SettingsModal from "../settings/SettingsModal.vue"

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const { state, isMobile, openMobile, toggleSidebar } = useSidebar()

const settingsOpen = ref(false)

const isExpanded = computed(() =>
  isMobile.value ? openMobile.value : state.value === "expanded",
)

function logout() {
  auth.logout()
  router.push({ name: "login" })
}

function openSettings() {
  toggleSidebar()
  settingsOpen.value = true
}
</script>

<template>
  <Sidebar :collapsible="isMobile ? 'offcanvas' : 'icon'">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem class="flex flex-row items-center justify-between">
          <span
            v-if="isExpanded"
            class="text-lg font-bold tracking-tight pl-2 cursor-default"
          >
            [kv]
          </span>
          <SidebarMenuButton class="self-end w-auto" @click="toggleSidebar">
            <X v-if="isMobile" />
            <PanelLeft v-else />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                @click="router.push({ name: 'home' })"
                :tooltip="t('nav.home')"
              >
                <Home />
                <span>{{ t("nav.home") }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                @click="router.push({ name: 'notes' })"
                :tooltip="t('nav.notes')"
              >
                <NotebookPen />
                <span>{{ t("nav.notes") }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                @click="router.push({ name: 'files' })"
                :tooltip="t('nav.files')"
              >
                <Files />
                <span>{{ t("nav.files") }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <!-- 
              The only solution I came up with to keep the avatar
              from shifting to the right in collapsed state.
              Not clean, but gets the job done.
            -->
            <DropdownMenuTrigger
              as-child
              :style="!isExpanded ? 'padding: 4px !important' : ''"
            >
              <SidebarMenuButton :tooltip="t('nav.account')" class="py-5">
                <Avatar class="w-6 h-6">
                  <AvatarFallback
                    class="bg-primary text-primary-foreground text-xs"
                  >
                    {{ auth.user?.email?.slice(0, 2).toUpperCase() }}
                  </AvatarFallback>
                </Avatar>
                <span v-if="isExpanded" class="truncate">{{
                  auth.user?.email
                }}</span>
                <ChevronsUpDown v-if="isExpanded" class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent :class="!isMobile ? 'ml-2' : ''" side="top">
              <DropdownMenuLabel class="flex flex-col">
                <span class="truncate">{{ auth.user?.email }}</span>
                <span class="text-xs text-muted-foreground truncate"
                  >ID: {{ auth.user?.id }}</span
                >
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="openSettings">
                <Settings class="pointer-events-none" />
                <span>{{ t("nav.settings") }}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logout" class="text-destructive">
                <LogOut />
                <span>{{ t("nav.logout") }}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <SettingsModal v-model:open="settingsOpen" />
</template>
