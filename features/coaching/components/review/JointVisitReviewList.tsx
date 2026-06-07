import JointVisitReviewCard from "./JointVisitReviewCard";
import { JointVisitReview } from "../../lib/types";

export default function JointVisitReviewList({
  reviews,
}: {
  reviews: JointVisitReview[];
}) {
  return (
    <>
      <h2 className="text-[36px]/10 font-normal text-black">
        Recent Joint Visit Reviews
      </h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <JointVisitReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
}
