import { Outlet, Link } from 'react-router-dom'

function App() {
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
            <li>
              <Link to="/Dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> 
      </main>
      <footer>
        <p>© 2024 Budgeting App</p>
      </footer>
    </div>
  )
}

export default App