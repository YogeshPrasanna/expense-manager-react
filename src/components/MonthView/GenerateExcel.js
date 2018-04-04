import React from 'react';
import ExportToExcel from './../Common/ExportToExcel'

import * as utils from '../Util'

const GenerateExcel = (props) => {

    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year

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
                <ExportToExcel excelDataObject={excelDataObject} />
            </div>
        )
    }
}

export default GenerateExcel