"use server"

import { WashCarTypeCartItem } from "@/store/features/cart/wash-car"
import { ApiError } from "@/types/default"
import { Order } from "@/types/models"

import { deleteRequest, getRequest, postRequest, putRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { getToken } from "./auth"
import { API_URL } from "@/lib/constants"
import axios from "axios"
import { revalidatePath } from "next/cache"
import routes from "@/lib/route"

export async function getCart() {
  try {
    const token = await getToken()
    const res = await getRequest<Order>("/cart", loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    return null
  }
}

export async function addCarWashItemsToCart(companyId: number, location: string, items: WashCarTypeCartItem[]) {
  try {
    const token = await getToken()
    const res = await postRequest(
      "/cart/items",
      {
        item_type: "wash_service",
        company_id: companyId,
        wash_types: items.map((item) => item.typeId),
        within_company: true,
        location: location
      },
      loadDefaultHeaders(token)
    )
    console.log(res.data)
  } catch (error) {
    const e = error as ApiError<{ data: { message: string } }>
    console.log(e)
    throw new Error(e?.data?.data?.message || "Failed to add items to cart")
  }
}

export async function emptyCarWashItemsFromCart(washOrderId: number) {
  try {
    const token = await getToken()
    const res = await axios.delete(`${API_URL}/cart/items`, {
      data: {
        item_type: "wash_service",
        wash_order_id: washOrderId
      },
      headers: loadDefaultHeaders(token)
    })
    const d = res.data
    console.log("DATA")
    console.log(d)
    return d
  } catch (error) {
    const eerr = error as ApiError<{ data: { message: string } }>
    console.log({ eerr })
    throw new Error(eerr?.data?.data?.message || "Failed to delete items from cart")
  }
}

export async function addBuyCarToCart(carId: number, companyId: number) {
  try {
    const token = await getToken()
    const res = await postRequest(
      "/cart/items",
      {
        item_type: "car",
        car_id: carId,
        is_rental: false
      },
      loadDefaultHeaders(token)
    )
    revalidatePath(routes.buyCar(companyId))
    return res.data
  } catch (error) {
    const e = error as ApiError<{ data: { message: string } }>
    console.log(e)
    throw new Error(e?.data?.data?.message || "Failed to add car to buy cart")
  }
}

export async function removeBuyCarFromCart(itemId: number, companyId: number) {
  try {
    const token = await getToken()
    const res = await axios.delete(`${API_URL}/cart/items`, {
      data: {
        item_type: "sale_car",
        item_id: itemId
      },
      headers: loadDefaultHeaders(token)
    })
    console.log(res.data)
    revalidatePath(routes.buyCar(companyId))
    return res.data
  } catch (error) {
    const e = error as ApiError<{ data: { message: string } }>
    console.log(e)
    throw new Error(e?.data?.data?.message || "Failed to remove car from buy cart")
  }
}

export async function addRentCarToCart(carId: number, companyId: number, stateDate: string, endDate: string) {
  try {
    const token = await getToken()
    const res = await postRequest(
      "/cart/items",
      {
        item_type: "car",
        car_id: carId,
        is_rental: true,
        start_date: stateDate,
        end_date: endDate
      },
      loadDefaultHeaders(token)
    )
    revalidatePath(routes.buyCar(companyId))
    return res.data
  } catch (error) {
    const e = error as ApiError<{ data: { message: string } }>
    console.log(e)
    throw new Error(e?.data?.data?.message || "Failed to add car to buy cart")
  }
}

export async function removeRentCarFromCart(itemId: number, companyId: number) {
  try {
    const token = await getToken()
    const res = await axios.delete(`${API_URL}/cart/items`, {
      data: {
        item_type: "rental_car",
        item_id: itemId
      },
      headers: loadDefaultHeaders(token)
    })
    console.log(res.data)
    revalidatePath(routes.buyCar(companyId))
    return res.data
  } catch (error) {
    const e = error as ApiError<{ data: { message: string } }>
    console.log(e)
    throw new Error(e?.data?.data?.message || "Failed to remove car from buy cart")
  }
}

export async function addProductToCart(productId: number, qty: number) {
  try {
    const token = await getToken()
    const res = await postRequest(
      "/cart/items",
      {
        item_type: "product",
        product_id: productId,
        quantity: qty
      },
      loadDefaultHeaders(token)
    )
    return res.data
  } catch (error) {
    return undefined
  }
}

export async function updateProductInCart(orderItemId: number, qty: number) {
  try {
    const token = await getToken()
    const res = await putRequest(
      "/cart/items",
      {
        order_item_id: orderItemId,
        quantity: qty
      },
      loadDefaultHeaders(token)
    )
    return res.data
  } catch (error) {
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to add product to cart")
  }
}

export async function removeProductFromCart(productId: number) {
  try {
    const res = await axios.delete(`${API_URL}/cart/items`, {
      data: {
        item_type: "product",
        item_id: productId
      },
      headers: loadDefaultHeaders(await getToken())
    })
    return res.data
  } catch (error) {
    const err = error as ApiError<{ data: { message: string } }>
    console.log({ err })
    throw new Error(err?.data?.data?.message || "Failed to remove product from cart")
  }
}

export async function emptyCartAction() {
  try {
    const token = await getToken()
    const res = await deleteRequest("/cart", loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const e = error as ApiError<{ data: { message: string } }>
    console.log(e)
    throw new Error(e?.data?.data?.message || "Failed to empty items from cart")
  }
}
