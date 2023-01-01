import React, { Component } from "react";

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
        const CSVData = expenseData.map(expense => {
            return {
                category: expense.category,
                comments: expense.comments,
                date: expense.date,
                expense: expense.expense
            };
        });

        const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            const arrData = typeof JSONData !== "object" ? JSON.parse(JSONData) : JSONData;

            let CSV = "";
            //Set Report title in first row or line

            CSV += ReportTitle + "\r\n\n";

            //This condition will generate the Label/Header
            if (ShowLabel) {
                let row = "";

                //This loop will extract the label from 1st index of on array
                for (let index in arrData[0]) {
                    //Now convert each value to string and comma-seprated
                    row += index + ",";
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + "\r\n";
            }

            //1st loop is to extract each row
            for (let i = 0; i < arrData.length; i++) {
                let row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (let index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + "\r\n";
            }

            if (CSV === "") {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            let fileName = "MyReport_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g, "_");

            //Initialize file format you want csv or xls
            let uri = "data:text/csv;charset=utf-8," + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension

            //this trick will generate a temp <a /> tag
            let link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        return JSONToCSVConvertor(CSVData, this.props.pageTitle, true);
    }

    render() {
        const clickIcon = {
            cursor: "pointer"
        };

        const clickIconPrint = {
            cursor: "pointer",
            marginLeft: "25px"
        };

        return (
            <div>
                <span onClick={this.handleClick} style={clickIcon}>
                    <i className="fa fa-file-excel-o" /> Export as excel
                </span>

                <span onClick={this.print} style={clickIconPrint}>
                    <i className="fa fa-print" /> Print
                </span>

                <span className="totalRecords">{this.props.excelDataObject.length} records</span>
            </div>
        );
    }
}

export default ExportToExcel;
