import React, { useState } from 'react'

const Dashboard = () => {
  const [transactions, setTransactions] = useState<any[]>([])
  const [formData, setFormData] = useState({
    category: '',
    transaction: '',
    fee: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.category && formData.transaction && formData.fee) {
      setTransactions([...transactions, formData])
      setFormData({ category: '', transaction: '', fee: '' })
    }
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col items-center gap-4 sm:flex-row"
      >
        <div className="flex w-full flex-col sm:w-1/4">
          <label htmlFor="category" className="mb-1 font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="rounded border border-gray-300 px-3 py-2"
          >
            <option value="">Select</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <div className="flex w-full flex-col sm:w-1/2">
          <label htmlFor="transaction" className="mb-1 font-medium">
            Transaction
          </label>
          <input
            type="text"
            id="transaction"
            name="transaction"
            placeholder="Enter transaction"
            value={formData.transaction}
            onChange={handleChange}
            required
            className="rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="flex w-full flex-col sm:w-1/4">
          <label htmlFor="fee" className="mb-1 font-medium">
            Fee
          </label>
          <input
            type="number"
            id="fee"
            name="fee"
            placeholder="$"
            value={formData.fee}
            onChange={handleChange}
            required
            className="rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 sm:mt-0"
        >
          Add
        </button>
      </form>
      <div className="rounded border border-gray-300 p-4">
        <h2 className="mb-2 text-lg font-semibold">Transactions</h2>
        {transactions.length > 0 ? (
          <ul className="list-inside list-disc">
            {transactions.map((transaction, index) => (
              <li key={index}>
                {transaction.category} - {transaction.transaction}: $
                {transaction.fee}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No transactions yet.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
