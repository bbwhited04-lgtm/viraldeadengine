import Link from "next/link";

export default function SubscribeCancel() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 text-center">
      <h1 className="text-4xl font-extrabold">Checkout canceled</h1>
      <p className="opacity-80 mt-3">No worries — you can try again anytime.</p>
      <div className="mt-8 flex gap-3 justify-center flex-wrap">
        <Link className="px-4 py-3 rounded-xl font-extrabold bg-white text-black" href="/pricing">Try again</Link>
        <Link className="px-4 py-3 rounded-xl bg-white/5 border border-white/10" href="/">Home</Link>
      </div>
    </main>
  );
}
