
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

// Total for each category
export const calculateTotalForAllCategories = (expenses) => {
    const categories = ["Food", "Automobile", "Entertainment", "Clothing", "Healthcare", "Travel", "Shopping", "Personal Care", "Gifts & Donations", "Bills & Utilities", "Others"]

    let categoryTotal = {
        "Food": 0,
        "Automobile": 0,
        "Entertainment": 0,
        "Clothing": 0,
        "Healthcare": 0,
        "Travel": 0,
        "Shopping": 0,
        "Personal Care": 0,
        "Gifts & Donations": 0,
        "Bills & Utilities": 0,
        "Others": 0
    }

    const totalForACategory = function (expenses, category) {
        let temp = expenses.filter((elem) => elem.value.category === category).map((el) => Number(el.value.expense))

        var category = category
        if (temp.length) {
            return categoryTotal[category] = temp.reduce((prev, cur) => prev + cur)
        } else {
            return categoryTotal[category] = 0
        }
    }

    categories.map((category) => totalForACategory(expenses, category))

    return categoryTotal
}

