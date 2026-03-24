
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./components/App/App";
import "modern-normalize/modern-normalize.css";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);
