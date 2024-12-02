// index.tsx
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes'; // Import routes as array
import { Auth0Provider } from '@auth0/auth0-react';
import './styles/main.css';

const queryClient = new QueryClient();

const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE as string;

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={createBrowserRouter(routes)} /> {/* Use createBrowserRouter here */}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>
  );
});
