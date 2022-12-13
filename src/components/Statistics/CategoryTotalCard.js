import React, { Component } from "react";
import * as utils from "../Util";
import Loader from "../Common/Loader";

import { Link } from "react-router-dom";

import moment from "moment";
import Trianglify from "trianglify";

class CategoryTotalCard extends Component {
    constructor(props) {
        super(props);

        this.state = { year: moment(new Date()).get("year") };
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    render() {
        const pad0 = {
            padding: "0"
        };

        const category = {
            width: window.screen.width <= 760 ? "46.5%" : "15.8%",
            display: "inline-block",
            margin: "5px",
            color: "#ddd",
            background: "#34495E",
            padding: "5px",
            borderLeft: "5px solid #34495E",
            borderRight: "5px solid #34495E"
        };

        const categoryExpense = {
            fontSize: "25px",
            float: "right",
            paddingRight: "5px"
        };

        const lessFont = {
            fontSize: "15px",
            float: "left",
            marginTop: "10px",
            marginLeft: "5px",
            color: "rgba(255const,255,255,.45)"
        };

        const expenses = this.props.expenses;
        const currentUser = this.props.authUser;
        const selectedYear = this.state.year;
        const settings = this.props.settings;

        let allCategoryTotals = null;
        let categoryList = null;

        const patternconfig = { height: 300, width: 1500, cell_size: 90, x_colors: ['#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#b25ea8', '#f53494'], y_colors: 'match_x'}; // palette: Trianglify.colorbrewer,
        const pattern = Trianglify({ ...patternconfig });
        const card4 = { backgroundImage: `url(${pattern.png()})` };

        const monthDropdown = {
            display: "block",
            background: "#DDDDDD",
            float: "right",
            color: "#000",
            border: "none",
            padding: "0px 5px 0px 0px"
        };

        const formStyle = {
            position: "absolute",
            top: "0",
            padding: "15px",
            right: "-15px",
            zIndex: "9"
        };

        if (!expenses || !currentUser || !settings) {
            return <Loader />;
        }

        if (expenses && currentUser && selectedYear && settings) {
            const eachExpense = utils.eachExpense(expenses);
            const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);

            // dropdown selection all / any year
            if (selectedYear == "all") {
                allCategoryTotals = utils.calculateTotalForAllCategories(thisUsersExpenses);
            } else {
                allCategoryTotals = utils.calculateTotalForAllCategories(
                    utils.expensesinSelectedYear(eachExpense, currentUser, selectedYear.toString())
                );
            }

            const eachCategory = allCategoryTotals => {
                return Object.keys(allCategoryTotals).map(function (key) {
                    return { key: key, value: allCategoryTotals[key] };
                });
            };

            categoryList = eachCategory(allCategoryTotals).map((el, i) => {
                let catName = settings.editedCategories[el.key] ? settings.editedCategories[el.key] : el.key;
                if (el.value) {
                    if (selectedYear === "all") {
                        return (
                            <span style={category} className="ttt" key={el.key}>
                                <div style={utils.categoryName(el.key, "card")}>{catName}</div>
                                <i
                                    className={`fa fa-${utils.categoryIcon(el.key)}`}
                                    style={lessFont}
                                    aria-hidden="true"
                                />
                                <div style={categoryExpense}>
                                    {el.value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </div>
                            </span>
                        );
                    } else {
                        return (
                            <Link key={i} to={`/filter-view?category=${el.key}&selectedYear=${selectedYear}&from=yearpage`}>
                                <span style={category} className="ttt" key={el.key}>
                                    <div style={utils.categoryName(el.key, "card")}>{catName}</div>
                                    <i
                                        className={`fa fa-${utils.categoryIcon(el.key)}`}
                                        style={lessFont}
                                        aria-hidden="true"
                                    />
                                    <div style={categoryExpense}>
                                        {el.value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                    </div>
                                </span>
                            </Link>
                        );
                    }
                } else {
                    return <span key={el.key} />;
                }
            });
        }

        return (
            <div className="col-sm-12" style={pad0}>
                <div className="card card4 mobileNoPadding" style={card4}>
                    <form style={formStyle}>
                        <div className="col-sm-12 col-xs-12">
                            <select
                                name="year"
                                style={monthDropdown}
                                value={this.state.year}
                                onChange={this.handleChange.bind(this)}
                            >
                                <option value="all">All</option>
                                {utils.yearsGenereator().map((elem, i) => (
                                    <option key={i} value={elem}>{elem}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                    <div className="card-block">
                        <h3 className="card-title"><b>Each Category</b></h3>
                        <ul style={pad0}>{categoryList}</ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryTotalCard;
