import React from "react";
import Category from "./Category";

import "../../assets/css/table.css";

const CategoryTable = props => {
    const nightMode = { background: props.settings ? (props.settings.mode === "night" ? "#212529" : "auto") : "auto" };

    return (
        <table
            className="table table-striped table-bordered table-dark rwd-table expense-table mobileNoPadding"
            style={nightMode}
        >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category</th>
                    <th scope="col">Color</th>
                    <th scope="col">Icon</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <Category
                    categories={props.categories}
                    authUser={props.authUser}
                    key={Math.random() * 100}
                    settings={props.settings}
                    convertedCurrency={props.convertedCurrency}
                />
            </tbody>
        </table>
    );
};

export default CategoryTable;
