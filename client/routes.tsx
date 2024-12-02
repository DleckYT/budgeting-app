// routes.tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import Transactions from './components/Transactions';
import Categories from './components/Categories';
import Charts from './components/Charts/Charts';
import EditTransaction from './components/EditTransaction';

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <h2>Welcome to the Budgeting App</h2>, // Default page
      },
      {
        path: "transactions", // Keep it relative to the parent
        element: <Transactions />,
        children: [
          {
            path: "edit/:id", // This path will be resolved as "/transactions/edit/:id"
            element: <EditTransaction />,
          },
        ],
      },
      {
        path: "categories", // Correct the path to be relative
        element: <Categories />,
      },
      {
        path: "charts", // Correct the path to be relative
        element: <Charts />,
      },
      // {
      //   path: "dashboard", // Correct the path to be relative
      //   element: <Dashboard />,
      // },
    ],
  },
];

export default routes;
