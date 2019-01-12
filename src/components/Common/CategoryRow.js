import React, { Component } from "react";
import * as firebase from "../../firebase/firebase";
import * as utils from "../Util";

import EditCategoryPopup from "./EditCategoryPopup";

class CategoryRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditPopup: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    // deleting the expense
    handleClick(e) {
        var message = "Once deleted you cannot get back this record , are you sure you want to delete";
        if (window.confirm(message)) {
            firebase.db.ref(`categoryTable/${this.props.user.uid}/${this.props.categoryId}`).remove();
        }
    }

    toggleEditPopup(e) {
        this.setState({
            showEditPopup: !this.state.showEditPopup
        });
    }

    render() {

        const lessFont = { fontSize: "15px", float: "right", marginTop: "5px", color: "rgba(255,255,255,.45)" };

        return (
            <tr
                key={this.props.categoryId}
                id={this.props.categoryId}
                // style={utils.categoryName(this.props.category.value.category, "row")}
                style= {{borderLeft: "10px solid" +this.props.category.value.color}}
            >
                <td data-th="No">
                    {this.props.num + 1}
                    {this.state.showEditPopup ? (
                        <EditCategoryPopup
                            user={this.props.user}
                            category={this.props.category}
                            closePopup={this.toggleEditPopup.bind(this)}
                            settings={this.props.settings}
                            convertedCurrency={this.props.convertedCurrency}
                        />
                    ) : null}
                </td>
                
                <td data-th="Category">
                    {this.props.category.value.category}
                </td>
                <td data-th="Color">{this.props.category.value.color} </td>
                <td data-th="Icon">
                    <i
                        className={`fa fa-${utils.categoryIcon(this.props.category.value.icon)}`}
                        style={lessFont}
                        aria-hidden="true"
                    />
                </td>
                <td data-th="Edit">
                    <button className="edit-btn" onClick={this.toggleEditPopup.bind(this)}>
                        <i className="fa fa-edit" aria-hidden="true" /> edit
                    </button>
                </td>
                <td data-th="Delete">
                    <button className="delete-btn" onClick={this.handleClick}>
                        <i className="fa fa-trash-o" aria-hidden="true" /> delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default CategoryRow;
