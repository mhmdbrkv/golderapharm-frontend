import PlanStats from "@/features/plan/components/PlanStats";
import CreatePlanDialogSupervisor from "@/features/plan/components/supervisor/CreatePlanDialogSupervisor";
import SupervisorPlansList from "@/features/plan/components/supervisor/SupervisorPlansList";
import {
  mockSupervisorPlans,
  mockSupervisorOwnPlans,
} from "@/features/plan/lib/data";
import { calculateSupervisorPlanStats } from "@/features/plan/lib/utils";
import { fetchProfile } from "@/features/profile/api";
import { getRegionsAction } from "@/lib/requests/regions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const stats = calculateSupervisorPlanStats(mockSupervisorPlans);

  // Fetch user profile and resolve subRegion name for doctor filtering
  const profile = await fetchProfile().catch(() => null);
  let userSubRegionName: string | null = null;
  if (profile && profile.role !== "MANAGER" && profile.subRegionId) {
    const regionsResult = await getRegionsAction();
    if (regionsResult.success && regionsResult.regions) {
      for (const region of regionsResult.regions) {
        const found = region.subRegions.find(
          (sr) => sr.id === profile.subRegionId,
        );
        if (found) {
          userSubRegionName = found.name;
          break;
        }
      }
    }
  }

  return (
    <main className="bg-secondary-very-light p-6 *:min-[1440px]:w-270.75! lg:w-5xl">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl/10 font-normal">Plans Management</h1>
          <p className="text-secondary-dark mt-2 text-base/6 font-normal">
            Create your plans and approve medical rep plans
          </p>
        </div>
        <CreatePlanDialogSupervisor
          userRole={profile?.role ?? "SUPERVISOR"}
          userSubRegionName={userSubRegionName}
        />
      </header>
      <PlanStats data={stats} />
      <SupervisorPlansList
        repPlans={mockSupervisorPlans}
        myPlans={mockSupervisorOwnPlans}
      />
    </main>
  );
}
