// routes.tsx
import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import Transactions from './components/Transactions'
import Categories from './components/Categories'
import Charts from './components/Charts'
import Dashboard from './components/Dashoboard'

const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route index element={<h2>Welcome to the Budgeting App</h2>} /> {/* Default page */}
    <Route path="/transactions" element={<Transactions />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/charts" element={<Charts />} />
    <Route path="/Dashboard" element={<Dashboard />} />
  </Route>
)

export default routes
