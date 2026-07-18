import { useActionState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

async function checkoutAction(prevState, formData) {
  const products = [
    {
      name: formData.get("productName"),
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity"))
    }
  ];

  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      products,
      email: formData.get("email")
    })
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data.error || "Checkout failed" };
  }
  console.log("Checkout session created:", data.sessionId);
  const stripe = await stripePromise;
  const result = await stripe.redirectToCheckout({
    sessionId: data.sessionId
  });

  if (result.error) {
    return { error: result.error.message };
  }

  return { error: null };
}

export default function PaymentForm() {
  const [state, formAction, isPending] = useActionState(checkoutAction, {
    error: null
  });

  return (
    <form action={formAction} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <input name="email" type="email" placeholder="Email" />
      <input name="productName" defaultValue="T-Shirt" placeholder="Product name" />
      <input name="price" type="number" defaultValue="20" step="0.01" placeholder="Price" />
      <input name="quantity" type="number" defaultValue="1" min="1" placeholder="Quantity" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Processing..." : "Pay Now"}
      </button>
      {state?.error ? <p style={{ color: "red" }}>{state.error}</p> : null}
    </form>
  );
}