import React, { Component } from "react";

import { JSONToCSVConvertor } from "../Common/ExportToExcel";

class ExportToExcel extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  print() {
    window.print();
  }

  handleClick(event) {
    const expenseData = this.props.excelDataObject;
    const CSVData = expenseData.map((expense) => {
      return {
        Date: expense.date,
        Type: expense.loanType === "Given" ? "Given To" : "Taken From",
        Person: expense.person,
        Amount: expense.amount,
        Reason: expense.reason,
        Status: expense.status,
      };
    });

    return JSONToCSVConvertor(CSVData, this.props.pageTitle, true);
  }

  render() {
    const clickIcon = {
      cursor: "pointer",
    };

    const clickIconPrint = {
      cursor: "pointer",
      marginLeft: "25px",
    };

    return (
      <div>
        <span onClick={this.handleClick} style={clickIcon}>
          <i className="fa fa-file-excel-o" /> Export as excel
        </span>

        <span onClick={this.print} style={clickIconPrint}>
          <i className="fa fa-print" /> Print
        </span>

        <span className="totalRecords">
          {this.props.excelDataObject.length} records
        </span>
      </div>
    );
  }
}

export default ExportToExcel;
