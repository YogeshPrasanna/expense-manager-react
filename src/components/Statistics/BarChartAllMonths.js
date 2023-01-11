import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";

import "chartjs-plugin-labels";

class BarChartAllMonths extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: new Date().getFullYear().toString(),
    };
  }

  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  render() {
    const expenses = this.props.expenses;
    const currentUser = this.props.authUser;
    const selectedYear = this.state.year;
    const settings = this.props.settings;

    if (!expenses || !currentUser || !settings) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    if (expenses && currentUser && settings) {
      const eachExpense = utils.eachExpense(expenses);
      const allMonthsTotals = utils.totalExpensesInEachMonthOfThisYear(
        expenses,
        eachExpense,
        currentUser,
        selectedYear
      );

      const data = {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUNE",
          "JULY",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            data: allMonthsTotals,
            backgroundColor: "rgb(81, 152, 114)",
            borderColor: "rgb(81, 152, 114)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(66,133,234,0.6)",
            hoverBorderColor: "rgba(66,133,234,1)",
          },
        ],
      };

      const options = {
        legend: {
          display: false,
          labels: {
            fontColor: "rgb(247, 162, 120)",
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
              ticks: {
                fontColor: "rgb(81, 152, 114)",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
              ticks: {
                fontColor: "rgb(81, 152, 114)",
              },
            },
          ],
        },
        plugins: {
          labels: {
            // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
            render: "value",

            // precision for percentage, default is 0
            precision: 0,

            // identifies whether or not labels of value 0 are displayed, default is false
            showZero: true,

            // font size, default is defaultFontSize
            fontSize: 12,

            // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
            fontColor: "rgb(247, 162, 120)",

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
            textMargin: 14,
          },
        },
      };

      const optionsMobile = {
        legend: options.legend,
        plugins: options.plugins,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
              ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90,
                fontColor: "rgb(81, 152, 114)",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
              scaleLabel: {
                display: false,
                labelString: "Normalized/Indexed Data",
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
      };

      const monthDropdown = {
        display: "block",
        background: "#DDDDDD",
        float: "right",
        color: "#000",
        border: "none",
        padding: "0px 5px 0px 0px",
      };

      return (
        <div>
          <div className="row">
            <div className="col-sm-12">
              <form>
                <div className="col-sm-12 col-xs-12">
                  <select
                    name="year"
                    style={monthDropdown}
                    value={this.state.year}
                    onChange={this.handleChange.bind(this)}
                  >
                    {utils.yearsGenereator().map((elem, i) => (
                      <option key={i} value={elem}>
                        {elem}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </div>
          <Bar
            data={data}
            height={window.screen.width > 720 ? 140 : 250}
            options={window.screen.width > 720 ? options : optionsMobile}
            responsive={true}
          />
        </div>
      );
    }
  }
}

export default BarChartAllMonths;
