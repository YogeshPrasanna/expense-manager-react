import moment from "moment";

export const eachExpense = expenses => {
    if(expenses == null){
        expenses = [];
        return expenses;
    }
    return Object.keys(expenses)
        .map(function(key) {
            return { key: key, value: expenses[key] };
        })
        .sort(function(a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.value.date) - new Date(a.value.date);
        });
};

export const eachCategory = categories => {
    if(categories == null){
        categories = [];
        return categories;
    }
    return Object.keys(categories)
        .map(function(key) {
            return { key: key, value: categories[key] };
        })
        .sort();
};

export const currentUsersExpenses = (eachExpense, currentUser) => {
    return eachExpense.filter(elem => elem.value.uid === currentUser.uid);
};

export const currentUsersCategories = (eachCategory, currentUser) => {
    return eachCategory.filter(elem => elem.value.uid === currentUser.uid);
};

// expenses in selected month and year
export const expensesinMonthAndYear = (eachExpense, currentUser, selectedMonth, selectedYear) => {
    return eachExpense
        .filter(elem => elem.value.uid === currentUser.uid)
        .filter(elem => new Date(elem.value.date).getFullYear().toString() === selectedYear.toString())
        .filter(elem => new Date(elem.value.date).getMonth().toString() === selectedMonth);
};

// expenses in selected year
export const expensesinSelectedYear = (eachExpense, currentUser, selectedYear) => {
    return eachExpense
        .filter(elem => elem.value.uid === currentUser.uid)
        .filter(elem => new Date(elem.value.date).getFullYear().toString() === selectedYear.toString());
};

// expenses in a selected date
export const expensesInDate = (eachExpense, currentUser, date) => {
    return eachExpense.filter(elem => elem.value.uid === currentUser.uid && elem.value.date === date);
};

// expenses in a selected category
export const expensesInCategory = (eachExpense, currentUser, category) => {
    return eachCategory.filter(elem => elem.value.uid === currentUser.uid && elem.value.category === category);
};

// expenses in current month
export const currentMonthExpenses = (eachExpense, currentUser) => {
    return eachExpense.filter(
        elem =>
            elem.value.uid === currentUser.uid &&
            new Date(elem.value.date).getMonth() === new Date().getMonth() &&
            new Date(elem.value.date).getFullYear() === new Date().getFullYear()
    );
};

// expense in current year
export const expensesinCurrentYear = (eachExpense, currentUser) => {
    return eachExpense
        .filter(elem => elem.value.uid === currentUser.uid)
        .filter(elem => new Date(elem.value.date).getFullYear().toString() === new Date().getFullYear().toString());
};

// expenses in a particular month of this year
export const expensesinMonth = (eachExpense, currentUser, MonthNumber, selectedYear) => {
    return eachExpense
        .filter(elem => elem.value.uid === currentUser.uid)
        .filter(elem => new Date(elem.value.date).getFullYear().toString() === selectedYear.toString())
        .filter(elem => new Date(elem.value.date).getMonth().toString() === MonthNumber);
};

// expense today
export const expensesToday = (eachExpense, currentUser) => {
    return eachExpense
        .filter(
            elem => elem.value.uid === currentUser.uid && new Date(elem.value.date).getMonth() === new Date().getMonth()
        )
        .filter(elem => new Date(elem.value.date).getDate() === new Date().getDate());
};

// expense this week
export const expensesThisWeek = (eachExpense, currentUser) => {
    return eachExpense.filter(
        elem =>
            elem.value.uid === currentUser.uid &&
            moment(elem.value.date, "MM/DD/YYYY").week() === moment(moment(new Date()), "MM/DD/YYYY").week()
    );
};

// expenses Total
export const totalExpense = expenses => {
    if (expenses.length) {
        return expenses.map(elem => Number(elem.value.expense)).reduce((prev, cur) => prev + cur);
    } else {
        return 0;
    }
};

// most spend day
export const mostSpentDay = expenses => {
    let monday = 0;
    let tuesday = 0;
    let wednesday = 0;
    let thursday = 0;
    let friday = 0;
    let saturday = 0;
    let sunday = 0;

    expenses.map(elem => {
        switch (elem.value.day.toString()) {
            case "0":
                sunday = sunday + 1;
                return "";
            case "1":
                monday = monday + 1;
                return "";
            case "2":
                tuesday = tuesday + 1;
                return "";
            case "3":
                wednesday = wednesday + 1;
                return "";
            case "4":
                thursday = thursday + 1;
                return "";
            case "5":
                friday = friday + 1;
                return "";
            case "6":
                saturday = saturday + 1;
                return "";
            default:
                return "";
        }
    });

    let mostDaysObj = {
        sunday: sunday,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday
    };

    var sortable = [];
    for (var day in mostDaysObj) {
        sortable.push([day, mostDaysObj[day]]);
    }

    let sortedCategories = sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return {
        mostSpentDay: expenses.length ? sortedCategories[0][0] : "-",
        leastSpentDay: expenses.length ? sortedCategories[6][0] : "-"
    };
};

// Total expenses in Each month
export const totalExpensesInEachMonthOfThisYear = (expenses, eachExpense, currentUser, selectedYear) => {
    let expensesOfAllMonthsInThisYear = [];

    for (var i = 0; i <= 11; i++) {
        expensesOfAllMonthsInThisYear.push(
            totalExpense(expensesinMonth(eachExpense, currentUser, String(i), selectedYear))
        );
    }
    return expensesOfAllMonthsInThisYear;
};

// Total for each category
export const calculateTotalForAllCategories = (expenses,categories) => {
    
    let categoryTotal = [];
    categories.map(key => (
        categoryTotal[key.value.category] = 0
    ));
    const totalForACategory = function(expenses, category) {
        let temp = expenses.filter(elem => elem.value.category === category).map(el => Number(el.value.expense));

        var category = category;
        if (temp.length) {
            return (categoryTotal[category] = temp.reduce((prev, cur) => prev + cur));
        } else {
            return (categoryTotal[category] = 0);
        }
    };

    categories.map(category => totalForACategory(expenses, category.value.category));

    console.log("CAtegories Toatal : ", categoryTotal);

    return categoryTotal;
};

// most spent on category
export const mostSpentCategory = (expenses,categories) => {
    let categoryTotals = calculateTotalForAllCategories(expenses,categories);

    var sortable = [];
    for (var cat in categoryTotals) {
        sortable.push([cat, categoryTotals[cat]]);
    }

    let sortedCategories = sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return expenses.length ? sortedCategories[0][0] : "-";
};

export const categoryIcon = category => {
    switch (category) {
        case "Food":
            return "cutlery";
        case "Automobile":
            return "motorcycle";
        case "Entertainment":
            return "film";
        case "Clothing":
            return "shopping-bag";
        case "Healthcare":
            return "medkit";
        case "Travel":
            return "plane";
        case "Shopping":
            return "shopping-cart";
        case "Personal Care":
            return "user-md";
        case "Investment":
            return "get-pocket";
        case "Gifts & Donations":
            return "gift";
        case "Bills & Utilities":
            return "columns";
        case "Others":
            return "circle-o";
        default:
            return "bars";
    }
};

export const setCurrencyIcon = currency => {
    switch (currency) {
        case "Indian Rupees":
            return "fa-rupee";
        case "US Dollars":
            return "fa-dollar";
        case "Pounds":
            return "fa-gbp";
        case "Yen":
            return "fa-yen";
        case "Euro":
            return "fa-euro";
        default:
            return "fa-rupee";
    }
};

export const filterExpensesByCriteria = (startDate, endDate, category, expenseFrom, expenseTo, thisUsersExpenses) => {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var currentDate = new Date(start);
    var between = [];
    var filteredExpenses = [];

    while (currentDate <= end) {
        between.push(moment(new Date(currentDate)).format("MM/DD/YYYY"));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    between.forEach(function(elem) {
        return thisUsersExpenses.filter(function(el) {
            return elem === el.value.date ? filteredExpenses.push(el) : "";
        });
    });

    filteredExpenses = filteredExpenses
        .filter(elem => {
            return elem.value.category === category;
        })
        .filter(elem => {
            return Number(elem.value.expense) >= Number(expenseFrom) && Number(elem.value.expense) <= Number(expenseTo);
        });

    return filteredExpenses;
};

// Total loan amount that you need to pay or get paid
export const loanTakenOrGivenAmt = (thisUsersLoans, takenOrGiven) => {
    if (thisUsersLoans.length && takenOrGiven) {
        let loans = thisUsersLoans.filter(
            elem => elem.value.loanType === takenOrGiven && elem.value.status === "Pending"
        );

        return loans.length ? loans.map(elem => Number(elem.value.amount)).reduce((prev, cur) => prev + cur) : 0;
    } else {
        return 0;
    }
};

// get all the dates of a particular monthly

export const getAllTheDatesInAMonth = (selectedYear, selectedMonth) => {
    //var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(Number(selectedYear), Number(selectedMonth), 1);
    var lastDay = new Date(Number(selectedYear), Number(selectedMonth) + 1, 0);

    firstDay = moment(firstDay).format("MM/DD/YYYY");
    lastDay = moment(lastDay).format("MM/DD/YYYY");

    // Returns an array of dates between the two dates
    var getDates = function(startDate, endDate) {
        var dates = [],
            currentDate = startDate,
            addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates.map(date => moment(date).format("MM/DD/YYYY"));
    };

    // Usage
    var dates = getDates(new Date(firstDay), new Date(lastDay));
    //var datesinSelectedMonth = [];
    //dates.map(function (date) {
    //datesinSelectedMonth.push(moment(date).format("MM/DD/YYYY"));
    //});

    return dates;
};

// previous 3 and next 3 years
export const yearsGenereator = () => {
    var defaultYears = [];
    var dateVal = new Date();
    var currentYear = dateVal.getFullYear();
    var cutOffYears = 4; // using 5 years as cutoff as per reports cutoffyears to keep inline
    for (var i = currentYear - cutOffYears; i <= currentYear + cutOffYears; i++) { 
        defaultYears.push(i);
    }

    return defaultYears;
}
