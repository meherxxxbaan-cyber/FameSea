import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const body = await req.json();
    const { listingId, listingTitle, price, sellerId, buyerId } = body;

    if (!listingId || !price) {
      return NextResponse.json({ error: "listingId and price required" }, { status: 400 });
    }

    const priceInCents = Math.round(Number(price) * 100);
    const platformFeeInCents = Math.round(priceInCents * 0.03);
    const totalInCents = priceInCents + platformFeeInCents;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: listingTitle || "Social Media Account",
              description: "Escrow-protected via SocialQX · 7-day inspection period",
            },
            unit_amount: totalInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        listing_id: listingId,
        buyer_id: buyerId || "guest",
        seller_id: sellerId || "",
        platform_fee_cents: platformFeeInCents.toString(),
        account_price_cents: priceInCents.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&listing=${listingId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/listing/${listingId}`,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
