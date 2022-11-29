import { db } from "./firebase";
import { collection, addDoc, setDoc, query, getDocs, getDoc, doc } from "firebase/firestore";
//import { add } from "date-fns";

// the user is created as an object with the username and email properties.Furthermore,
// it is stored on the users / ${ id } resource path.
// So whenever you would want to retrieve a specific user from the Firebase database,
// you could get the one user via its unique identifier and the entity resource path.
const doCreateUser = async (id, username, email) =>
    await setDoc(doc(db, "users", id), {
        username: username, 
        email: email,   
      });

// users are retrieved from the general user’s entity resource path.
// The function will return all users from the Firebase realtime database.
const onceGetUsers = async () => await getDocs(collection(db, "users"));

const doCreateExpense = (uid, date, expense, category, comments, day) => {
    addDoc(collection(db, `expenseTable/${uid}/expenses`), {
        uid: uid, 
        date: date,  
        expense: expense,
        category: category,
        comments: comments,
        day: day 
      });
};

// Create an expense table , this happens for first time
const doCreateExpenseTable = (uid, date, expense, category, comments, day, key) => {
    setDoc(doc(db, `expenseTable/${uid}/expenses`, key), {
        uid: uid, 
        date: date,  
        expense: expense,
        category: category,
        comments: comments,
        day: day   
      });
};

// Create an saving table , this happens for first time
const doCreateSavingsTable = (
    uid,
    date,
    goalAmount,
    savingAmount,
    savingFor,
    comments,
    day,
    goalAchieved,
    cardColor,
    key
) => {
    

    setDoc(doc(db, `savingsTable/${uid}/savings`, key), {
        uid: uid, 
        date: date,  
        goalAmount: goalAmount,
        savingAmount: savingAmount,
        savingFor: savingFor,
        comments: comments,
        goalAchieved: goalAchieved,
        cardColor: cardColor,
        day: day
      });
};

const doCreateSaving = (uid, date, goalAmount, savingAmount, savingFor, comments, goalAchieved, cardColor, day) => {
    addDoc(collection(db, `savingsTable/${uid}/savings`), {
        uid: uid, 
        date: date,  
        goalAmount: goalAmount,
        savingAmount: savingAmount,
        savingFor: savingFor,
        comments: comments,
        goalAchieved: goalAchieved,
        cardColor: cardColor,
        day: day
    });
};

const onceGetExpenses = async() => await getDocs(query(collection(db, "expenses")));

const onceGetLoans = async() => await getDocs(query(collection(db, "loans")));

const doCreateLoan = (uid, date, amount, loanType, reason, person, day, status) => {

        addDoc(collection(db, `loanTable/${uid}/loans`), {
            uid: uid, 
            date: date,  
            amount: amount,
            loanType: loanType,
            reason: reason,
            person: person,
            day: day,
            status: status,
        });
};

const doCreateLoanTable = (uid, date, amount, loanType, reason, person, day, status, key) => {
    setDoc(doc(db, `loanTable/${uid}/loans`, key), {
        uid: uid, 
            date: date,  
            amount: amount,
            loanType: loanType,
            reason: reason,
            person: person,
            day: day,
            status: status,
      });
};

const doCreateSettingsForUser = (uid, font, mode, currency, travelMode, fromCurrency, monthLimit, editedCategories) =>
    setDoc(doc(db, "settings", uid), {
        font: font, 
        mode: mode,  
        currency: currency,
        travelMode: travelMode,
        fromCurrency: fromCurrency,
        monthLimit: monthLimit,
        editedCategories: editedCategories,
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
    doCreateSettingsForUser,
    doCreateSavingsTable,
    doCreateSaving
};
