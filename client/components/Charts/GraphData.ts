import { endOfMonth, format, formatISO, parseISO, startOfMonth } from "date-fns";
import { Transaction } from "../../../models/transactions";
import { Category } from "../../../models/categories";

interface DataPoint{
  x: number
  y: number,
  label?: string,
}

export interface ChartData{
  type?: string,
  dataPoints?: Array<DataPoint>,
  name?: string
  toolTipContent?: string
  yValueFormatString?: string
}

function BasicTransactionData(fullTransactionList: Array<Transaction>, transactions: Array<Transaction>, name?: string): Array<ChartData>{ // graph that shows total transaction expense per month across all categories
  if (transactions.length === 0) return [{}]
  //total expenses per month
  //month and year as string
  //sorted
  fullTransactionList.sort((a, b) =>{
    return parseISO(a.created_at).getTime() - parseISO(b.created_at).getTime()
  })

  const firstMonth = startOfMonth(parseISO(fullTransactionList[0].created_at))
  const lastMonth = startOfMonth(parseISO(fullTransactionList[fullTransactionList.length - 1].created_at))

  const dataMap = new Map<string, DataPoint>()
  const currentDate = firstMonth
  let xNum: number = 1
  while ((currentDate.getFullYear() < lastMonth.getFullYear()) || (currentDate.getFullYear() === lastMonth.getFullYear() && currentDate.getMonth() <= lastMonth.getMonth())){
    dataMap.set(formatISO(currentDate, {representation: 'date'}), {
      x: xNum,
      y: 0,
      label: format(currentDate, 'MMM yyyy')
    })
    currentDate.setMonth(currentDate.getMonth() + 1)
    xNum++
  }

  for (const tran of transactions){
    const monthStartDate = startOfMonth(parseISO(tran.created_at))
    const monthStartISO = formatISO(monthStartDate, {representation: 'date'})
    if (!dataMap.has(monthStartISO)){
      console.group("Mystery")
      console.log("xNum:", xNum)
      console.log('Last Month:', formatISO(lastMonth, {representation: 'date'}))
      console.log(monthStartISO)
      console.log(dataMap)
      console.groupEnd()
    }
    dataMap.get(monthStartISO)!.y += tran.amount
  }

  const dataPoints = Array.from(dataMap, ([key, value]) =>{
    return value as DataPoint
  }).sort((a, b) => a.x - b.x)

  return [{
    type: 'stackedColumn',
    name,
    dataPoints,
    yValueFormatString: "$#,##0.#0"
  }]
}

function CategorizedTransactions(transactions: Array<Transaction>, categories: Array<Category>){
  const categoryMap = new Map(categories.map(c => [c.id, c]))
  const chartData: Array<ChartData> = []//Array(categories.length).fill([])

  const transactionMap = new Map<number, Array<Transaction>>()
  for (const tran of transactions){
    if (!categoryMap.has(tran.category_id)) continue
    if (!transactionMap.has(tran.category_id))
      transactionMap.set(tran.category_id, [])
    transactionMap.get(tran.category_id)!.push(tran)
  }

  for (const [category_id, trans] of transactionMap){
    const data = BasicTransactionData(transactions, trans, categoryMap.get(category_id)?.name)[0]
    /*data.toolTipContent = 
    `<div class="tooltip">
      <div>{label}</div>
      <div>${categoryMap.get(category_id)?.name}</div>
      <div>\${y}</div>
    </div>`*/
    chartData.push(data)
  }

  return chartData
}

export default {BasicTransactionData, CategorizedTransactions}