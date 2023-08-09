import logo from './logo.svg';
import './App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Root from "./routes/Root";

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Root/>
    </QueryClientProvider>
  );
}

export default App;
