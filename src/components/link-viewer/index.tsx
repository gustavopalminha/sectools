"use client";

import { useRef, useState, useEffect } from "react";
import { LinkViewerProps } from "./index.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LinkViewer = ({ params }: LinkViewerProps): React.JSX.Element | null => {
  const { messageId } = params;
  const [wasSelected, setWasSelected] = useState(false);

  const url = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setWasSelected(false);
  }, [messageId]);

  if (!messageId) {
    return null;
  }

  const copyToClipBoard = (): void => {
    url.current?.select();
    document.execCommand("copy");
    setWasSelected(true);
  };

  return (
    <div className="flex flex-col items-center space-y-4" role="link-viewer">
      <p className="text-lg font-semibold text-foreground">Message was saved! Share the url below:</p>
      <Input
        type="text"
        ref={url}
        className="text-center"
        readOnly
        value={`${window.location.origin}/${messageId}`}
      />
      <Button type="button" onClick={() => copyToClipBoard()}>
        {wasSelected ? `Copied!` : `Copy to clipboard`}
      </Button>
    </div>
  );
};

export default LinkViewer;
