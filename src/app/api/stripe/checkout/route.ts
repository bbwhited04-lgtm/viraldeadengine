import { NextResponse } from "next/server";
import { getStripe } from "../../../../lib/stripe";
import { SITE } from "../../../../lib/site";

export async function POST(req: Request) {
  try {
    const { email } = await req.json().catch(() => ({}));
    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) return NextResponse.json({ error: "Missing STRIPE_PRICE_ID env var" }, { status: 500 });

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email || undefined,
      success_url: `${SITE}/subscribe/success`,
      cancel_url: `${SITE}/subscribe/cancel`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Stripe checkout error" }, { status: 500 });
  }
}
