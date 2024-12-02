import React, { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useTransactions } from '../hooks/useTransactions'
import { useAddTransaction } from '../hooks/useTransactions'
import { useDeleteTransaction } from '../hooks/useTransactions'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import CategoryPicker from './CategoryPicker'

export type CategorySelection = {
  name: string,
  selected: boolean
}

const groupByMonthYear = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.created_at)
    const monthYear = format(date, 'MMMM yyyy')

    if (!acc[monthYear]) {
      acc[monthYear] = []
    }
    acc[monthYear].push(transaction)
    return acc
  }, {})
}

function Transactions() {
  const { data: categories } = useCategories()
  const { data: transactions } = useTransactions()
  const addTransaction = useAddTransaction()
  const deleteTransaction = useDeleteTransaction()
  
  const [categorySelection, setCategorySelection] = useState<null | Map<number, CategorySelection>>(null)
  
  if (categories && !categorySelection){
    setCategorySelection(
      new Map(
        categories.map(c =>{
          return [
            c.id, 
            {
              name: c.name,
              selected: true
            }
          ]
        })
      )
    )
  }

  const [transactionData, setTransactionData] = useState({
    name: '',
    amount: 0,
    category_id: 1,
    created_at: new Date().toISOString(),
  })

  const handleAddTransaction = () => {
    addTransaction.mutate(transactionData)
    setTransactionData({
      name: '',
      amount: 0,
      category_id: 1,
      created_at: new Date().toISOString(),
    })
  }

  const handleDeleteTransaction = (id) => {
    deleteTransaction.mutate(id)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleDateChange = (e) => {
    setTransactionData((prevData) => ({
      ...prevData,
      created_at: e.target.value,
    }))
  }

  const sortedTransactions = transactions?.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))


  const groupedTransactions = groupByMonthYear(sortedTransactions || [])

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddTransaction()
        }}
        className="bg-white p-6 shadow-md rounded-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Transaction Name</label>
          <input
            type="text"
            name="name"
            value={transactionData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category_id"
            value={transactionData.category_id}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border rounded-md"
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Transaction Date</label>
          <input
            type="datetime-local"
            name="created_at"
            value={transactionData.created_at}
            onChange={handleDateChange}
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Transactions</h2>
      <CategoryPicker categories={categorySelection} setCategorySelection={setCategorySelection}/>
      {Object.entries(groupedTransactions).map(([monthYear, transactions]) => (
        <div key={monthYear}>
          <h3 className="text-xl font-semibold mt-6 mb-2">{monthYear}</h3>
          <ul>
            {transactions.map((transaction) => {
              if (!categorySelection.get(transaction.category_id).selected) return
              return <li key={transaction.id} className="bg-white p-4 shadow-md rounded-md flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-gray-500">
                    ${transaction.amount.toFixed(2)} -{' '}
                    {format(new Date(transaction.created_at), 'dd/MM/yy HH:mm')}
                  </p>
                </div>
                <div>
                  <Link
                    to={`/transactions/edit/${transaction.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Transactions
