"use client";

import { useState, useMemo } from "react";

import SupervisorPlanCard from "./SupervisorPlanCard";
import SupervisorOwnPlanCard from "./SupervisorOwnPlanCard";
import { Plan, VisitPlan } from "@/features/plan/api/get"

type SupervisorPlansListProps = {
  repPlans: VisitPlan[]; // Plans submitted by reps for approval
  myPlans: Plan[]; // Supervisor's own plans
};

type TabType = "repPlans" | "myPlans";

export default function SupervisorPlansList({
  repPlans,
  myPlans,
}: SupervisorPlansListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("repPlans");

  // Count pending rep plans
  const pendingCount = useMemo(() => {
    return repPlans.filter((p) => p.status === "PENDING").length;
  }, [repPlans]);

  const tabs: Array<{ id: TabType; label: string; count?: number }> = [
    { id: "repPlans", label: "Rep Plans to Approve", count: pendingCount },
    { id: "myPlans", label: "My Plans" },
  ];

  const displayPlans = activeTab === "repPlans" ? repPlans : myPlans;

  const handleApprove = async (planId: string) => {
    // TODO: Implement approve logic
    console.log("Approving plan:", planId);
  };

  const handleReject = async (planId: string) => {
    // TODO: Implement reject logic
    console.log("Rejecting plan:", planId);
  };

  return (
    <div className="border-secondary-light mt-6 rounded-[14px] border-[0.8px] bg-white p-6">
      {/* Tabs */}
      <div className="flex w-fit items-center gap-2 rounded-[14px] bg-[#F1F5F9] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex cursor-pointer items-center gap-2 rounded-[14px] border-[0.8px] border-transparent px-2 py-1 text-sm/5 font-medium text-[#0F172A] transition-colors ${
              activeTab === tab.id ? "border-secondary-light bg-white" : ""
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="bg-dashboard-red flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs/4 font-medium text-white">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Plans List */}
      <div className="mt-10 space-y-4">
        {displayPlans.length === 0 ? (
          <div className="border-secondary-light flex flex-col items-center justify-center rounded-2xl border-[0.8px] bg-white p-12 text-center">
            <p className="text-secondary-dark text-base/6 font-normal">
              No plans found
            </p>
            <p className="text-secondary-dark mt-2 text-sm/5 font-normal">
              {activeTab === "repPlans"
                ? "No plans submitted by reps for approval"
                : "You don't have any plans yet"}
            </p>
          </div>
        ) : activeTab === "repPlans" ? (
          displayPlans.map((plan) => (
            <SupervisorPlanCard
              key={plan.id}
              plan={plan as VisitPlan}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        ) : (
          displayPlans.map((plan) => (
            <SupervisorOwnPlanCard key={plan.id} plan={plan as Plan} />
          ))
        )}
      </div>
    </div>
  );
}
