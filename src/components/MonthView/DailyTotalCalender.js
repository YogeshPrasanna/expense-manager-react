import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";
import moment from "moment";

import { Link } from "react-router-dom";

const DailyTotalCalender = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;

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

        let totals = {};
        let dayStart = [];
        let dayEnd = [];

        let allDatesInSelectedMonth = utils.getAllTheDatesInAMonth(selectedYear, selectedMonth);
        let TotalInThatDay = allDatesInSelectedMonth.map(date => {
            var expensesOnThatDate = usersExpensesInSelectedMonthAndYear.filter(exp => Number(exp.value.date === date));
            totals[date] =
                expensesOnThatDate.map(elem => Number(elem.value.expense)).length >= 1
                    ? expensesOnThatDate.map(elem => Number(elem.value.expense)).reduce((prev, cur) => prev + cur)
                    : 0;
        });

        const today = moment().format("MM/DD/YYYY");

        const listStyleDateCells = {
            backgroundColor: "#333745",
            padding: "1px",
            margin: "0px",
            display: "inline-block",
            width: "14.285%",
            // border: "1px solid rgba(0,0,0,0.1)",
            textAlign: "center",
            color: "#BEC5AD"
        };

        const listStyleToday = { ...listStyleDateCells, backgroundColor: "#519872", color: "#BEC5AD" };

        const listStyleDayHeaders = {
            ...listStyleDateCells,
            fontSize: "18px",
            border: "1px solid #333745",
            color: "#F7A278"
        };

        const ulStyleCalenderCells = {
            padding: "0px",
            borderRadius: "4px"
        };

        const ulStyleDayHeaders = {
            ...ulStyleCalenderCells,
            marginBottom: "0px"
        };

        const dateArea = { background: "rgba(0,0,0,0.05)", color: "#519872", letterSpacing: "2px", fontSize: "20px" };

        const todayDateArea = { background: "#519872", color: "white", letterSpacing: "2px", fontSize: "20px" };

        for (let i = 0; i < moment(allDatesInSelectedMonth[0]).day(); i++) {
            dayStart.push(i);
        }

        for (
            let i = 0;
            i < Math.abs(moment(allDatesInSelectedMonth[allDatesInSelectedMonth.length - 1]).day() - 6);
            i++
        ) {
            dayEnd.push(i);
        }

        let daysStartGapHtml = dayStart.map(function(elem) {
            return (
                <li key={elem} style={listStyleDateCells}>
                    <div style={dateArea}>
                        {" "}
                        &nbsp; <br />{" "}
                    </div>
                    &nbsp;{" "}
                </li>
            );
        });

        let daysEndGapHtml = dayEnd.map(function(elem) {
            return (
                <li key={elem + 55} style={listStyleDateCells}>
                    <div style={dateArea}>
                        {" "}
                        &nbsp; <br />{" "}
                    </div>
                    &nbsp;{" "}
                </li>
            );
        });

        let printHtml = Object.keys(totals).map((elem, i) => {
            return (
                <Link to={`/daily-view?date=${elem}`}>
                    <li key={elem} style={elem === today ? listStyleToday : listStyleDateCells}>
                        <div style={elem === today ? todayDateArea : dateArea}>
                            {" "}
                            {moment(allDatesInSelectedMonth[i]).date()}
                        </div>{" "}
                        {totals[elem]}{" "}
                    </li>
                </Link>
            );
        });

        return (
            <div>
                <ul style={ulStyleDayHeaders}>
                    <li key="Sun" style={listStyleDayHeaders}>
                        Sun
                    </li>
                    <li key="Mon" style={listStyleDayHeaders}>
                        Mon
                    </li>
                    <li key="Tue" style={listStyleDayHeaders}>
                        Tue
                    </li>
                    <li key="Wed" style={listStyleDayHeaders}>
                        Wed
                    </li>
                    <li key="Thu" style={listStyleDayHeaders}>
                        Thu
                    </li>
                    <li key="Fri" style={listStyleDayHeaders}>
                        Fri
                    </li>
                    <li key="Sat" style={listStyleDayHeaders}>
                        Sat
                    </li>
                </ul>
                <ul style={ulStyleCalenderCells} className="mobileNoPadding">
                    {daysStartGapHtml}
                    {printHtml}
                    {daysEndGapHtml}
                </ul>
            </div>
        );
    }
};

export default DailyTotalCalender;
