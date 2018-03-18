import React from 'react'
import { Bar } from 'react-chartjs-2'

import * as utils from '../Util'

const BarChartAllMonths = (props) => {
    let expenses = props.expenses;
    let currentUser = props.authUser;

    let allCategoryTotals = null;

    if (!expenses || !currentUser) {
        return <div> Loading ... </div>
    }

    if (expenses && currentUser) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);

        let allMonthsTotals = utils.totalExpensesInEachMonthOfThisYear(expenses, eachExpense, currentUser);

        let data = {
            labels: ["JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"],
            datasets: [{
                data: allMonthsTotals,
                backgroundColor: 'rgba(66,133,234,0.8)',
                borderColor: 'rgba(66,133,234,1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(66,133,234,0.6)',
                hoverBorderColor: 'rgba(66,133,234,1)',
            }]
        };

        const options = {
            legend: {
                display: false,
            }
        }

        return (
            <div>
                <Bar data={data} options={options} responsive={true} />
            </div>
        );
    }
}

export default BarChartAllMonths