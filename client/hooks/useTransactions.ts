import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getTransactions,
  getTransactionById,
  addTransaction,
  deleteTransaction,
} from '../apis/transactions'
import { Transaction, TransactionData } from '../../models/transactions'

// Hook to fetch all transactions
export function useTransactions() {
  return useQuery<Transaction[], Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })
}

// Hook to fetch a single transaction by ID
export function useTransaction(id: number) {
  return useQuery<Transaction, Error>({
    queryKey: ['transaction', id],
    queryFn: () => getTransactionById(id),
  })
}

// Hook to add a new transaction
export function useAddTransaction() {
  const queryClient = useQueryClient()

  return useMutation<number, Error, TransactionData>({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}

// Hook to delete a transaction
export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
