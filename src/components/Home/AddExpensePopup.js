import React , { Component } from 'react'
import AddExpenseForm from './AddExpenseForm';
import * as db from '../../firebase/db'


export default class AddExpensePopup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="popup">
                <div className="popup_inner">
                    <AddExpenseForm />
                    <button id="closePopup" onClick={this.props.closePopup}> X </button>
                </div>
            </div>
        )
    }
}

