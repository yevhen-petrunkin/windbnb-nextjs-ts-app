"use client";

import { IEmptyStateProps } from "@/interfaces";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

const EmptyState: React.FC<IEmptyStateProps> = ({
  title = "No exact matches.",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
      <Heading title={title} subtitle={subtitle} center />

      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
