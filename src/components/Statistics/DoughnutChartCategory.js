import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";

import { Route } from "react-router-dom";

class DoughnutChartCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year: "all"
        };
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    render() {
        let expenses = this.props.expenses;
        let currentUser = this.props.authUser;
        let selectedYear = this.state.year;

        let allCategoryTotals = null;

        const monthDropdown = {
            display: "block",
            background: "#DDDDDD",
            float: "right",
            color: "#000",
            border: "none",
            padding: "0px 5px 0px 0px"
        };

        const formStyle = { position: "absolute", top: "0", padding: "15px", right: "-15px", zIndex: "9" };

        if (!expenses || !currentUser) {
            return (
                <div>
                    <Loader />
                </div>
            );
        }

        if (expenses && currentUser && selectedYear) {
            let eachExpense = utils.eachExpense(expenses);
            let usersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);

            //allCategoryTotals = utils.calculateTotalForAllCategories(usersExpenses);

            // dropdown selection all / any year
            if (selectedYear == "all") {
                allCategoryTotals = utils.calculateTotalForAllCategories(usersExpenses);
            } else {
                allCategoryTotals = utils.calculateTotalForAllCategories(
                    utils.expensesinSelectedYear(eachExpense, currentUser, selectedYear.toString())
                );
            }

            let data = {
                labels: utils.categories,
                datasets: [
                    {
                        data: Object.values(allCategoryTotals),
                        backgroundColor: utils.categoryColors,
                        hoverBackgroundColor: utils.categoryColors
                    }
                ]
            };

            const options = {
                legend: { display: true, position: "left", fullWidth: true, reverse: false },
                layout: { padding: { left: 0, right: 0, top: 15, bottom: 0 } }
            };

            const optionsMobile = {
                legend: { display: true, position: "bottom", fullWidth: true },
                layout: { padding: { left: 15, right: 15, top: 15, bottom: 15 } }
            };

            return (
                <div>
                    <form>
                        <div className="col-sm-12 col-xs-12">
                            <select
                                name="year"
                                style={monthDropdown}
                                value={this.state.year}
                                onChange={this.handleChange.bind(this)}
                            >
                                <option value="all">All</option>
                                {utils.yearsGenereator().map(elem => (
                                    <option value={elem}>{elem}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                    <Route
                        render={({ history }) => (
                            <Doughnut
                                data={data}
                                options={window.screen.width > 720 ? options : optionsMobile}
                                height={window.screen.width > 720 ? 140 : 450}
                                responsive={true}
                                onElementsClick={elems => {
                                    if (elems) {
                                        const clickedLabel = elems[0]._model.label;
                                        if (selectedYear !== "all") {
                                            history.push(
                                                `/filter-view?category=${clickedLabel}&selectedYear=${selectedYear}&from=yearpage`
                                            );
                                        }
                                    }
                                }}
                            />
                        )}
                    />
                </div>
            );
        }
    }
}

export default DoughnutChartCategory;
