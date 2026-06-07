import ForecastRequestsList from "@/features/forecast/components/ForecastRequestsList";
import { getAllForecastsAction } from "@/features/forecast/api/management";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await getAllForecastsAction();

  if (!result.success || !result.data) {
    return (
      <main className="flex flex-col gap-6 p-6 *:min-[1440px]:w-270.75! *:lg:w-5xl">
        <div className="text-dashboard-red flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm">
            {result.error?.message || "Failed to load forecast requests"}
          </p>
        </div>
      </main>
    );
  }

  const { data, results } = result.data;

  return (
    <main className="flex flex-col gap-6 p-6 *:min-[1440px]:w-270.75! *:lg:w-5xl">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-[34px]/10 font-normal text-black">
            Forecast Requests
          </h1>
          <p className="text-secondary-dark text-base/6">
            Review and manage forecast submissions from your team
          </p>
        </div>
        <div className="bg-system-primary rounded-lg px-4 py-2">
          <p className="text-xs text-white opacity-80">Total Requests</p>
          <p className="text-2xl font-semibold text-white">{results}</p>
        </div>
      </header>
      <ForecastRequestsList forecasts={data} />
    </main>
  );
}
