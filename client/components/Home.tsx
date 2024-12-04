import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function Home(): JSX.Element {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    <div>
      <section className="homepage">
        <h2>Welcome to the Budgeting App!</h2>
        <p>Track your income, expenses, and savings in one place.</p>
        <p>
          Easily categorize your transactions, visualize your spending habits,
          and take control of your finances.
        </p>
        {!isAuthenticated ? (
          <button className="btn-primary" onClick={() => loginWithRedirect()}>
            Get Started
          </button>
        ) : (
          <p>Please select a section from the navigation menu.</p>
        )}
      </section>

      <section className="features">
        <h3>Key Features</h3>
        <ul>
          <li>💰 Track Income and Expenses</li>
          <li>📊 Visualize Spending with Charts</li>
          <li>📅 Categorize Transactions</li>
          <li>🔒 Secure and Private</li>
        </ul>
      </section>
    </div>
  )
}

export default Home
