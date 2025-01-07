import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center">
      <div className="pb-9 text-center">
        <h2>Message Not Found!</h2>
        <p>Please contact the sender so that he can resend it again.</p>
      </div>
      <button className="bg-slate-500 hover:bg-slate-700 text-white text-sm px-4 py-2  border rounded-full">
        <Link href="/">Return Home</Link>
      </button>
    </div>
  );
}
