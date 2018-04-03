import React , { Component } from 'react'
import * as firebase from '../../firebase/firebase'
import moment from 'moment'

import EditExpensePopup from './EditExpensePopup';


class ExpenseRow  extends Component {

    constructor(props){
        super(props)

        this.state = {
            showEditPopup : false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    // deleting the expense 
    handleClick(e){
        firebase.db.ref(`expenses/${this.props.expenseId}`).remove()
    }


    toggleEditPopup(e){
        this.setState({
            showEditPopup: !this.state.showEditPopup
        })
        console.log(this.state)
    }

    render(){

        const conditionForDay = this.props.expense.value.day || 
                                    moment(this.props.expense.value.date).day();

        if (conditionForDay){

            var getDay = conditionForDay
            var day;

            switch (getDay) {
                case 0:
                    day = "Sunday";
                    break;
                case 1:
                    day = "Monday";
                    break;
                case 2:
                    day = "Tuesday";
                    break;
                case 3:
                    day = "Wednesday";
                    break;
                case 4:
                    day = "Thursday";
                    break;
                case 5:
                    day = "Friday";
                    break;
                case 6:
                    day = "Saturday";
                    break;
                default : 
                    day = "sunday";
            }
        }

        return (
            <tr key={this.props.expenseId} id={this.props.expenseId}>
                <td data-th="No">{this.props.num + 1}{this.state.showEditPopup ? <EditExpensePopup user={this.props.user} expense={this.props.expense} closePopup={this.toggleEditPopup.bind(this)} /> : null}</td>
                <td data-th="Date">{this.props.expense.value.date} <span className="expense-day"> {day || "Sunday"}</span></td>
                <td data-th="Expense"><i className="fa fa-inr" aria-hidden="true"></i> {this.props.expense.value.expense}</td>
                <td data-th="Category">{this.props.expense.value.category}</td>
                <td data-th="Comments">{this.props.expense.value.comments}</td>
                <td data-th="Edit"><button className="edit-btn" onClick={this.toggleEditPopup.bind(this)}><i className="fa fa-edit" aria-hidden="true"></i> edit</button></td>                
                <td data-th="Delete"><button className="delete-btn" onClick={this.handleClick}><i className="fa fa-trash-o" aria-hidden="true"></i> delete</button></td>
            </tr>
        )
    }
}

export default ExpenseRow