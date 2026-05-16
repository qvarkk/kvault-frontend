<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useAuthStore } from "@/stores/auth"
import { authService } from "@/services/auth"
import { toast } from "vue-sonner"
import type { ApiError } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-vue-next"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import DialogDescription from "@/components/ui/dialog/DialogDescription.vue"

const { t } = useI18n()
const auth = useAuthStore()

const refreshLoading = ref(false)

async function handleRefreshApiKey() {
  refreshLoading.value = true
  try {
    const response = await authService.refreshApiKey()
    auth.user = response.data
    localStorage.setItem("token", response.data.apiKey)
    toast.success(t("settings.account.apiKey.refreshed"))
  } catch (e) {
    if (e && typeof e === "object" && "detail" in e)
      toast.error((e as ApiError).detail)
    else
      toast.error(t("errors.internal.title"), {
        description: t("errors.internal.detail"),
      })
  } finally {
    refreshLoading.value = false
  }
}

const changePasswordOpen = ref(false)
const oldPassword = ref("")
const newPassword = ref("")
const changePasswordLoading = ref(false)

async function handleChangePassword() {
  changePasswordLoading.value = true
  try {
    await authService.updatePassword(oldPassword.value, newPassword.value)
    toast.success(t("settings.account.passwordChanged"))
    changePasswordOpen.value = false
    oldPassword.value = ""
    newPassword.value = ""
  } catch (e) {
    if (e && typeof e === "object" && "detail" in e)
      toast.error((e as ApiError).detail)
    else
      toast.error(t("errors.internal.title"), {
        description: t("errors.internal.detail"),
      })
  } finally {
    changePasswordLoading.value = false
  }
}

const deleteOpen = ref(false)
const deleteUnlocked = ref(false)
const deletePassword = ref("")
const deleteLoading = ref(false)

async function handleDeleteAccount() {
  deleteLoading.value = true
  try {
    await authService.deleteAccount(deletePassword.value)
    auth.logout()
  } catch (e) {
    if (e && typeof e === "object" && "detail" in e)
      toast.error((e as ApiError).detail)
    else
      toast.error(t("errors.internal.title"), {
        description: t("errors.internal.detail"),
      })
  } finally {
    deleteLoading.value = false
  }
}

function openDeleteModal() {
  deleteUnlocked.value = false
  deletePassword.value = ""
  deleteOpen.value = true
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <DialogDescription class="text-center hidden">
      {{ t("settings.account.description") }}
    </DialogDescription>

    <div class="flex items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium">{{ t("settings.account.email") }}</p>
        <p class="text-xs text-muted-foreground">{{ auth.user?.email }}</p>
      </div>

      <!-- separator didn't work :( -->
      <div class="h-10 w-px bg-border"></div>

      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium">
          {{ t("settings.account.apiKey.name") }}
        </p>
        <p class="text-xs text-muted-foreground">{{ auth.user?.apiKey }}</p>
      </div>
    </div>

    <Separator />

    <div class="flex items-start justify-between gap-4">
      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium">
          {{ t("settings.account.apiKey.title") }}
        </p>
        <p class="text-xs text-muted-foreground">
          {{ t("settings.account.apiKey.description") }}
        </p>
      </div>
      <Button
        variant="outline"
        class="shrink-0 min-w-32"
        :disabled="refreshLoading"
        @click="handleRefreshApiKey"
      >
        <Loader2
          v-if="refreshLoading"
          class="w-4 h-4 mr-2 animate-spin pointer-events-none"
        />
        {{ t("settings.account.apiKey.refresh") }}
      </Button>
    </div>

    <Separator />

    <div class="flex items-start justify-between gap-4">
      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium">
          {{ t("settings.account.password.title") }}
        </p>
        <p class="text-xs text-muted-foreground">
          {{ t("settings.account.password.description") }}
        </p>
      </div>
      <Button
        variant="outline"
        class="shrink-0 min-w-32"
        @click="changePasswordOpen = true"
      >
        {{ t("settings.account.password.action") }}
      </Button>
    </div>

    <Separator />

    <div class="flex items-start justify-between gap-4">
      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium text-destructive">
          {{ t("settings.account.delete.title") }}
        </p>
        <p class="text-xs text-muted-foreground">
          {{ t("settings.account.delete.description") }}
        </p>
      </div>
      <Button
        variant="destructive"
        class="shrink-0 min-w-32"
        @click="openDeleteModal"
      >
        {{ t("settings.account.delete.action") }}
      </Button>
    </div>
  </div>

  <Dialog v-model:open="changePasswordOpen">
    <DialogContent aria-describedby="">
      <DialogHeader>
        <DialogTitle>{{ t("settings.account.password.title") }}</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-3">
        <Input
          v-model="oldPassword"
          type="password"
          :placeholder="t('settings.account.password.old')"
        />
        <Input
          v-model="newPassword"
          type="password"
          :placeholder="t('settings.account.password.new')"
        />
      </div>
      <DialogFooter>
        <Button variant="outline" @click="changePasswordOpen = false">
          {{ t("common.cancel") }}
        </Button>
        <Button
          :disabled="
            changePasswordLoading || !oldPassword.trim() || !newPassword.trim()
          "
          @click="handleChangePassword"
        >
          <Loader2
            v-if="changePasswordLoading"
            class="w-4 h-4 mr-2 animate-spin pointer-events-none"
          />
          {{ t("common.save") }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Dialog v-model:open="deleteOpen">
    <DialogContent aria-describedby="">
      <DialogHeader>
        <DialogTitle class="text-destructive">{{
          t("settings.account.delete.title")
        }}</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4">
        <p class="text-sm text-muted-foreground">
          {{ t("settings.account.delete.description") }}
        </p>

        <Button
          v-if="!deleteUnlocked"
          variant="destructive"
          @click="deleteUnlocked = true"
        >
          {{ t("settings.account.delete.iUnderstand") }}
        </Button>

        <div v-else class="flex flex-col gap-3">
          <Input
            v-model="deletePassword"
            type="password"
            :placeholder="t('settings.account.delete.password')"
          />
          <Button
            variant="destructive"
            :disabled="deleteLoading || !deletePassword.trim()"
            @click="handleDeleteAccount"
          >
            <Loader2
              v-if="deleteLoading"
              class="w-4 h-4 mr-2 animate-spin pointer-events-none"
            />
            {{ t("settings.account.delete.forever") }}
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
