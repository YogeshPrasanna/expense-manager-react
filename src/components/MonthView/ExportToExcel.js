import React, { Component } from 'react';
import GenerateExcel from './../Common/GenerateExcel'

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
                    <GenerateExcel excelDataObject={excelDataObject} />
                </div>
            )
        }
    }
}

export default ExportToExcel