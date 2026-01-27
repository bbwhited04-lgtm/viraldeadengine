import Stripe from "stripe";

/**
 * Do NOT hard-pin apiVersion in code (Stripe typings change).
 * If you want to pin, set STRIPE_API_VERSION env var to a version your installed stripe package supports.
 */
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY env var");

  const apiVersion = process.env.STRIPE_API_VERSION as any; // optional
  return apiVersion
    ? new Stripe(key, { apiVersion })
    : new Stripe(key);
}
