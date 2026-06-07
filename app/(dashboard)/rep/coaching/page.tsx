import CoachingHeader from "@/features/coaching/components/CoachingHeader";
import CoachingReportList from "@/features/coaching/components/CoachingReportList";
import { getRepCoachingReportsAction } from "@/features/coaching/api/rep";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await getRepCoachingReportsAction();

  // Handle error case
  if (!result.success || !result.stats || !result.reports) {
    return (
      <main className="flex flex-col gap-6 p-6 *:min-[1440px]:w-270.75! *:lg:w-5xl">
        <div className="text-center text-red-500">
          <p>Failed to load coaching reports</p>
          <p className="text-sm">{result.error?.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-6 *:min-[1440px]:w-270.75! *:lg:w-5xl">
      <CoachingHeader data={result.stats} />
      <CoachingReportList reports={result.reports} isRep />
    </main>
  );
}
