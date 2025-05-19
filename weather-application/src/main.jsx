import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx'
import 'leaflet/dist/leaflet.css';
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Initialises react query
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
