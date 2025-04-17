"use server"

import { getRequest, postRequest } from "@/lib/axios"
import { ApiError, PaginatedData } from "@/types/default"
import { Car } from "@/types/models"
import { build } from "search-params"

export async function getCars(params: Record<string, string> = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Car>>(`/cars?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching cars:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch cars")
  }
}

export async function getRentalCars(params: Record<string, string> = { type: "rent" }) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Car>>(`/cars?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching cars:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch cars")
  }
}

export async function getBuyingCars(params: Record<string, string> = { type: "sale" }) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Car>>(`/cars?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching cars:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch cars")
  }
}

export async function getCarById(carId: number, params: Record<string, string> = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<Car>(`/cars/${carId}?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching car:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch car")
  }
}
