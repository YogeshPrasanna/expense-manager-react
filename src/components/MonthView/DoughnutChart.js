import React from "react";
import { Doughnut } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const DoughnutChart = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;
    let categories = props.categories;
    let allCategoryTotals = null;
    let categoryList = null;
    let categoryColors = null;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear || !categories) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear && categories) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
            eachExpense,
            currentUser,
            selectedMonth,
            selectedYear
        );

        let eachCategories = utils.eachCategory(categories);
        let thisUsersCategories = utils.currentUsersCategories(eachCategories, currentUser);

        allCategoryTotals = utils.calculateTotalForAllCategories(usersExpensesInSelectedMonthAndYear,thisUsersCategories);

        const eachCategory = allCategoryTotals => {
            return Object.keys(allCategoryTotals).map(function(key) {
                return { key: key, value: allCategoryTotals[key] };
            });
        };

        categoryList = eachCategory(allCategoryTotals)
            .filter(el => {
                return el.value > 0;
            })
            .map(el => el.key);

        categoryColors = [];
        categoryList.map(function(category) {
            Object.keys(categories).map(function(key) {
                if(categories[key].category == category){
                    categoryColors.push(categories[key].color);
                }
            }); 
        });
        console.log(categoryColors)

        let data = {
            labels: categoryList,
            datasets: [
                {
                    data: Object.values(allCategoryTotals).filter(el => el > 0),
                    backgroundColor: categoryColors,
                    hoverBackgroundColor: categoryColors
                }
            ]
        };

        const options = {
            legend: { display: true, position: "left", fullWidth: true, reverse: false },
            layout: { padding: { left: 15, right: 85, top: 5, bottom: 5 } }
        };

        const optionsMobile = {
            legend: { display: true, position: "bottom", fullWidth: true },
            layout: { padding: { left: 15, right: 15, top: 15, bottom: 15 } }
        };
        const mobPad15 = { padding: window.screen.width > 720 ? "0" : "15px" };

        return (
            <div>
                <hr />
                <h4 style={mobPad15}>Category Analyser</h4>
                <Doughnut
                    data={data}
                    options={window.screen.width > 720 ? options : optionsMobile}
                    height={window.screen.width > 720 ? 80 : 450}
                    responsive={true}
                />
            </div>
        );
    }
};

export default DoughnutChart;
