import { Outlet, Link } from 'react-router-dom'

import '../styles/main.css'

function App(): JSX.Element {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💲Budgeting App💲</h1>
        <nav className="app-nav">
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
            {/* <li>
              <Link to="/dashboard">Dashboard</Link>
            </li> */}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>© 2024 Budgeting App</p>
      </footer>
    </div>
  )
}

export default App
