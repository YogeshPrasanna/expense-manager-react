import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";
import "chartjs-plugin-labels";
import { Route } from "react-router-dom";  

class DoughnutChartCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year: "all"
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

        if (!expenses || !currentUser || !settings) {
            return (
                <div>
                    <Loader />
                </div>
            );
        }

        if (expenses && currentUser && selectedYear && settings) {
            const eachExpense = utils.eachExpense(expenses);
            const usersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);

            //allCategoryTotals = utils.calculateTotalForAllCategories(usersExpenses);

            // dropdown selection all / any year
            if (selectedYear == "all") {
                allCategoryTotals = utils.calculateTotalForAllCategories(usersExpenses);
            } else {
                allCategoryTotals = utils.calculateTotalForAllCategories(
                    utils.expensesinSelectedYear(eachExpense, currentUser, selectedYear.toString())
                );
            }

            console.log(Object.keys(settings.editedCategories))


            const names = [
                settings.editedCategories["Food"] ? settings.editedCategories["Food"] : "Food",
                settings.editedCategories["Automobile"] ? settings.editedCategories["Automobile"] : "Automobile",
                settings.editedCategories["Entertainment"] ? settings.editedCategories["Entertainment"] : "Entertainment",
                settings.editedCategories["Clothing"] ? settings.editedCategories["Clothing"] : "Clothing",
                settings.editedCategories["Healthcare"] ? settings.editedCategories["Healthcare"] : "Healthcare",
                settings.editedCategories["Travel"] ? settings.editedCategories["Travel"] : "Travel",
                settings.editedCategories["Shopping"] ? settings.editedCategories["Shopping"] : "Shopping",
                settings.editedCategories["Personal Care"] ? settings.editedCategories["Personal Care"] : "Personal Care",
                settings.editedCategories["Investment"] ? settings.editedCategories["Investment"] : "Investment",
                settings.editedCategories["Gifts & Donations"] ? settings.editedCategories["Gifts & Donations"] : "Gifts & Donations",
                settings.editedCategories["Bills & Utilities"] ? settings.editedCategories["Bills & Utilities"] : "Bills & Utilities",
                settings.editedCategories["Others"] ? settings.editedCategories["Others"] : "Others",
            ];
            const categoryOptions = [];

            for(let i=0; i<names.length; i++){
                categoryOptions.push({name: names[i], id: i});
            }
            let data = {
                labels: names,
                datasets: [
                    {
                        data: Object.values(allCategoryTotals),
                        backgroundColor: utils.categoryColors,
                        hoverBackgroundColor: utils.categoryColors,
                        borderWidth: 1,
                    }
                ]
            };

            const options = {
                legend: { display: true, position: "left", fullWidth: true, reverse: false, labels: { fontColor: "rgb(247, 162, 120)", fontStyle: "italic" } },
                layout: { padding: { left: 0, right: 0, top: 15, bottom: 0 } },
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
                legend: { display: true, position: "left", fullWidth: true, labels: { fontColor: "rgb(247, 162, 120)", fontStyle: "italic" } },
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

            const lineArea = settings.mode === "night" ? { background: window.screen.width > 720 ? "#2C3034" : "#2C3034", padding: 0 } : { background: "#dddddd", padding: 0 };

            return (
                <div style={lineArea}>
                    <div className="col">
                        {/* <form>
                            <div className="col-sm-12 col-xs-12">
                                <div>
                                    <p>
                                        <b style={{ color: settings.mode === "night" ? 'white' : 'black'}}>
                                            Category Filter
                                        </b>
                                    </p>
                                    <Multiselect 
                                                options={categoryOptions}
                                                displayValue="name"
                                                onRemove={(selectedList, selectedItem) => {
                                                    let newData = this.state.donutData;
                                                    newData.datasets[0].data[0] = 0
                                                    this.setState({
                                                        ...this.state,
                                                        donutData: newData 
                                                    })
                                                    console.log("bruh")
                                                    
                                                }}
                                            />
                                </div>
                            </div>
                        </form> */}
                        <form>
                            <div className="col-sm-12 col-xs-12">
                                    <div>
                                        <b style={{ color: settings.mode === "night" ? 'white' : 'black'}}>
                                            Year Filter
                                        </b>
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
                            </div>
                        </form>
                    </div>

                            
                    <Route                
                        render={({ history }) => (
                            <Doughnut
                                data={data}
                                options={window.screen.width > 720 ? options : optionsMobile}
                                height={window.screen.width > 720 ? 140 : 270}
                                responsive={true}
                                onElementsClick={elems => {  
                                    if (elems.length) {
                                        let clickedLabel = elems[0]._model.label;
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
