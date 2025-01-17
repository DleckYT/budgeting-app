import React, { useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import '../styles/main.css'
import Home from './Home'

function App(): JSX.Element {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()
  const navigate = useNavigate()

  // Redirect to /transactions after login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/transactions')
    }
  }, [isAuthenticated, navigate])
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💲Budgeting App💲</h1>
        {isAuthenticated && (
          <nav className="app-nav">
            <ul>
              {/* <li>
                <Link to="/">Home</Link>
              </li> */}
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
        )}
        <div>
          {isAuthenticated ? (
            <div>
              <p>Welcome, {user?.name}</p>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log out
              </button>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()}>Log in</button>
          )}
        </div>
      </header>
      <main>
        {isAuthenticated ? <Outlet /> : <Home />}
      </main>
      <footer className="app-footer">
        <p>© 2024 Budgeting App</p>
        <p>Developed by Katuta, Lance, Oscar, and MinJun</p>
      </footer>
    </div>
  )
}

export default App
