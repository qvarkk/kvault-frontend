<script setup lang="ts">
import { useI18n } from "vue-i18n"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "vue-sonner"
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { z } from "zod"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores"
import type { ApiError } from "@/types"

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const props = defineProps<{
  mode: "login" | "signUp"
}>()
const baseI18n = `auth.${props.mode}`

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email({
      message: t("validation.email"),
    }),
    password: z.string().min(8, {
      message: t("validation.password.min", { min: 8 }),
    }),
  }),
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: "",
    password: "",
  },
})

const onSubmit = handleSubmit(async (data) => {
  try {
    if (props.mode === "login") {
      await auth.login(data)
    } else {
      await auth.signup(data)
    }
    router.push({ name: "home" })
  } catch (error) {
    const apiError = error as ApiError
    toast.error(apiError.detail)
  }
})

function switchMode() {
  router.push({ name: props.mode === "login" ? "signUp" : "login" })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        {{ t(`${baseI18n}.title`) }}
      </CardTitle>
      <CardDescription>
        {{ t(`${baseI18n}.message`) }}
      </CardDescription>
      <CardAction>
        <Button variant="link" @click="switchMode">
          {{
            mode === "login" ? t(`auth.signUp.action`) : t(`auth.login.action`)
          }}
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <form
        id="login-form"
        @submit.prevent="onSubmit"
        class="flex flex-col gap-4"
      >
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>{{ t("auth.email") }}</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="mail@example.com"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>{{ t("auth.password") }}</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="********"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
    </CardContent>
    <CardFooter>
      <Button type="submit" form="login-form" class="w-full">
        {{ t(`${baseI18n}.action`) }}
      </Button>
    </CardFooter>
  </Card>
</template>
