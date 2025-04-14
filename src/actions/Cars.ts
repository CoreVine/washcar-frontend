"use server";

import { getRequest } from "@/lib/axios";
import { Cars } from "@/types/models";

export async function getCars() {
  try {
    const res = await getRequest<{ data: Cars[] }>("/cars");
    const data = res.data.data;
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching Cars:", error);
    throw new Error("Failed to fetch cars");
  }
}
export async function getCarById(id: number) {
  try {
    const res = await getRequest<{ data: Cars }>(`/cars/${id}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error("Failed to fetch cars");
  }
}
