import React from 'react';
import GenerateExcel from './../Common/GenerateExcel'

import * as utils from '../Util'


const ExportToExcel = (props) => {

    let expenses = props.expenses;
    let currentUser = props.authUser;
    let dateSelected = props.date;

    if (!expenses || !currentUser) {
        return <div> Loading ... </div>
    }

    if (expenses && currentUser) {
        let eachExpense = utils.eachExpense(expenses);
        let thisUsersExpenses = utils.expensesInDate(eachExpense, currentUser, dateSelected)

        var excelDataObject = thisUsersExpenses.map((exp) => exp.value);

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

export default ExportToExcel