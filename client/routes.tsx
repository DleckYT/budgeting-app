

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
        // element: <h2>Welcome to the Budgeting App</h2>, 
      },
      {
        path: "transactions",
        element: <Transactions />, 
      },
      {
        path: "transactions/edit/:id", 
        element: <EditTransaction />, 
      },
      {
        path: "categories", 
        element: <Categories />,
      },
      {
        path: "charts", 
        element: <Charts />,
      },
      
      
      
      
    ],
  },
];

export default routes;
