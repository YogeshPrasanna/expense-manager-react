
export const eachExpense = (expenses) => {
    return Object.keys(expenses).map(function (key) {
        return { key: key, value: expenses[key] };
    });
}

export const currentUsersExpenses = (eachExpense, currentUser) => {
    return eachExpense.filter((elem) => elem.value.uid === currentUser.uid);
}

export const expensesinMonthAndYear = (eachExpense,currentUser,selectedMonth,selectedYear) => {
    return eachExpense.filter((elem) => elem.value.uid === currentUser.uid)
                      .filter((elem) => new Date(elem.value.date).getFullYear().toString() === selectedYear)
                      .filter((elem) => new Date(elem.value.date).getMonth().toString() === selectedMonth);
}

export const expensesInDate = (eachExpense, currentUser,date) => {
    return eachExpense.filter((elem) => elem.value.uid === currentUser.uid && elem.value.date === date);
}

export const totalByCategory = (expenses,category) => {
    return expenses.filter((exp) => exp.value.category === category)
                   .map((el) => Number(el.value.expense))
                   .reduce((prev, cur) => prev + cur)
}


export default { eachExpense, currentUsersExpenses, expensesinMonthAndYear,
                 expensesInDate, totalByCategory }