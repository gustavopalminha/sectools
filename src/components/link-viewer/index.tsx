"use client";

import { useRef, useState, useEffect } from "react";
import { LinkViewerProps } from "./index.types";

const LinkViewer = ({ params }: LinkViewerProps) => {
  const { messageId } = params;
  const [wasSelected, setWasSelected] = useState(false);

  const url = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setWasSelected(false);
  }, [messageId]);

  if (!messageId) {
    return null;
  }

  const copyToClipBoard = () => {
    url.current?.select();
    document.execCommand("copy");
    setWasSelected(true);
  };

  return (
    <div
      className="flex flex-col items-center pt-2 pb-2 bg-green-200"
      role="link-viewer"
    >
      <b>Message was saved! Share the url bellow:</b>
      <input
        type="text"
        ref={url}
        className="w-full p-2 bg-green-200 text-center"
        readOnly
        value={`${window.location.origin}/${messageId}`}
      />
      <button
        type="button"
        onClick={() => copyToClipBoard()}
        className="bg-slate-500 hover:bg-slate-700 text-white text-sm px-4 py-2  border rounded-full"
      >
        {wasSelected ? `Copied!` : `Copy to clipboard`}
      </button>
    </div>
  );
};

export default LinkViewer;
