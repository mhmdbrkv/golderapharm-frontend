import PharmaciesHeader from "@/features/pharmacies/components/PharmaciesHeader";
import PharmaciesList from "@/features/pharmacies/components/PharmaciesList";
import { getPharmaciesAction } from "@/features/pharmacies/api";
import type { PharmacyApiResponse } from "@/features/pharmacies/lib/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await getPharmaciesAction();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch pharmacies");
  }

  const raw = result.data as unknown;
  let pharmacies: PharmacyApiResponse[] = [];
  if (raw && typeof raw === "object") {
    const r = raw as Record<string, unknown>;
    if (Array.isArray(r.data)) pharmacies = r.data as PharmacyApiResponse[];
    else if (Array.isArray(r.pharmacies))
      pharmacies = r.pharmacies as PharmacyApiResponse[];
    else if (Array.isArray(raw)) pharmacies = raw as PharmacyApiResponse[];
  }

  return (
    <main className="bg-secondary-very-light min-h-[calc(100vh-80px)] p-5 *:min-[1440px]:w-270.75! lg:w-5xl">
      <PharmaciesHeader pharmacies={pharmacies} />
      <PharmaciesList pharmacies={pharmacies} />
    </main>
  );
}
