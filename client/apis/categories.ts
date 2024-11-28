import request from 'superagent'
import { Category, CategoryData } from '../../models/categories'

const rootUrl = '/api/v1'

// Fetch all categories
export function getCategories(): Promise<Category[]> {
  return request.get(`${rootUrl}/categories`).then((res) => {
    return res.body
  })
}

// Fetch a single category by ID
export function getCategoryById(id: number): Promise<Category> {
  return request.get(`${rootUrl}/categories/${id}`).then((res) => {
    return res.body
  })
}

// Add a new category
export function addCategory(category: CategoryData): Promise<number> {
  return request.post(`${rootUrl}/categories`).send(category).then((res) => {
    return res.body.id
  })
}

// Delete a category by ID
export function deleteCategory(id: number): Promise<void> {
  return request.delete(`${rootUrl}/categories/${id}`).then(() => {})
}
