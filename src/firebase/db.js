import { db } from "./firebase";

// the user is created as an object with the username and email properties.Furthermore,
// it is stored on the users / ${ id } resource path.
// So whenever you would want to retrieve a specific user from the Firebase database,
// you could get the one user via its unique identifier and the entity resource path.
const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email
    });

// users are retrieved from the general user’s entity resource path.
// The function will return all users from the Firebase realtime database.
const onceGetUsers = () => db.ref("users").once("value");

const doCreateExpense = (uid, date, expense, category, comments, day) => {
    db.ref(`expenseTable/${uid}`)
        .push()
        .set({ uid, date, expense, category, comments, day });
};

// Create an expense table , this happens for first time
const doCreateExpenseTable = (uid, date, expense, category, comments, day, key) => {
    db.ref(`expenseTable/${uid}/${key}`).set({
        uid,
        date,
        expense,
        category,
        comments,
        day
    });
};

const onceGetExpenses = () => db.ref("expenses").once("value");

const onceGetLoans = () => db.ref("loans").once("value");

const doCreateLoan = (uid, date, amount, loanType, reason, person, day, status) => {
    db.ref(`loanTable/${uid}`)
        .push()
        .set({
            uid,
            date,
            amount,
            loanType,
            reason,
            person,
            day,
            status
        });
};

const doCreateLoanTable = (uid, date, amount, loanType, reason, person, day, status, key) => {
    db.ref(`loanTable/${uid}/${key}`).set({ uid, date, amount, loanType, reason, person, day, status });
};

const doCreateSettingsForUser = (uid, font, mode, currency, travelMode, fromCurrency) =>
    db.ref(`settings/${uid}`).set({
        font,
        mode,
        currency,
        travelMode,
        fromCurrency
    });

//  const expensesRef = db.ref('expenses')
//     expensesRef.on('child_removed', function (data) {
//         console.log("child_removed")
//     });

// const allExpenses = () => {
//     return onceGetExpenses().then((data) => {
//          console.log(data.val())
//         }).catch(error => {
//             console.log(error)
//         });
// }

export {
    doCreateUser,
    onceGetUsers,
    doCreateExpense,
    doCreateExpenseTable,
    onceGetExpenses,
    onceGetLoans,
    doCreateLoan,
    doCreateLoanTable,
    doCreateSettingsForUser
};
