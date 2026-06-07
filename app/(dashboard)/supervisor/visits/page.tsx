import VisitsHeader from "@/features/visits/components/VisitsHeader";
import VisitsPlanner from "@/features/visits/components/VisitsPlanner";
import { getVisitsAction } from "@/features/visits/api";
import { calculateVisitStats } from "@/features/visits/lib/utils/stats";

export const dynamic = "force-dynamic";

export default async function Page() {
  const visitsResponse = await getVisitsAction();
  const visits = visitsResponse.success ? visitsResponse.visits : [];
  const stats = calculateVisitStats(visits);

  return (
    <main className="bg-secondary-very-light min-h-[calc(100vh-80px)] p-5 *:min-[1440px]:w-270.75! *:lg:w-5xl">
      <VisitsHeader role="SUPERVISOR" stats={stats} />
      <div className="mt-6">
        <VisitsPlanner visits={visits || []} />
      </div>
    </main>
  );
}
