"use client";

import { useFormStatus } from "react-dom";

const Submit = (): React.JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-slate-500 hover:bg-slate-700 text-white text-sm px-4 py-2  border rounded-full"
    >
      {pending ? "Saving..." : "Create"}
    </button>
  );
};

export default Submit;
