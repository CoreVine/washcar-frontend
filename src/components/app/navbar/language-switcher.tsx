import Image from "next/image"

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import { getCookie, setCookie } from "cookies-next"
import { checkLanguage } from "@/lib/utils"

import { Languages } from "@/lib/type-lists"
import { ChevronDown } from "lucide-react"
import { LANGUAGE_COOKIE } from "@/lib/constants"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export default function NavbarLanguageSwitcher() {
  const router = useRouter()
  const t = useTranslations()

  const locale = getCookie(LANGUAGE_COOKIE) as string
  const language = checkLanguage(locale)

  const usedLanguage =
    Languages.array.find((lang) => lang.locale === language) || Languages.array[0]

  const handleChangeLanguage = (lang: string) => {
    setCookie(LANGUAGE_COOKIE, lang)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex gap-2 items-center focus:ring-0 focus-visible:ring-0'>
        <Image
          src={usedLanguage.image}
          width={24}
          height={24}
          alt={usedLanguage.name}
          className='rounded-full'
        />
        {t(usedLanguage.name)}
        <ChevronDown size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Languages.array.map((lang) => (
          <DropdownMenuItem
            className='flex gap-2 items-center'
            onClick={() => handleChangeLanguage(lang.locale)}
          >
            <Image src={lang.image} width={24} height={24} alt={lang.name} />
            {t(lang.name)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
