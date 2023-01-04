import React from "react";
import * as utils from "../Util";
import Loader from "../Common/Loader";

const CategoryTotalCard = (props) => {
  const pad0 = {
    padding: "0",
  };

  const category = {
    width: "46.5%",
    display: "inline-block",
    margin: "5px",
    color: "#ddd",
    background: "#34495E",
    padding: "5px",
    borderLeft: "5px solid #34495E",
    borderRight: "5px solid #34495E",
  };

  const categoryExpense = {
    fontSize: "25px",
    float: "right",
    paddingRight: "5px",
  };

  const lessFont = {
    fontSize: "15px",
    float: "left",
    marginTop: "10px",
    marginLeft: "5px",
    color: "rgba(255,255,255,.45)",
  };

  const expenses = props.expenses;
  const currentUser = props.authUser;
  const dateSelected = props.date;
  const cards = props.cards;
  const editedCategories = props.settings.editedCategories;

  let allCategoryTotals = null;
  let categoryList = null;

  if (!expenses || !currentUser || !dateSelected || !editedCategories) {
    return <Loader />;
  }

  if (expenses && currentUser && dateSelected && cards && editedCategories) {
    const eachExpense = utils.eachExpense(expenses);
    const thisUsersExpenses = utils.expensesInDate(
      eachExpense,
      currentUser,
      dateSelected
    );

    allCategoryTotals = utils.calculateTotalForAllCategories(
      thisUsersExpenses,
      editedCategories
    );

    const eachCategory = (allCategoryTotals) => {
      return Object.keys(allCategoryTotals).map(function (key) {
        return { key: key, value: allCategoryTotals[key] };
      });
    };

    categoryList = eachCategory(allCategoryTotals).map((el) => {
      if (el.value) {
        let catName = editedCategories[el.key]
          ? editedCategories[el.key]
          : el.key;
        return (
          <span style={category} className="ttt" key={el.key}>
            <div style={utils.categoryName(el.key, "card")}>{catName}</div>
            <i
              className={`fa fa-${utils.categoryIcon(el.key)}`}
              style={lessFont}
              aria-hidden="true"
            />
            <div style={categoryExpense}>
              {el.value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
            </div>
          </span>
        );
      } else {
        return <span key={el.key} />;
      }
    });
  }

  return (
    <div className="col-sm-12" style={pad0}>
      <div className="card card4 mobileNoPadding" style={cards.card4}>
        <div className="card-block">
          <h3 className="card-title"> Each Category</h3>
          <ul style={pad0}>{categoryList}</ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryTotalCard;
