import { Poppins, Rubik } from "next/font/google"

export const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const RubikFont = Rubik({
  subsets: ["latin"]
})

export function loadFont(language: string | undefined) {
  return language === "ar" ? RubikFont.className : PoppinsFont.className
}

export function loadPageDirection(language: string | undefined) {
  return language === "ar" ? "rtl" : "ltr"
}
