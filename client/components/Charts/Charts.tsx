import GraphData from "./GraphData"
import GenerateTransactions, { CategoriesData } from "./RandomTransactionGenerator"
import TransactionChart from "./TransactionChart"
import './charts.css'

function Charts() {

    const transactions = GenerateTransactions()
    //const data = GraphData.BasicTransactionData(transactions, 'Expenses')
    const combined = GraphData.BasicTransactionData(transactions, transactions, 'Expenses')
    const categorized = GraphData.CategorizedTransactions(transactions, CategoriesData)

    return (
      <div>
        <h2>Charts</h2>
        <p>Here you can add charts to visualize your transactions data.</p>
        <TransactionChart data={combined} title="Monthly Expenses"/>
        <TransactionChart data={categorized} title="Monthly Expenses Categorized"/>
      </div>
    )
  }
  
  export default Charts
  