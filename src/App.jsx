import PaymentForm from "./PaymentForm";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

export default function App() {
  const path = window.location.pathname;

  if (path === "/success") return <Success />;
  if (path === "/cancel") return <Cancel />;

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Stripe Payment Gateway New Updated for pipeline 000 22</h1>
      <p>React 19 + Sequelize v7 + Stripe Checkout</p>
      <PaymentForm />
    </div>
  );
}