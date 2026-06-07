import { getCurrentUser } from "@/features/auth/api";
import MainCards from "@/features/dashboard/components/mainCards";
import PendingRequests from "@/features/dashboard/components/pendingRequests";
import { ProductsPerformance } from "@/features/dashboard/components/productsPerformance";
import QuickActions from "@/features/dashboard/components/quickActions";
import RecentActivity from "@/features/dashboard/components/recentActivity";
import RecentRepRequests from "@/features/dashboard/components/recentRepRequests";
import { SalesByRegion } from "@/features/dashboard/components/salesByRegion";
import SupervisorsPerformanceRegional from "@/features/dashboard/components/supervisorsPerformanceRegional";
import { SupervisorsPerformance } from "@/features/dashboard/components/supervisorsPreformance";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }
  return (
    <main className="bg-secondary-very-light px-2 py-5 min-[1440px]:w-270.75! min-[1440px]:p-6 lg:w-5xl">
      <header className="gradient-blue flex-col items-start justify-center rounded-[14px] p-6 min-[1440px]:w-270.75!">
        <h1 className="text-2xl/8 font-medium text-white">
          Welcome back, Dr/ {user.data.name}
        </h1>
        <p className="text-base/6 font-normal text-[#DCFCE7]">
          Central Region Supervisor
        </p>
      </header>
      <section className="mt-6 flex gap-6 min-[1440px]:w-270.75! lg:w-5xl">
        <div className="flex flex-col gap-6 min-[1440px]:w-[714px]!">
          <MainCards roleBasePath="/supervisor" />
          <SupervisorsPerformance />
          <SalesByRegion />
        </div>
        <aside className="flex flex-col gap-6">
          <QuickActions />
          <ProductsPerformance />
          <RecentRepRequests />
        </aside>
      </section>
      <section className="my-6 flex flex-row gap-6 *:flex-1 min-[1440px]:w-270.75!">
        <RecentActivity />
        <PendingRequests />
      </section>
      <SupervisorsPerformanceRegional />
    </main>
  );
}
