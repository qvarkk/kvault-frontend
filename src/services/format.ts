import { formatDistanceToNow } from "date-fns"
import { enUS, ru, ja } from "date-fns/locale"
import i18n from "@/i18n"

const locales = { en: enUS, ru, ja }

export function timeAgo(date: string): string {
  const locale =
    locales[i18n.global.locale.value as keyof typeof locales] ?? enUS

  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale,
  })
}
