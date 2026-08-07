import { loadStripe } from "@stripe/stripe-js";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export function getStripeClient() {
  if (!stripePublishableKey) {
    return null;
  }

  return loadStripe(stripePublishableKey);
}
