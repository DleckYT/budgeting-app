import React, { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useTransactions } from '../hooks/useTransactions'
import { useAddTransaction } from '../hooks/useTransactions'
import { useDeleteTransaction } from '../hooks/useTransactions'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

function Transactions() {
  const { data: categories } = useCategories()
  const { data: transactions } = useTransactions()
  const addTransaction = useAddTransaction()
  const deleteTransaction = useDeleteTransaction()

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

  const handleDeleteTransaction = (id: number) => {
    deleteTransaction.mutate(id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionData((prevData) => ({
      ...prevData,
      created_at: e.target.value,
    }))
  }

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
      <ul>
  {transactions?.map((transaction) => (
    <li key={transaction.id} className="bg-white p-4 shadow-md rounded-md flex justify-between items-center">
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
  ))}
</ul>
    </div>
  )
}

export default Transactions
