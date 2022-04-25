export const getAmount = (transactions) => (
  transactions.reduce((sum, transaction) =>
    transaction.type === 'income'
    ? sum + Number(transaction.amount)
    : sum - Number(transaction.amount),
    0
  )
)