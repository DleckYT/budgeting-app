import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getTransactions,
  getTransactionById,
  addTransaction,
  deleteTransaction,
  updateTransaction
} from '../apis/transactions'
import { Transaction, TransactionData } from '../../models/transactions'


export function useTransactions() {
  return useQuery<Transaction[], Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })
}


export function useTransaction(id: number) {
  return useQuery<Transaction, Error>({
    queryKey: ['transaction', id],
    queryFn: () => getTransactionById(id),
  })
}


export function useAddTransaction() {
  const queryClient = useQueryClient()

  return useMutation<number, Error, TransactionData>({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}


export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}


export function useUpdateTransaction() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, Transaction>({
    mutationFn: updateTransaction,     onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}