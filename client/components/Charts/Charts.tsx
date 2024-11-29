import { useQueries } from "@tanstack/react-query"
import GraphData from "./GraphData"
import TransactionChart from "./TransactionChart"
import './charts.css'
import { getTransactions } from "../../apis/transactions"
import { getCategories } from "../../apis/categories"

function Charts() {

    const queries = useQueries({
      queries: [
        {queryKey: ['transactions'], queryFn: getTransactions},
        {queryKey: ['categories'], queryFn: getCategories}
      ]
    })

    if (queries[0].isLoading || queries[1].isLoading)
      return "Loading charts..."

    if (queries[0].isError || queries[1].isError)
      return "There was an error loading the charts..."

    const transactions = queries[0].data!
    const categories = queries[1].data!
    const combined = GraphData.BasicTransactionData(transactions, transactions, 'Expenses')
    const categorized = GraphData.CategorizedTransactions(transactions, categories)
    const categorizedV2 = GraphData.CategorizedTransactions(transactions, categories, 'stackedColumn')

    return (
      <div>
        <h2>Charts</h2>
        <p>Here you can add charts to visualize your transactions data.</p>
        <TransactionChart data={combined} title="Monthly Expenses"/>
        <TransactionChart data={categorized} title="Monthly Expenses Categorized"/>
        <TransactionChart data={categorizedV2} title="Monthly Expenses Categorized V2"/>
      </div>
    )
  }
  
  export default Charts
  