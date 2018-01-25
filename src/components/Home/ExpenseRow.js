import React from 'react'

const ExpenseRow = (props) => {

    return (
        <tr key={props.expenseId} id={props.expenseId}>
            <td>{props.num + 1}</td>
            <td>{props.expense.value.date}</td>
            <td>{props.expense.value.expense}</td>
            <td>{props.expense.value.category}</td>
            <td>{props.expense.value.comments}</td>            
        </tr>
    )
}

export default ExpenseRow