import './App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Root from "./routes/Root";
import {ThemeProvider} from "@material-tailwind/react";

function App() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            }
        }
    });
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <Root/>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
