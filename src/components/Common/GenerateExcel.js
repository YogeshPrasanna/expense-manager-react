import React , { Component } from 'react'
import { default as ExcelFile, ExcelSheet, ExcelColumn } from "react-data-export"

const GenerateExcel = (props) => {
    return (
        <div>
            <span>Export to excel </span>
            <ExcelFile>
                <ExcelSheet data={props.excelDataObject} name="Expenses">
                    <ExcelColumn label="Date" value="date" />
                    <ExcelColumn label="Category" value="category" />
                    <ExcelColumn label="Expense" value="expense" />
                    <ExcelColumn label="Comments" value="comments" />
                </ExcelSheet>
            </ExcelFile>
        </div>
    )
}

export default GenerateExcel 
