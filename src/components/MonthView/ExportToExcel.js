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
        let selectedMonth = this.props.month;
        let selectedYear = this.props.year

        if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
            return <div> Loading ... </div>
        }

        if (expenses && currentUser && selectedMonth && selectedYear) {
            let eachExpense = utils.eachExpense(expenses);
            let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(eachExpense, currentUser, selectedMonth, selectedYear);

            var excelDataObject = usersExpensesInSelectedMonthAndYear.map((exp) => exp.value);

            let exportArea = {
                "backgroundColor": "#324858",
                "color": "#DEDA54",
                "padding": "10px",
                "borderRadius": "5px"
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