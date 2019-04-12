import moment from 'moment'

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  // filters the expenses array
  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt)
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')
        : true
      const textMatch =
        typeof text !== 'string' ||
        expense.description.toLowerCase().includes(text.toLowerCase())

      return startDateMatch && endDateMatch && textMatch
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        // the greater value of a/b indicates more recent. 1 will sort b in front of a.
        return a.createdAt < b.createdAt ? 1 : -1
      }
      if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1
      }
    })
}

export default getVisibleExpenses
