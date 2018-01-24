import React from 'react'
import AddExpenseForm from './AddExpenseForm';

const AddExpensePopup = (props) => {
    return (
        <div className="popup">
            <div className="popup_inner">
                <div className="addExpenseHeader"> Add an expense </div> 
                <AddExpenseForm user={props.user} />
                <button id="closePopup" onClick={props.closePopup}> X </button>
            </div>
        </div>
    )
}

export default AddExpensePopup
