import React from 'react'
import { Doughnut } from 'react-chartjs-2'

import * as utils from '../Util'

const DoughnutChart = (props) => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;

    let allCategoryTotals = null;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return <div> Loading ... </div>
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(eachExpense, currentUser, selectedMonth, selectedYear);

        allCategoryTotals = utils.calculateTotalForAllCategories(usersExpensesInSelectedMonthAndYear);

        let data = {
            labels: utils.categories,
            datasets: [{
                data: Object.values(allCategoryTotals),
                backgroundColor: [
                    '#FF965D',
                    '#FFCC78',
                    '#5D574B',
                    '#8DA685',
                    '#00A3EA',
                    '#3EA75E',
                    '#16B498',
                    '#FF1945',
                    '#FF5473',
                    '#927959',
                    '#7E0332',
                    '#872AEF'
                ],
                hoverBackgroundColor: [
                    '#FF965D',
                    '#FFCC78',
                    '#5D574B',
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
            }]
        };

        const options = {
            legend : {
                display: true,
                position: 'top',
                fullWidth: true,
                reverse: false,
            }
        }

        const optionsMobile = {
            legend : {
                display: false
            }
        }

        return (
            <div>
                <Doughnut data={data} options={window.screen.width > 720 ? options : optionsMobile} responsive={true} />
            </div>
        );
    } 
}

export default DoughnutChart