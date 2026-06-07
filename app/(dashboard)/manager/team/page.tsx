import { getManagerTeamAction } from "@/features/team/api";
import { getRegionsAction } from "@/lib/requests/regions";
import TeamPageClient from "@/features/team/components/TeamPageClient";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: { openDialog?: string };
};

export default async function Page({ searchParams }: PageProps) {
  const { openDialog } = await searchParams;
  const res = await getManagerTeamAction();
  const regionsRes = await getRegionsAction();

  return (
    <TeamPageClient
      supervisors={res.supervisors || []}
      medicalReps={res.medicalReps || []}
      regions={regionsRes.regions || []}
      stats={
        res.stats || { totalMembers: 0, supervisorsCount: 0, repsCount: 0 }
      }
      success={res.success}
      openDialog={openDialog === "true"}
    />
  );
}
