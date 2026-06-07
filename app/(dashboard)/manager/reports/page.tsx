import VisitReportsList from "@/features/reports/components/VisitReportsList";
import { getAllVisitReportsAction } from "@/features/reports/api";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await getAllVisitReportsAction();

  if (!result.success || !result.data) {
    return (
      <main className="flex flex-col gap-6 p-6 *:min-[1440px]:w-270.75! *:lg:w-5xl">
        <div className="text-dashboard-red flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm">
            {result.error?.message || "Failed to load visit reports"}
          </p>
        </div>
      </main>
    );
  }

  const { reports, totalCount } = result.data;

  return (
    <main className="flex flex-col gap-6 p-6 *:min-[1440px]:w-270.75! *:lg:w-5xl">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-[34px]/10 font-normal text-black">
            Visit Reports
          </h1>
          <p className="text-secondary-dark text-base/6">
            View all visit reports submitted by medical representatives
          </p>
        </div>
        <div className="bg-system-primary rounded-lg px-4 py-2">
          <p className="text-xs text-white opacity-80">Total Reports</p>
          <p className="text-2xl font-semibold text-white">{totalCount}</p>
        </div>
      </header>
      <VisitReportsList reports={reports} />
    </main>
  );
}
