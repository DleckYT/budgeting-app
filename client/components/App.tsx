import { Outlet, Link } from 'react-router-dom'
import '../styles/main.css'
import Dashboard from './Dashoboard.tsx'



const App = () => {
  return (
    <div>
      <header>
        <h1>Budgeting App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/charts">Charts</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Dashboard />
        <Outlet /> 
      </main>
      <footer>
        <p>heeeee</p>
      </footer>
    </div>
  )
}

export default App
