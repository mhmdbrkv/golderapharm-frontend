import SalesHeader from "@/features/sales/components/SalesHeader";
import SalesTable from "@/features/sales/components/SalesTable";
import { getManagerRepSalesAction, getSalesAction } from "@/features/sales/api";
import { extractSales } from "@/features/sales/lib/utils";
import { getSupervisorTeamAction } from "@/features/team/api";

type PageProps = {
  searchParams: {
    repId?: string;
    date?: string;
    sheetName?: string;
  };
};

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: PageProps) {
  const { repId, date, sheetName } = await searchParams;

  const [result, repsRes] = await Promise.all([
    repId
      ? getManagerRepSalesAction(repId, { date, sheetName })
      : getSalesAction({ date, sheetName }),
    getSupervisorTeamAction(),
  ]);

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch sales");
  }

  const sales = extractSales(result.data);

  let repOptions: { id: string; name: string }[] = [];
  if (repsRes.success && repsRes.members && repsRes.members.length > 0) {
    repOptions = repsRes.members.map((rep) => ({
      id: rep.id,
      name: rep.name,
    }));
  }
  
  return (
    <main className="bg-secondary-very-light min-h-[calc(100vh-80px)] p-5 *:min-[1440px]:w-270.75! lg:w-5xl">
      <SalesHeader
        sales={sales}
        repOptions={repOptions}
        selectedRepId={repId}
        selectedDate={date}
        selectedSheetName={sheetName}
      />
      <SalesTable sales={sales} />
    </main>
  );
}
