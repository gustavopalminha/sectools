import NotFound from "./not-found";
import { tryGetMessage } from "@/actions/message";
import { Textarea } from "@/components/ui/textarea";
import { PageProps } from "./page.types";
import { logger } from "@/lib/logger";

const fetchLogger = logger.child({ module: "fetch-message" });

const Page = async ({ params }: PageProps): Promise<React.JSX.Element> => {
  const { messageId } = await params;

  const message = await tryGetMessage(messageId);

  if (!message) {
    fetchLogger.warn(`MESSAGE ${messageId} NOT FOUND. RETURN <NotFound //>`);
    return <NotFound />;
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <Textarea
          value={message.body}
          readOnly
          disabled
          className="min-h-[300px] resize-none text-base border-input"
        />
      </div>
    </main>
  );
};

export default Page;
