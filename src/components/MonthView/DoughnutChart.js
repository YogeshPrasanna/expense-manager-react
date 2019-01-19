import React from "react";
import { Doughnut } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";

import { Route } from "react-router-dom";

const DoughnutChart = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;

    let allCategoryTotals = null;
    let categoryList = null;
    let categoryColors = null;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
            eachExpense,
            currentUser,
            selectedMonth,
            selectedYear
        );

        allCategoryTotals = utils.calculateTotalForAllCategories(usersExpensesInSelectedMonthAndYear);

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

        categoryColors = categoryList.map(el => utils.getCatColor(el));

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
                <Route
                    render={({ history }) => (
                        <Doughnut
                            data={data}
                            options={window.screen.width > 720 ? options : optionsMobile}
                            height={window.screen.width > 720 ? 80 : 450}
                            responsive={true}
                            onElementsClick={elems => {
                                if (elems.length) {
                                    const clickedLabel = elems[0]._model.label;
                                    history.push(
                                        `/filter-view?category=${clickedLabel}&selectedMonth=${selectedMonth}&selectedYear=${selectedYear}&from=monthpage`
                                    );
                                }
                            }}
                        />
                    )}
                />
            </div>
        );
    }
};

export default DoughnutChart;
