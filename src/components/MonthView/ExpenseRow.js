import React, { Component } from 'react'
import * as firebase from '../../firebase/firebase'

class ExpenseRow extends Component {

    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log("clicked", this.props.expenseId)
        firebase.db.ref(`expenses/${this.props.expenseId}`).remove()
    }

    render() {
        return (
            <tr key={this.props.expenseId} id={this.props.expenseId}>
                <td data-th="No">{this.props.num + 1}</td>
                <td data-th="Date">{this.props.expense.value.date}</td>
                <td data-th="Expense">{this.props.expense.value.expense}</td>
                <td data-th="Category">{this.props.expense.value.category}</td>
                <td data-th="Comments">{this.props.expense.value.comments}</td>
                <td data-th="Delete"><button className="delete-btn" onClick={this.handleClick}><i className="fa fa-trash-o" aria-hidden="true"></i> delete</button></td>
            </tr>
        )
    }
}

export default ExpenseRow