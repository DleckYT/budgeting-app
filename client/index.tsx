// index.tsx
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes'; // Import routes as array
import { Auth0Provider } from '@auth0/auth0-react';
import './styles/main.css';

const queryClient = new QueryClient();

const domain = "troll-app.au.auth0.com"
const clientId = "AjE4EaIhYNmzwWLSomMDOwIrIYVjGJgu"
const audience = 'https://troll-app.au.auth0.com/api/v2/'




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
