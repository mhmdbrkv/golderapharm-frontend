"use server";

import { apiFetch } from "@/services/http";
import { ApiError } from "@/services/api-error";
import type {
  GetPharmaciesResponse,
  PharmacyApiResponse,
  CreatePharmacyDto,
} from "../lib/types";

/**
 * Fetch all pharmacies
 */
export async function fetchPharmacies(): Promise<GetPharmaciesResponse> {
  return apiFetch<GetPharmaciesResponse>("/api/pharmacies", {
    method: "GET",
  });
}

/**
 * Create a new pharmacy
 */
export async function createPharmacy(
  data: CreatePharmacyDto,
): Promise<PharmacyApiResponse> {
  return apiFetch<PharmacyApiResponse>("/api/pharmacies", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Server action to get all pharmacies
 */
export async function getPharmaciesAction() {
  try {
    const response = await fetchPharmacies();
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    const err = error as ApiError;
    console.error("Pharmacies fetch error:", err);
    return {
      success: false,
      error: {
        code: err.code || "FETCH_ERROR",
        message: err.message || "Failed to fetch pharmacies",
        statusCode: err.statusCode || 500,
      },
    };
  }
}

/**
 * Server action to create a pharmacy
 */
export async function createPharmacyAction(data: CreatePharmacyDto) {
  try {
    const response = await createPharmacy(data);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    const err = error as ApiError;
    console.error("Pharmacy create error:", err);
    return {
      success: false,
      error: {
        code: err.code || "CREATE_ERROR",
        message: err.message || "Failed to create pharmacy",
        statusCode: err.statusCode || 500,
      },
    };
  }
}
