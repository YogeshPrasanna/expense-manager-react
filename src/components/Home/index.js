import React , { Component }from 'react';

import AddExpensePopup from './AddExpensePopup';

class HomePage extends Component {

    constructor(props){
        super(props)

        this.state = {
            showPopup: false,
            users: ''
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
                <button onClick={this.togglePopup.bind(this)} id="addExpense"> + Add expense </button>
                { this.state.showPopup ? <AddExpensePopup closePopup={this.togglePopup.bind(this)}/> : null }
            </div>
        )
    }
} 

export default HomePage;