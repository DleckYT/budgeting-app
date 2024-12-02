import { useQueries } from '@tanstack/react-query'
import GraphData from './GraphData'
import TransactionChart from './TransactionChart'
import './charts.css'
import { getTransactions } from '../../apis/transactions'
import { getCategories } from '../../apis/categories'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'

function Charts() {

  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const [transactionsQuery, categoriesQuery] = useQueries({
    queries: [
      { queryKey: ['transactions'], queryFn: getTransactions },
      { queryKey: ['categories'], queryFn: getCategories },
    ],
  })

  // Handle loading state
  if (transactionsQuery.isLoading || categoriesQuery.isLoading) {
    return <div className="loading-message">Loading charts...</div>
  }

  // Handle errors
  if (transactionsQuery.isError || categoriesQuery.isError) {
    return (
      <div className="error-message">
        There was an error loading the charts. Please try again later.
      </div>
    )
  }

  // Extract data safely
  const transactions = transactionsQuery.data ?? []
  const categories = categoriesQuery.data ?? []

  // Process data using GraphData functions
  const combined = GraphData.BasicTransactionData(
    transactions,
    transactions,
    'Expenses',
  )
  const categorized = GraphData.CategorizedTransactions(
    transactions,
    categories,
  )
  const categorizedV2 = GraphData.CategorizedTransactions(
    transactions,
    categories,
    'stackedColumn',
  )

  return (
    <div className="charts-container">
      <h2 className="charts-title">Charts</h2>
      <p className="charts-description">
        Here you can add charts to visualize your transactions data.
      </p>

      <div className="chart">
        <TransactionChart data={combined} title="Monthly Expenses" />
      </div>
      <div className="chart">
        <TransactionChart
          data={categorized}
          title="Monthly Expenses Categorized"
        />
      </div>
      <div className="chart">
        <TransactionChart
          data={categorizedV2}
          title="Monthly Expenses Categorized V2"
        />
      </div>
    </div>
  )
}

export default Charts
