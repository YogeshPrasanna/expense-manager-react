import moment from 'moment'

export const eachExpense = (expenses) => {
    return Object.keys(expenses).map(function (key) {
        return { key: key, value: expenses[key] };
    }).sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.value.date) - new Date(a.value.date);
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
    const categories = ["Food", "Automobile", "Entertainment", "Clothing", "Healthcare", "Travel", "Shopping", "Personal Care", "Investment", "Gifts & Donations", "Bills & Utilities", "Others"]

    let categoryTotal = {
        "Food": 0,
        "Automobile": 0,
        "Entertainment": 0,
        "Clothing": 0,
        "Healthcare": 0,
        "Travel": 0,
        "Shopping": 0,
        "Personal Care": 0,
        "Investment": 0,
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

// all categories
export const categories = [
    "Food", 
    "Automobile", 
    "Entertainment", 
    "Clothing", 
    "Healthcare", 
    "Travel", 
    "Shopping", 
    "Personal Care", 
    "Investment", 
    "Gifts & Donations", 
    "Bills & Utilities", 
    "Others"
]

// colors for each category
export const categoryColors = [
    '#FF965D',
    '#FFCC78',
    '#A08E78',
    '#8DA685',
    '#00A3EA',
    '#3EA75E',
    '#16B498',
    '#FF1945',
    '#FF5473',
    '#927959',
    '#7E0332',
    '#872AEF'
]

// retrun border color for each category - daily and monthly view 
export const categoryName = (cat) => {
    switch (cat) {
        case 'Food':
            return { "borderBottom": "5px solid #FF965D" }
            break;
        case 'Automobile':
            return { "borderBottom": "5px solid #FFCC78" }
            break;
        case 'Entertainment':
            return { "borderBottom": "5px solid #A08E78" }
            break;
        case 'Clothing':
            return { "borderBottom": "5px solid #8DA685" }
            break;
        case 'Healthcare':
            return { "borderBottom": "5px solid #00A3EA" }
            break;
        case 'Travel':
            return { "borderBottom": "5px solid #3EA75E" }
            break;
        case 'Shopping':
            return { "borderBottom": "5px solid #16B498" }
            break;
        case 'Personal Care':
            return { "borderBottom": "5px solid #FF1945" }
            break;
        case 'Investment':
            return { "borderBottom": "5px solid #FF5473" }
            break;
        case 'Gifts & Donations':
            return { "borderBottom": "5px solid #927959" }
            break;
        case 'Bills & Utilities':
            return { "borderBottom": "5px solid #7E0332" }
            break;
        case 'Others':
            return { "borderBottom": "5px solid #872AEF" }
            break;
        default:
            return { "borderBottom": "5px solid orange" }
    }
}


export const filterExpensesByCriteria = (startDate, endDate, category, expenseFrom,expenseTo,thisUsersExpenses) => {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var currentDate = new Date(start);
    var between = [];
    var filteredExpenses = [];

    while (currentDate <= end) {
        between.push(moment(new Date(currentDate)).format("MM/DD/YYYY"));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    between.forEach(function (elem) {
        return thisUsersExpenses.filter(function (el) {
            return elem === el.value.date ? filteredExpenses.push(el) : ''
        })
    })

    filteredExpenses = filteredExpenses.filter((elem) => {
        return elem.value.category === category
    }).filter((elem) => {
        return Number(elem.value.expense) >= Number(expenseFrom) &&
            Number(elem.value.expense) <= Number(expenseTo)
    })

    return filteredExpenses
}
