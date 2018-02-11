import React from 'react'
import * as utils from '../Util'

const CategoryTotalCard = (props) => {

    const pad0 = {
        "padding": "0"
    }

    const category={
        "width": "46.5%",
        "display": "inline-block",
        "margin": "5px",
        "color": "#ddd",
        "background": "#34495E",
        "padding": "5px",
        "borderLeft": "5px solid #34495E",
        "borderRight": "5px solid #34495E"        
    }

    const categoryExpense = {
        "font-size": "25px",
        "float": "right",
        "padding-right": "5px"
    }

    const categoryName = {
        "borderBottom": "5px solid orange"
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
            return (
                <span style={category} className="ttt" key={el.key}> 
                    <div style={categoryName}>{el.key}</div>
                    <div style={categoryExpense}>{el.value}</div>
                </span>
            )
        })
    }

    return (
        <div className="col-sm-12" style={pad0}>
            <div className="card card4">
                <div className="card-block">
                    <h3 className="card-title"> Each Category</h3>
                    <ul style={pad0}>
                        {categoryList}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CategoryTotalCard
