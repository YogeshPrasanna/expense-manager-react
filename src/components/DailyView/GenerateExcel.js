import React from 'react';
import ExportToExcel from './../Common/ExportToExcel'

import * as utils from '../Util'


const GenerateExcel = (props) => {

    let expenses = props.expenses;
    let currentUser = props.authUser;
    let dateSelected = props.date;

    if (!expenses || !currentUser) {
        return <div> Loading ... </div>
    }

    if (expenses && currentUser) {
        let eachExpense = utils.eachExpense(expenses);
        let thisUsersExpenses = utils.expensesInDate(eachExpense, currentUser, dateSelected)
        let excelDataObject = thisUsersExpenses.map((exp) => exp.value);

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