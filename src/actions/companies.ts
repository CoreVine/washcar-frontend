"use server"

import { getRequest } from "@/lib/axios"
import { ApiError, PaginatedData } from "@/types/default"
import { Company } from "@/types/models"

import { build } from "search-params"

export async function getCompanies(params: Record<string, string> = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Company>>(`/companies?approved=true&${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching companies:", error)
    throw new Error("Failed to fetch companies")
  }
}

export async function getCompanyWashTypes(companyId: number, params: Record<string, string> = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<Company>(`/companies/${companyId}/with-wash-types?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    const err = error as ApiError<any>
    return undefined
  }
}
