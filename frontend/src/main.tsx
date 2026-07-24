import { createRoot } from "react-dom/client";
import Form from "./App.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Form />
  </StrictMode>,
);
