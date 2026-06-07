"use server";

import { apiFetch } from "@/services/http";
import { ApiError } from "@/services/api-error";
import { format } from "date-fns";
import { VisitReportsResponse, VisitReport } from "../lib/types";

type VisitReportsScope = "own" | "all";

function normalizeVisitReportsResponse(response: VisitReportsResponse) {
  if (
    "data" in response &&
    "data" in response.data &&
    "results" in response.data
  ) {
    return {
      reports: response.data.data,
      totalCount: response.data.results,
    };
  }

  if ("data" in response && Array.isArray(response.data)) {
    return {
      reports: response.data,
      totalCount: response.data.length,
    };
  }

  return {
    reports: [],
    totalCount: 0,
  };
}

/**
 * Fetch all visit reports
 */
export async function getVisitReports(
  scope: VisitReportsScope = "own",
): Promise<VisitReportsResponse> {
  const endpoint =
    scope === "all"
      ? "/api/visits/all-visit-reports"
      : "/api/visits/visit-reports";

  return apiFetch<VisitReportsResponse>(endpoint, {
    method: "GET",
  });
}

/**
 * Server action to get all visit reports
 * Used in manager, supervisor, and rep reports pages
 */
export async function getVisitReportsAction() {
  try {
    const response = await getVisitReports();
    const normalized = normalizeVisitReportsResponse(response);

    // Transform API response to client-friendly format
    const reports: VisitReport[] = normalized.reports.map((report) => ({
      id: report.id,
      visitId: report.visitId,
      doctorNameAR: report.visit.doctor.nameAR,
      doctorNameEN: report.visit.doctor.nameEN,
      visitDate: format(new Date(report.visit.date), "MMM dd, yyyy"),
      duration: report.duration,
      rating: report.rating,
      discussedTopics: report.discussedTopics,
      doctorFeedback: report.doctorFeedback,
      visitPurpose: report.visitPurpose,
      notes: report.notes,
      samplesProvided: report.samplesProvided,
      createdAt: format(new Date(report.createdAt), "MMM dd, yyyy 'at' h:mm a"),
    }));

    return {
      success: true,
      data: {
        reports,
        totalCount: normalized.totalCount,
      },
    };
  } catch (error) {
    console.error("Get visit reports error:", error);
    const err = error as ApiError;

    return {
      success: false,
      error: {
        code: err.code || "FETCH_REPORTS_ERROR",
        message: err.message || "Failed to fetch visit reports",
        statusCode: err.statusCode || 500,
      },
    };
  }
}

export async function getAllVisitReportsAction() {
  try {
    const response = await getVisitReports("all");
    const normalized = normalizeVisitReportsResponse(response);

    const reports: VisitReport[] = normalized.reports.map((report) => ({
      id: report.id,
      visitId: report.visitId,
      doctorNameAR: report.visit.doctor.nameAR,
      doctorNameEN: report.visit.doctor.nameEN,
      visitDate: format(new Date(report.visit.date), "MMM dd, yyyy"),
      duration: report.duration,
      rating: report.rating,
      discussedTopics: report.discussedTopics,
      doctorFeedback: report.doctorFeedback,
      visitPurpose: report.visitPurpose,
      notes: report.notes,
      samplesProvided: report.samplesProvided,
      createdAt: format(new Date(report.createdAt), "MMM dd, yyyy 'at' h:mm a"),
    }));

    return {
      success: true,
      data: {
        reports,
        totalCount: normalized.totalCount,
      },
    };
  } catch (error) {
    console.error("Get all visit reports error:", error);
    const err = error as ApiError;

    return {
      success: false,
      error: {
        code: err.code || "FETCH_REPORTS_ERROR",
        message: err.message || "Failed to fetch visit reports",
        statusCode: err.statusCode || 500,
      },
    };
  }
}
