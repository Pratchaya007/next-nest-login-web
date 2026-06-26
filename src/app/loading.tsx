import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <Button disabled size="sm" variant={'outline'}>
          <Spinner data-icon="inline-start" />
          Loading...
        </Button>
      </div>
    </div>
  );
}
