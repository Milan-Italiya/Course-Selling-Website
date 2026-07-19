import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51R6xL9H0LX80q8lvgwTZzlaZnthHDhxNVyqd0kJocrzeGjB4XuVMrgdJQN8EkcaHj5mX29k61PoqUxta0qlv7V1u00C4bw2XJ8"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <StrictMode>
      <App />
    </StrictMode>
  </Elements>
);
