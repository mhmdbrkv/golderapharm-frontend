import { getSupervisorTeamAction } from "@/features/team/api";
import SupervisorTeamList from "@/features/team/components/profile/SupervisorTeamList";

export const dynamic = "force-dynamic";

export default async function Page() {
  const res = await getSupervisorTeamAction();

  return (
    <main className="bg-secondary-very-light min-h-[calc(100vh-80px)] p-5">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-[34px]/10 font-normal text-black">My Team</h1>
          <p className="text-secondary-dark text-base/6">
            View and monitor your medical representatives
          </p>
        </div>
      </header>

      {res.success ? (
        res.members && res.members.length > 0 ? (
          <SupervisorTeamList members={res.members} />
        ) : (
          <div className="text-secondary-dark mt-8 text-center">
            No team members assigned yet
          </div>
        )
      ) : (
        <div className="text-secondary-dark mt-8 text-center">
          Failed to load team members
        </div>
      )}
    </main>
  );
}
