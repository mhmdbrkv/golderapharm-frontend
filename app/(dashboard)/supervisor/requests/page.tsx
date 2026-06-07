import RequestsList from "@/features/requests/components/RequestsList";
import RequestStats from "@/features/requests/components/RequestStats";
import {
  getMyRequestsAction,
  getSupervisorTeamRequestsAction,
} from "@/features/requests/api";
import { Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
  const myRequests = await getMyRequestsAction();
  const repRequests = await getSupervisorTeamRequestsAction();

  const requests = myRequests.success ? (myRequests.data ?? []) : [];
  const teamRequests = repRequests.success ? (repRequests.data ?? []) : [];
  const allRequests = [...requests, ...teamRequests];

  // Calculate dynamic stats
  const total = allRequests.length;
  const pending = allRequests.filter((r) => r.status === "PENDING").length;
  const approved = allRequests.filter((r) => r.status === "APPROVED").length;
  const rejected = allRequests.filter((r) => r.status === "REJECTED").length;

  return (
    <main className="bg-secondary-very-light p-6 *:min-[1440px]:w-270.75! lg:w-5xl">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl/10 font-normal">
            Requests Review & Approval
          </h1>
          <p className="text-secondary-dark text-base/6 font-normal">
            Review supervisor decisions and approve or reject requests
          </p>
        </div>
        <Link
          href={"/supervisor/requests/submit"}
          className="border-dashboard-blue hover:text-dashboard-blue bg-dashboard-blue cursor-pointer rounded-md border px-4 py-2 text-sm/5 font-medium text-white transition-colors hover:bg-white"
        >
          <Plus size={16} className="mr-1 inline" />
          Submit a new request
        </Link>
      </header>
      <section className="w-full space-y-6">
        <RequestStats
          total={total}
          pending={pending}
          approved={approved}
          rejected={rejected}
        />
        <RequestsList role="SUPERVISOR" requestsData={allRequests} />
      </section>
    </main>
  );
}
