
import moment from 'moment'

export const eachExpense = (expenses) => {
    return Object.keys(expenses).map(function (key) {
        return { key: key, value: expenses[key] };
    });
}

export const currentUsersExpenses = (eachExpense, currentUser) => {
    return eachExpense.filter((elem) => elem.value.uid === currentUser.uid);
}

// expenses in selected month and year
export const expensesinMonthAndYear = (eachExpense,currentUser,selectedMonth,selectedYear) => {
    return eachExpense.filter((elem) => elem.value.uid === currentUser.uid)
                      .filter((elem) => new Date(elem.value.date).getFullYear().toString() === selectedYear)
                      .filter((elem) => new Date(elem.value.date).getMonth().toString() === selectedMonth);
}

// expenses in a selected date
export const expensesInDate = (eachExpense, currentUser,date) => {
    return eachExpense.filter((elem) => elem.value.uid === currentUser.uid && elem.value.date === date);
}

// expenses in current month 
export const currentMonthExpenses = (eachExpense, currentUser) => {
    return eachExpense.filter((elem) => elem.value.uid === currentUser.uid 
                                        && new Date(elem.value.date).getMonth() === new Date().getMonth())
}

// expense today
export const expensesToday = (eachExpense,currentUser) => {
    return eachExpense.filter((elem) => elem.value.uid === currentUser.uid && new Date(elem.value.date).getMonth() === new Date().getMonth())
                      .filter((elem) => new Date(elem.value.date).getDate() === new Date().getDate())
}

// expense this week
export const expensesThisWeek = (eachExpense, currentUser) => {
    return eachExpense.filter((elem) => elem.value.uid === currentUser.uid && (moment(elem.value.date, 'MM/DD/YYYY').week() === moment(moment(new Date()), 'MM/DD/YYYY').week()))
}

// expenses Total 
export const totalExpense = (expenses) => {
    return expenses.map((elem) => {
        return Number(elem.value.expense)
    }).reduce((prev, cur) => prev + cur)
}

export const totalByCategory = (expenses,category) => {
    return expenses.filter((exp) => exp.value.category === category)
                   .map((el) => Number(el.value.expense))
                   .reduce((prev, cur) => prev + cur)
}
