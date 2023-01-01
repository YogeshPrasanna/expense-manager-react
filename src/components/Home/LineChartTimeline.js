import React from "react";
import { Line } from "react-chartjs-2";
import * as utils from "../Util";
import moment from "moment";

const LineChartExpenseTimeline = (props) => {
  let expenses = props.expenses;
  let currentUser = props.authUser;
  let selectedMonth = moment(new Date()).get("month").toString();
  let selectedYear = moment(new Date()).get("year").toString();

  if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
    return <span />;
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

    const data = {
      labels: Object.keys(totals).map((date) => date.substr(3, 2)),
      datasets: [
        {
          data: Object.values(totals),
          borderColor: "transparent",
          backgroundColor: "rgb(0,0,0,0.15)",
          pointBackgroundColor: "rgba(0,0,0,0)",
          pointBorderColor: "rgba(0,0,0,0)",
          borderWidth: 4,
        },
      ],
    };

    const lineArea = {
      background: "rgba(0,0,0,0)",
      position: "absolute",
      top: "20%",
      left: "3%",
    };

    const options = {
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    };

    return (
      <div>
        <div className="col-sm-12" style={lineArea}>
          {" "}
          <Line
            data={data}
            options={options}
            responsive={true}
            height={window.screen.width > 1024 ? 120 : 0}
          />
        </div>
      </div>
    );
  }
};

export default LineChartExpenseTimeline;
