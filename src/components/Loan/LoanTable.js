import React from "react";
import Loans from "./Loans";

import "../../assets/css/table.css";

const LoanTable = (props) => {
  const nightMode = {
    background: props.settings
      ? props.settings.mode === "night"
        ? "#212529"
        : "auto"
      : "auto",
  };

  return (
    <table
      className="table table-striped table-bordered table-dark rwd-table loan-table mobileNoPadding"
      style={nightMode}
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Loan Type</th>
          <th scope="col">Person</th>
          <th scope="col">Reason</th>
          <th scope="col">Status</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <Loans
          loans={props.loans}
          authUser={props.authUser}
          key={Math.random() * 100}
          settings={props.settings}
        />
      </tbody>
    </table>
  );
};

export default LoanTable;
