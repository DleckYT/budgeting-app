import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCategories, getCategoryById, addCategory, deleteCategory } from '../apis/categories'
import { Category, CategoryData } from '../../models/categories'

// Hook to fetch all categories
export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}

// Hook to fetch a single category by ID
export function useCategory(id: number) {
  return useQuery<Category, Error>({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
  })
}

// Hook to add a new category
export function useAddCategory() {
  const queryClient = useQueryClient()

  return useMutation<number, Error, CategoryData>({
    mutationFn: addCategory, // Mutation function
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

// Hook to delete a category
export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: deleteCategory, // Mutation function
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
