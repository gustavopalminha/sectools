import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center">
      <div className="pb-9 text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Message Not Found!</h2>
        <p className="text-muted-foreground">Please contact the sender so that he can resend it again.</p>
      </div>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  );
}
