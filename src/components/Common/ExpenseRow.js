import React , { Component } from 'react'
import * as firebase from '../../firebase/firebase'
import moment from 'moment'

class ExpenseRow  extends Component {

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    // deleting the expense 
    handleClick(e){
        firebase.db.ref(`expenses/${this.props.expenseId}`).remove()
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
            }
        }
        

        return (
            <tr key={this.props.expenseId} id={this.props.expenseId}>
                <td data-th="No">{this.props.num + 1}</td>
                <td data-th="Date">{this.props.expense.value.date} <span className="right"> {day || "Sunday"}</span></td>
                <td data-th="Expense">{this.props.expense.value.expense}</td>
                <td data-th="Category">{this.props.expense.value.category}</td>
                <td data-th="Comments">{this.props.expense.value.comments}</td>
                <td data-th="Delete"><button className="delete-btn" onClick={this.handleClick}><i className="fa fa-trash-o" aria-hidden="true"></i> delete</button></td>
            </tr>
        )
    }
}

export default ExpenseRow