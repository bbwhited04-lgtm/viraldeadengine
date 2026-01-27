import { NextResponse } from "next/server";
import { getStripe } from "../../../../lib/stripe";
import { SITE } from "../../../../lib/site";

/**
 * Customer Portal requires a Stripe Customer ID.
 * In production, you should look up the customer from your database by user id/email.
 * For now, we support:
 * - STRIPE_DEFAULT_CUSTOMER_ID env var (quick start)
 */
export async function POST() {
  try {
    const customerId = process.env.STRIPE_DEFAULT_CUSTOMER_ID;
    if (!customerId) {
      return NextResponse.json(
        { error: "Missing STRIPE_DEFAULT_CUSTOMER_ID env var (set this or wire a DB lookup)" },
        { status: 500 }
      );
    }

    const stripe = getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${SITE}/account`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Stripe portal error" }, { status: 500 });
  }
}
