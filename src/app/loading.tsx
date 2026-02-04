import { Spinner } from "@/shared/ui";

export default function Loading(): React.ReactElement {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner size="lg" aria-label="Loading page" />
    </div>
  );
}
