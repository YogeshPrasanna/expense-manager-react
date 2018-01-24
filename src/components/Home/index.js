import React , { Component }from 'react';

import ExpenseTable from './ExpenseTable.js'
import AddExpensePopup from './AddExpensePopup';


class HomePage extends Component {

    constructor(props){
        super(props)

        this.state = {
            showPopup: false,
            users: '',
        }
    }

    togglePopup(){
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    render() {
        return(
            <div>
                <div className="col-sm-12">
                    <ExpenseTable expenses={this.props.expenses} authUser={this.props.user}/>                    
                </div>
                <button onClick={this.togglePopup.bind(this)} id="addExpense"> + Add expense </button>
                { this.state.showPopup ? <AddExpensePopup user={this.props.user} closePopup={this.togglePopup.bind(this)}/> : null }
            </div>
        )
    }
} 

export default HomePage;