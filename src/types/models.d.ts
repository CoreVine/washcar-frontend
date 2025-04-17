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

export type Employee = Timestamps & {
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

export type Cars = {
  car_id: number
  model: string
  images: { image_url: string }[]
  exhibition_id: string
  brand: {
    brand_id: number
    name: string
  }
  price_per_day: number
}

export type Brand = {
  brand_id: number
  name: string
  logo: string
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

export type CarSpecifications = {
  engine: string
  transmission: string
  color: string
  fuelType: string
  seats: number
}

export type CarImage = {
  image_id: number
  car_id: number
  image_url: string
}

export type Car = Timestamps & {
  car_id: number
  make?: string
  model: string
  year: number
  price?: number
  price_per_day?: string
  mileage?: number
  description?: string
  images: CarImage[]
  specifications?: CarSpecifications
  owner_id?: number
  carbrand_id: number
  company_id: number
  exhibition_id: number
  brand: Brand
  company?: {
    company_id: number
    company_name: string
    logo_url: string
  }
  exhibition?: {
    exhibition_id: number
    location: string
    company_id: number
  }
}

export type Order = {
  order_id: number
  user_id: number
  status: "cart" | "pending" | "completed" | "cancelled"
  created_at: string
  updated_at: string
  orderItems: {
    order_id: number
    order_item_id: number
    price: number
    product: Product
    product_id: number
    quantity: number
  }[]
  carWashOrder: {
    wash_order_id: number
    order_id: number
    within_company: boolean
    location: string
    customer_id: number
    company_id: number
    operation: string | null
    washTypes: {
      type_id: number
      company_id: number
      name: string
      price: number
      description: string
      WashOrderWashType: {
        paid_price: number
      }
    }[]
  } | null
  rentalOrder: {
    car: Car
    car_id: number
    order_id: number
    rental_order_id: number
    start_date: string
    end_date: string
  } | null
  carOrder: {
    car: Car
    car_id: number
    car_order_id: number
    orders_order_id: number
  } | null
}
