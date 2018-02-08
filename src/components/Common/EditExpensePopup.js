import React from 'react'
import EditExpenseForm from './EditExpenseForm';

const EditExpensePopup = (props) => {
    return (
        <div className="popup">
            <div className="popup_inner">
                <div className="addExpenseHeader"> Edit expense </div>
                <EditExpenseForm user={props.user} expense={props.expense}/>
                <button id="closePopup" onClick={props.closePopup}> X </button>
            </div>
        </div>
    )
}

export default EditExpensePopup
