import ForecastStats from "@/features/forecast/components/ForecastStats";
import ForecastManagement from "@/features/forecast/components/ForecastManagement";
import { getMyForecastsAction } from "@/features/forecast/api";
import { calculateForecastStats } from "@/features/forecast/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function Page() {
  const result = await getMyForecastsAction();
  const forecasts = result.success ? (result.data ?? []) : [];

  // Calculate stats using utility
  const stats = calculateForecastStats(forecasts);

  return (
    <main className="flex flex-col gap-6 p-6 *:min-[1440px]:w-270.75! lg:w-5xl">
      <header className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <h1 className="font-nomral text-[34px]/10 text-black">
            Product Forecast
          </h1>
          <p className="text-secondary-dark text-base/6">
            Plan your product distribution across doctors
          </p>
        </div>
        <Link href="/rep/forecast/new">
          <Button className="button-system-gradient-primary">
            <Plus className="h-4 w-4 " />
            Create Forecast
          </Button>
        </Link>
      </header>
      <ForecastStats
        totalProducts={stats.totalProducts}
        totalAllocation={stats.totalAllocation}
        myDoctors={stats.myDoctors}
        pendingApproval={stats.pendingApproval}
      />
      <ForecastManagement forecasts={forecasts} />
    </main>
  );
}
