import { Timestamps } from "./default"

export type User = Timestamps & {
  user_id: number
  name: string
  username: string
  email: string
  password: string
  phone_number: string
  address: string
  profile_picture_url: string | null
  acc_type: "user" | "company" | "admin"
}

export type Ad = Timestamps & {
  ad_id: number
  name: string
  image_url: string
}

export type SubCategory = {
  sub_category_id: number
  category_id: string
  icon: string
  name: string
}

export type Category = {
  category_id: number
  name: string
  icon: string
  subCategories: SubCategory[]
}

export type ProductImage = {
  image_url: string
}

export type ProductSubCategory = {
  name: string
  category: {
    category_name: string
  }
}

export type Product = Timestamps & {
  product_id: number
  company_id: number
  product_name: string
  description: string
  price: string
  stock: number
  images: ProductImage[]
  subCategories: ProductSubCategory[]
  company: {
    company_name: string
    logo_url: string
  }
}

export type WashCarType = {
  type_id: number
  company_id: number
  name: string
  price: number
  description: string
}

export type Company = Timestamps & {
  company_id: number
  company_name: string
  email: string
  phone_number: string
  location: string
  logo_url: string
  approved: boolean
  about: string
  total_rating: number
  wash_types: WashCarType[]
}
