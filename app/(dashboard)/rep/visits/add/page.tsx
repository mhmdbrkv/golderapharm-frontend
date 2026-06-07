import AddVisitForm from "@/features/visits/components/AddVisitForm";
import { fetchDoctors } from "@/features/doctors/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const doctorsResponse = await fetchDoctors();
  const doctors = doctorsResponse.data.doctors;

  return (
    <main className="flex min-h-[calc(100vh-195px)] flex-col gap-6 p-6 *:min-[1440px]:w-270.75! *:lg:w-5xl">
      <header className="flex items-center justify-start gap-2">
        <Link
          href="/rep/visits"
          className="border-system-primary text-system-primary hover:bg-system-primary inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white hover:border-transparent hover:text-white"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="ml-3">
          <h1 className="font-nomral text-[34px] text-black">
            Schedule New Visit
          </h1>
          <p className="text-secondary-dark text-[16px]">
            Schedule a new doctor visit
          </p>
        </div>
      </header>
      <AddVisitForm role="MEDICAL_REP" doctors={doctors} />
    </main>
  );
}
