import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";
import moment from "moment";

import { Link } from "react-router-dom";

const DailyTotalCalender = props => {
    const expenses = props.expenses;
    const currentUser = props.authUser;
    const selectedMonth = props.month;
    const selectedYear = props.year;

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

        let totals = {};
        let dayStart = [];
        let dayEnd = [];

        const allDatesInSelectedMonth = utils.getAllTheDatesInAMonth(selectedYear, selectedMonth);
        // const TotalInThatDay = allDatesInSelectedMonth.map(date => {
        //     let expensesOnThatDate = usersExpensesInSelectedMonthAndYear.filter(exp => Number(exp.value.date === date));
        //     totals[date] =
        //         expensesOnThatDate.map(elem => Number(elem.value.expense)).length >= 1
        //             ? expensesOnThatDate.map(elem => Number(elem.value.expense)).reduce((prev, cur) => prev + cur)
        //             : 0;
        // });

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
        let previDays = [];
        let nextiDays = [];
        for (let i = 0; i < moment(allDatesInSelectedMonth[0]).day(); i++) {
            previDays.push(moment(allDatesInSelectedMonth[0]).subtract(i + 1, 'd').format("MM/DD/YYYY"))
            dayStart.push(i);
        }
        // console.log("%c day start ", "background: red; color: white", previDays)


        for (
            let i = 0;
            i < Math.abs(moment(allDatesInSelectedMonth[allDatesInSelectedMonth.length - 1]).day() - 6);
            i++
        ) {
            nextiDays.push(moment(allDatesInSelectedMonth[allDatesInSelectedMonth.length - 1]).add(i + 1, 'd').format("MM/DD/YYYY"))
            dayEnd.push(i);
        }

        // console.log("%c day end ", "background: blue; color: white", nextiDays)


        // console.log(dayStart, dayEnd)


        let daysStartGapHtml = dayStart.map(function (elem) {
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

        let daysEndGapHtml = dayEnd.map(function (elem) {
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
            let listEle = (
                <li key={elem} style={elem === today ? listStyleToday : listStyleDateCells}>
                    <div style={elem === today ? todayDateArea : dateArea}>
                        {" "}
                        {moment(allDatesInSelectedMonth[i]).date()}
                    </div>{" "}
                    {totals[elem].toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}{" "}
                </li>
            );

            // Links to daily view if total is not 0
            if (totals[elem] != 0) {
                return <Link to={`/daily-view?date=${elem}`} key={elem}>{listEle}</Link>;
            } else {
                return listEle;
            }
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
