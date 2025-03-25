import { Inter, Rubik } from "next/font/google"

export const InterFont = Inter({
  subsets: ["latin"]
})

export const RubikFont = Rubik({
  subsets: ["latin"]
})

export function loadFont(language: string | undefined) {
  return language === "ar" ? RubikFont.className : InterFont.className
}

export function loadPageDirection(language: string | undefined) {
  return language === "ar" ? "rtl" : "ltr"
}
