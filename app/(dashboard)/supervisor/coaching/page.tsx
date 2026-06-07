import CoachingHeader from "@/features/coaching/components/CoachingHeader";
import ReviewForm from "@/features/coaching/components/review/ReviewForm";
import JointVisitReviewList from "@/features/coaching/components/review/JointVisitReviewList";
import { getSupervisorCoachingReportsAction } from "@/features/coaching/api/supervisor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await getSupervisorCoachingReportsAction();

  if (!result.success || !result.data) {
    return (
      <main className="flex flex-col gap-6 p-6 *:min-[1440px]:w-270.75! *:lg:w-5xl">
        <div className="text-dashboard-red flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm">
            {result.error?.message || "Failed to load coaching reports"}
          </p>
        </div>
      </main>
    );
  }

  const { reports, stats } = result.data;

  return (
    <main className="flex flex-col gap-6 p-6 *:min-[1440px]:w-270.75! *:lg:w-5xl">
      <CoachingHeader data={stats} />
      <ReviewForm />
      <JointVisitReviewList reviews={reports} />
    </main>
  );
}
