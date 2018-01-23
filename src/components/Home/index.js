import React , { Component }from 'react';
import AddExpenseForm from './AddExpenseForm';

class Popup extends Component {
    constructor(props){
        super(props);
    }

    render(){
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

class HomePage extends Component {

    constructor(props){
        super(props)

        this.state = {
            showPopup: false
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
                { this.state.showPopup ? <Popup closePopup={this.togglePopup.bind(this)}/> : null }
            </div>
        )
    }
} 

export default HomePage;