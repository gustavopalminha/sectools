"use client";
import dynamic from "next/dynamic";
import { createMessage } from "@/actions/message";
import Submit from "@/components/submit";
import { useFormState } from "react-dom";
import { logger } from "@/lib/logger";

const rootLogger = logger.child({ module: "home-route" });

const DynamicLinkViewer = dynamic(() => import("@/components/link-viewer"), {
  ssr: false,
});

const Form = ({ children }: { children: React.ReactNode }) => {
  const [state, formAction] = useFormState(createMessage, null);
  const shouldShowLinkViewer = state && state.data?.messageId !== null;

  if (shouldShowLinkViewer) {
    rootLogger.info(
      `MESSAGE ${state.data.messageId} CREATED. RETURN <LinkViewer />`
    );
  }

  return (
    <form className="pt-4 pb-4" action={formAction} data-testid="add-message">
      <div className="pb-2">{children}</div>

      {!shouldShowLinkViewer && (
        <div className="flex items-center justify-center">
          <Submit />
        </div>
      )}

      {shouldShowLinkViewer && (
        <div className="pt-4 pb-4">
          <DynamicLinkViewer params={{ messageId: state.data.messageId }} />
        </div>
      )}
    </form>
  );
};

export default Form;
