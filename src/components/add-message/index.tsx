"use client";
import dynamic from "next/dynamic";
import { createMessage } from "@/actions/message";
import Submit from "@/components/submit";
import { useActionState } from "react";
import { logger } from "@/lib/logger";

const rootLogger = logger.child({ module: "home-route" });

const DynamicLinkViewer = dynamic(() => import("@/components/link-viewer"), {
  ssr: false,
});

type FormProps = { children: React.ReactNode };

const Form = ({ children }: FormProps): React.JSX.Element => {
  const [state, formAction] = useActionState(createMessage, null);
  const shouldShowLinkViewer = state && state.data?.messageId !== null;

  if (shouldShowLinkViewer) {
    rootLogger.info(
      `MESSAGE ${state.data.messageId} CREATED. RETURN <LinkViewer />`
    );
  }

  return (
    <form action={formAction} data-testid="add-message">
      {!shouldShowLinkViewer && children}

      {shouldShowLinkViewer && (
        <div className="bg-card rounded-lg border border-border shadow-sm p-6">
          <DynamicLinkViewer params={{ messageId: state.data.messageId }} />
        </div>
      )}
    </form>
  );
};

export default Form;
