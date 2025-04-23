"use server"

import { getRequest } from "@/lib/axios"
import { ApiError, PaginatedData, TSearchParams } from "@/types/default"
import { Company } from "@/types/models"

import { build } from "search-params"

export async function getCompanies(params: TSearchParams = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Company>>(`/companies?approved=true&${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching companies:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch companies")
  }
}

export async function getPendingCompanies(params: TSearchParams = {}) {
  try {
    const sp = build(params)
    console.log(sp)
    const res = await getRequest<PaginatedData<Company>>(`/companies?${sp}&approved=false`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching companies:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch companies")
  }
}

export async function getCompanyWashTypes(companyId: number, params: TSearchParams = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<Company>(`/companies/${companyId}/with-wash-types?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching company wash types:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch company wash types")
  }
}
