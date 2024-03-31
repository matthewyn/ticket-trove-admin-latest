import { HiMiniStar } from "react-icons/hi2";

interface MovieRatingsProps {
  rating: number;
}

export default function MovieRatings({ rating }: MovieRatingsProps) {
  return (
    <p className="text-amber-400 flex items-center gap-1">
      <HiMiniStar size={20} />
      <span>{rating}/10</span>
    </p>
  );
}
