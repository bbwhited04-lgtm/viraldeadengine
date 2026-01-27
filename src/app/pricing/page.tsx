import SubscribeCard from "../../components/SubscribeCard";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-extrabold">Subscription</h1>
      <p className="opacity-80 mt-2">Stripe-powered subscription checkout + customer portal.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-6 items-start">
        <SubscribeCard />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-extrabold">What you get</h2>
          <ul className="mt-3 space-y-2 opacity-90 list-disc pl-5">
            <li>Content loop playbooks (short-form → blog → CTA)</li>
            <li>Templates for captions, hooks, comment prompts</li>
            <li>Weekly “what’s working” updates</li>
            <li>Early access to automation tooling</li>
          </ul>
          <p className="mt-6 text-sm opacity-70">
            After subscribing, use Account → Manage Subscription.
          </p>
        </div>
      </div>
    </main>
  );
}
