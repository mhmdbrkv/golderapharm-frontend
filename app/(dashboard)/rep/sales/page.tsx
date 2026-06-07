import SalesHeader from "@/features/sales/components/SalesHeader";
import SalesTable from "@/features/sales/components/SalesTable";
import { getRepSalesAction } from "@/features/sales/api";
import { extractSales } from "@/features/sales/lib/utils";

type PageProps = {
  searchParams: {
    date?: string;
    sheetName?: string;
  };
};

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: PageProps) {
  const { date, sheetName } = await searchParams;
  const result = await getRepSalesAction({ date, sheetName });

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch sales");
  }

  const sales = extractSales(result.data);

  return (
    <main className="bg-secondary-very-light min-h-[calc(100vh-80px)] p-5 *:min-[1440px]:w-270.75! lg:w-5xl">
      <SalesHeader
        sales={sales}
        selectedDate={date}
        selectedSheetName={sheetName}
      />
      <SalesTable sales={sales} />
    </main>
  );
}
