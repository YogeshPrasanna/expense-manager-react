import React, { Component } from 'react';
import { default as ExcelFile, ExcelSheet, ExcelColumn} from "react-data-export"

import * as utils from '../Util'

class ExportToExcel extends Component {
    constructor(props){
        super(props)
    }

    render() {

        let expenses = this.props.expenses;
        let currentUser = this.props.authUser;
        let startDate = this.props.fromdate;
        let endDate = this.props.todate;
        let expenseFrom = this.props.expensefrom;
        let expenseTo = this.props.expenseto;
        let category = this.props.category;

        if (!expenses || !currentUser) {
            return <div> Loading ... </div>
        }

        if (expenses && currentUser && startDate && endDate && expenseFrom && expenseTo && category) {
            let eachExpense = utils.eachExpense(expenses)
            let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser)
            let filteredExpenses = utils.filterExpensesByCriteria(startDate, endDate, category, expenseFrom, expenseTo, thisUsersExpenses)

            var excelDataObject = filteredExpenses.map((exp) => exp.value);

            let exportArea = {
                "backgroundColor": "#324858",
                "color": "#DEDA54",
                "padding": "10px",
                "borderRadius": "5px",
                "marginTop": "15px"
            }

            return (
                <div className="col-sm-12" style={exportArea}>
                    <span>Export to excel </span>
                    <ExcelFile>
                        <ExcelSheet data={excelDataObject} name="Expenses">
                            <ExcelColumn label="Date" value="date" />
                            <ExcelColumn label="Category" value="category" />
                            <ExcelColumn label="Expense" value="expense" />
                            <ExcelColumn label="Comments" value="comments" />
                        </ExcelSheet>
                    </ExcelFile>
                </div>
            )
        }
    }
}

export default ExportToExcel