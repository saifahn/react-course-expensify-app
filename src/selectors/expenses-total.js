const getExpensesTotal = (expenses = []) => {
  // if (!expenses || expenses.length === 0) {
  //   return 0;
  // }
  // if (Object.prototype.toString.call(expenses) === '[object Object]') {
  //   return expenses.amount;
  // }
  return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}

export default getExpensesTotal
