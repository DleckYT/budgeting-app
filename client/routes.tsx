// routes.tsx
import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import Transactions from './components/Transactions'
import Categories from './components/Categories'
import Charts from './components/Charts/Charts'
import Dashboard from './components/Dashoboard'
import EditTransaction from './components/EditTransaction'

const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route index element={<h2>Welcome to the Budgeting App</h2>} /> {/* Default page */}
    <Route path='transactions'>
      <Route index element={<Transactions/>}/>
      <Route path="edit/:id" element={<EditTransaction />} />
    </Route>
    <Route path="/categories" element={<Categories />} />
    <Route path="/charts" element={<Charts />} />
    <Route path="/Dashboard" element={<Dashboard />} />
    {/*<Route path="/transactions/edit/:id" element={<EditTransaction />} />*/}
  </Route>
)

export default routes
