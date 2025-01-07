import NotFound from "./not-found";
import { getMessage } from "@/actions/message";
import Editor from "@/components/editor";
import { PageProps } from "./page.types";
import { logger } from "@/lib/logger";

const fetchLogger = logger.child({ module: "fetch-message" });

const Page = async ({ params }: PageProps) => {
  const { messageId } = await params;

  const message = await getMessage(messageId);

  if (!message) {
    fetchLogger.error(`MESSAGE ${messageId} NOT FOUND. RETURN <NotFound //>`);
    return <NotFound />;
  }

  return (
    <>
      <Editor
        params={{
          readOnly: true,
          text: message.body,
        }}
      />
    </>
  );
};

export default Page;
