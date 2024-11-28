import React from 'react'
import { useCategories } from '../hooks/useCategories'

function Categories() {
  const { data: categories } = useCategories()

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
