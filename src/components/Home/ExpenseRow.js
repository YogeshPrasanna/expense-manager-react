import React , { Component } from 'react'
import * as firebase from '../../firebase/firebase'

class ExpenseRow  extends Component {

    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        console.log("clicked", this.props.expenseId)
        firebase.db.ref(`expenses/${this.props.expenseId}`).remove()
    }

    render(){
        return (
            <tr key={this.props.expenseId} id={this.props.expenseId}>
                <td>{this.props.num + 1}</td>
                <td>{this.props.expense.value.date}</td>
                <td>{this.props.expense.value.expense}</td>
                <td>{this.props.expense.value.category}</td>
                <td>{this.props.expense.value.comments}</td>
                <td><button className="delete-btn" onClick={this.handleClick}><i class="fa fa-trash-o" aria-hidden="true"></i> delete</button></td>
            </tr>
        )
    }
}

export default ExpenseRow