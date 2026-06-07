import RequestsList from "@/features/requests/components/RequestsList";
import RequestStats from "@/features/requests/components/RequestStats";
import { getManagerTeamRequestsAction } from "@/features/requests/api";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await getManagerTeamRequestsAction();
  const requests = result.success ? (result.data ?? []) : [];

 
  // Calculate dynamic stats
  const total = requests.length;
  const pending = requests.filter((r) => r.status === "PENDING").length;
  const approved = requests.filter((r) => r.status === "APPROVED").length;
  const rejected = requests.filter((r) => r.status === "REJECTED").length;

  return (
    <main className="bg-secondary-very-light p-6 *:min-[1440px]:w-270.75! lg:w-5xl">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-4xl/10 font-normal">
            Requests Review & Approval
          </h1>
          <p className="text-secondary-dark text-base/6 font-normal">
            Review supervisor decisions and approve or reject requests
          </p>
        </div>
      </header>
      <section className="w-full space-y-6">
        <RequestStats
          total={total}
          pending={pending}
          approved={approved}
          rejected={rejected}
        />
        <RequestsList role="MANAGER" requestsData={requests} />
      </section>
    </main>
  );
}
