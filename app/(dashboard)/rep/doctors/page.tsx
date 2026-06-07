import DoctorsHeader from "@/features/doctors/components/DoctorsHeader";
import DoctorsList from "@/features/doctors/components/DoctorsList";
import { getDoctorsAction } from "@/features/doctors/api";
import { DoctorApiResponse } from "@/features/doctors/lib/types/api";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await getDoctorsAction();

  if (!result.success) {
    throw new Error(result.error?.message || "Failed to fetch doctors");
  }

  const doctors: DoctorApiResponse[] = result.data ?? [];

  return (
    <main className="bg-secondary-very-light min-h-[calc(100vh-80px)] p-5 min-[1440px]:w-270.75! lg:w-5xl">
      <DoctorsHeader doctors={doctors} />
      <DoctorsList doctors={doctors} />
    </main>
  );
}
