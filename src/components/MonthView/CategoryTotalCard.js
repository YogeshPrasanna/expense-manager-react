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
        "fontSize": "25px",
        "float": "right",
        "paddingRight": "5px"
    }

    const categoryName = (cat) => {
        switch (cat) {
            case 'Food':
                return { "borderBottom": "5px solid #FF965D"}
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
                    <div style={categoryName(el.key)}>{el.key}</div>
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
