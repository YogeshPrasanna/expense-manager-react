import React from 'react'
import Expense from './Expense'

const ExpenseTable = (props) => {
    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Expense</th>
                    <th scope="col">Category</th>
                    <th scope="col">Comments</th>                    
                </tr>
            </thead>
            <tbody>
                <Expense expenses={props.expenses} authUser={props.authUser} key={Math.random() * 100}/>
            </tbody>
        </table>
    )
}

export default ExpenseTable;