import React from "react";
import { Doughnut } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";
import "chartjs-plugin-labels";

import { Route } from "react-router-dom";

const DoughnutChart = props => {
    const expenses = props.expenses;
    const currentUser = props.authUser;
    const selectedMonth = props.month;
    const selectedYear = props.year;

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
        const eachExpense = utils.eachExpense(expenses);
        const usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
            eachExpense,
            currentUser,
            selectedMonth,
            selectedYear
        );

        allCategoryTotals = utils.calculateTotalForAllCategories(usersExpensesInSelectedMonthAndYear);

        const eachCategory = allCategoryTotals => {
            return Object.keys(allCategoryTotals).map(function (key) {
                return { key: key, value: allCategoryTotals[key] };
            });
        };

        categoryList = eachCategory(allCategoryTotals)
            .filter(el => {
                return el.value > 0;
            })
            .map(el => el.key);

        categoryColors = categoryList.map(el => utils.getCatColor(el));

        const data = {
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
            layout: { padding: { left: 15, right: 85, top: 5, bottom: 5 } },
            cutoutPercentage: 70,
            plugins: {
                labels: {
                    // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                    render: "percentage",

                    // precision for percentage, default is 0
                    precision: 0,

                    // identifies whether or not labels of value 0 are displayed, default is false
                    showZero: true,

                    // font size, default is defaultFontSize
                    fontSize: 12,

                    // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
                    fontColor: "#000",

                    // font style, default is defaultFontStyle
                    fontStyle: "bold",

                    // font family, default is defaultFontFamily
                    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

                    // draw text shadows under labels, default is false
                    textShadow: true,

                    // text shadow intensity, default is 6
                    shadowBlur: 10,

                    // text shadow X offset, default is 3
                    shadowOffsetX: -5,

                    // text shadow Y offset, default is 3
                    shadowOffsetY: 5,

                    // text shadow color, default is 'rgba(0,0,0,0.3)'
                    shadowColor: "rgba(255,0,0,0.75)",

                    // draw label in arc, default is false
                    // bar chart ignores this
                    arc: true,

                    // position to draw label, available value is 'default', 'border' and 'outside'
                    // bar chart ignores this
                    // default is 'default'
                    position: "inside",

                    // draw label even it's overlap, default is true
                    // bar chart ignores this
                    overlap: false,

                    // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
                    showActualPercentages: true,

                    // add padding when position is `outside`
                    // default is 2
                    outsidePadding: 4,

                    // add margin of text when position is `outside` or `border`
                    // default is 2
                    textMargin: 14
                }
            }
        };

        const optionsMobile = {
            legend: { display: true, position: "bottom", fullWidth: true },
            layout: { padding: { left: 15, right: 15, top: 15, bottom: 15 } },
            cutoutPercentage: 0,
            plugins: {
                labels: {
                    // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                    render: "percentage",

                    // precision for percentage, default is 0
                    precision: 0,

                    // identifies whether or not labels of value 0 are displayed, default is false
                    showZero: true,

                    // font size, default is defaultFontSize
                    fontSize: 12,

                    // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
                    fontColor: "#000",

                    // font style, default is defaultFontStyle
                    fontStyle: "normal",

                    // font family, default is defaultFontFamily
                    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

                    // draw text shadows under labels, default is false
                    textShadow: true,

                    // text shadow intensity, default is 6
                    shadowBlur: 10,

                    // text shadow X offset, default is 3
                    shadowOffsetX: -5,

                    // text shadow Y offset, default is 3
                    shadowOffsetY: 5,

                    // text shadow color, default is 'rgba(0,0,0,0.3)'
                    shadowColor: "rgba(255,0,0,0.75)",

                    // draw label in arc, default is false
                    // bar chart ignores this
                    arc: true,

                    // position to draw label, available value is 'default', 'border' and 'outside'
                    // bar chart ignores this
                    // default is 'default'
                    position: "inside",

                    // draw label even it's overlap, default is true
                    // bar chart ignores this
                    overlap: false,

                    // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
                    showActualPercentages: true,

                    // add padding when position is `outside`
                    // default is 2
                    outsidePadding: 4,

                    // add margin of text when position is `outside` or `border`
                    // default is 2
                    textMargin: 4
                }
            }
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
                            height={window.screen.width > 720 ? 80 : 350}
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
