"use server";

import { apiFetch } from "@/services/http";
import type { ApiError } from "@/services/api-error";
import { PlanStatus, VisitPlanType } from "@/lib/types";
import { format } from "date-fns";

// API Response Types
export type PlanApiResponse = {
  id: string;
  title: string;
  type: VisitPlanType;
  status: PlanStatus;
  description: string;
  startDate: string;
  endDate: string;
  targetDoctors: number;
  targetVisits: number;
  objectives: string[];
  supervisorFeedback: string | null;
  createdById: string;
  repId: string;
  createdAt: string;
  updatedAt: string;
  doctorsWithDates: Array<{
    doctorId: string;
    visitDate: string;
  }>;
  doctors: Array<{
    id: string;
    nameEN: string;
    nameAR?: string;
    accountName?: string;
    subRegion?: string;
    area?: string | null;
    visitDate?: string;
  }>;
  createdBy: {
    id: string;
    name: string;
  };
};

type GetPlansApiResponse = {
  status: string;
  message: string;
  results: number;
  data: PlanApiResponse[];
};

// Types specific to GET operations
export type RepInfo = {
  id: string;
  name: string;
  avatar?: string;
};

export type Doctor = {
  id: string;
  nameEN: string;
  nameAR?: string;
  accountName?: string;
  subRegion?: string;
  area?: string | null;
  visitDate?: string;
  specialty?: string;
};

export type SupervisorFeedback = {
  message: string;
  createdAt: string;
};

export type VisitPlan = {
  id: string;
  title: string;
  description: string;
  planType: VisitPlanType;
  status: PlanStatus;
  startDate: string;
  endDate: string;
  objectives: string[];
  selectedDoctors: Doctor[];
  submittedDate: string;
  supervisorFeedback?: SupervisorFeedback;
  // For supervisor view
  rep?: RepInfo;
  createdBy?: RepInfo;
  targetDoctors?: number;
  targetVisits?: number;
  progress?: number; // percentage 0-100
};

export type Plan = {
  id: string;
  planType: VisitPlanType;
  title: string;
  description: string;
  objectives: string[];
  startDate: string;
  endDate: string;
  targetDoctors: number;
  targetVisits: number;
  status: PlanStatus;
  createdAt: string;
  updatedAt: string;
  progress?: number; // percentage 0-100
};

/**
 * Map API response to VisitPlan format
 */
function mapApiResponseToVisitPlan(apiPlan: PlanApiResponse): VisitPlan {
  return {
    id: apiPlan.id,
    title: apiPlan.title,
    description: apiPlan.description,
    planType: apiPlan.type,
    status: apiPlan.status,
    startDate: format(new Date(apiPlan.startDate), "MMM dd, yyyy"),
    endDate: format(new Date(apiPlan.endDate), "MMM dd, yyyy"),
    objectives: apiPlan.objectives,
    selectedDoctors: apiPlan.doctors.map((doc) => ({
      id: doc.id,
      nameEN: doc.nameEN,
      nameAR: doc.nameAR,
      accountName: doc.accountName,
      subRegion: doc.subRegion,
      area: doc.area,
      visitDate: doc.visitDate,
    })),
    rep: {
      id: apiPlan.createdBy.id,
      name: apiPlan.createdBy.name,
    },
    createdBy: {
      id: apiPlan.createdBy.id,
      name: apiPlan.createdBy.name,
    },
    submittedDate: format(new Date(apiPlan.createdAt), "MMM dd, yyyy"),
    supervisorFeedback: apiPlan.supervisorFeedback
      ? {
          message: apiPlan.supervisorFeedback,
          createdAt: format(new Date(apiPlan.updatedAt), "MMM dd, yyyy"),
        }
      : undefined,
    targetDoctors: apiPlan.targetDoctors,
    targetVisits: apiPlan.targetVisits,
  };
}

/**
 * Get all plans for rep
 */
export async function getRepPlansAction(): Promise<{
  success: boolean;
  data?: VisitPlan[];
  error?: ApiError;
}> {
  try {
    const response = await apiFetch<GetPlansApiResponse>("/api/plans", {
      method: "GET",
    });

    // console.log("response", response);

    // Map API response to VisitPlan format
    const plans = response.data.map(mapApiResponseToVisitPlan);

    return {
      success: true,
      data: plans,
    };
  } catch (error) {
    console.error("Error fetching plans:", error);
    return {
      success: false,
      error: error as ApiError,
    };
  }
}

/**
 * Get all plans for manager
 */
export async function getManagerPlansAction(): Promise<{
  success: boolean;
  data?: VisitPlan[];
  error?: ApiError;
}> {
  try {
    const response = await apiFetch<GetPlansApiResponse>("/api/plans/all", {
      method: "GET",
    });

    const plans = response.data.map(mapApiResponseToVisitPlan);

    return {
      success: true,
      data: plans,
    };
  } catch (error) {
    console.error("Error fetching manager plans:", error);
    return {
      success: false,
      error: error as ApiError,
    };
  }
}

/**
 * Get a specific plan by ID
 */
export async function getPlanByIdAction(planId: string): Promise<{
  success: boolean;
  data?: VisitPlan;
  error?: ApiError;
}> {
  try {
    const plan = await apiFetch<PlanApiResponse>(`/api/plans/${planId}`, {
      method: "GET",
    });

    return {
      success: true,
      data: mapApiResponseToVisitPlan(plan),
    };
  } catch (error) {
    console.error("Error fetching plan:", error);
    return {
      success: false,
      error: error as ApiError,
    };
  }
}
