import React, { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useTransactions } from '../hooks/useTransactions'
import { useAddTransaction } from '../hooks/useTransactions'
import { useDeleteTransaction } from '../hooks/useTransactions'
import { format } from 'date-fns'

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
    <div>
      <h2>Add Transaction</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddTransaction()
        }}
      >
        <div>
          <label>Transaction Name:</label>
          <input
            type="text"
            name="name"
            value={transactionData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category_id"
            value={transactionData.category_id}
            onChange={handleChange}
            required
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Transaction Date:</label>
          <input
            type="datetime-local"
            name="created_at"
            value={transactionData.created_at}
            onChange={handleDateChange}
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>

      <h2>Transactions</h2>
      <ul>
        {transactions?.map((transaction) => (
          <li key={transaction.id}>
            {transaction.name} - ${transaction.amount} -{' '}
            {format(new Date(transaction.created_at), 'dd/MM/yy HH:mm')} -{' '}
            <button onClick={() => handleDeleteTransaction(transaction.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Transactions
