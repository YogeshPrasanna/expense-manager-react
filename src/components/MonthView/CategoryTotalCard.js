import React from 'react'
import * as utils from '../Util'

const CategoryTotalCard = (props) => {

    const pad0 = {
        "padding": "0"
    }

    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;

    let totalExpenses = 0;
    let allCategoryTotals = null;
    let categoryList = null;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return <div> Loading ... </div>
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(eachExpense, currentUser, selectedMonth, selectedYear);

        allCategoryTotals = utils.calculateTotalForAllCategories(usersExpensesInSelectedMonthAndYear);

        const eachCategory = (allCategoryTotals) => {
            return Object.keys(allCategoryTotals).map(function (key) {
                return { key: key, value: allCategoryTotals[key] };
            });
        }

        categoryList = eachCategory(allCategoryTotals).map((el) => {
            return <li key={el.key}> {el.key} : {el.value}</li>
        })
    }

    return (
        <div className="col-sm-12" style={pad0}>
            <div className="card card1">
                <div className="card-block">
                    <h3 className="card-title"> Each Category</h3>
                    <ul>
                        {categoryList}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CategoryTotalCard
