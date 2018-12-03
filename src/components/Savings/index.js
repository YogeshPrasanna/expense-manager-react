import React, { Component } from "react";
import Loader from "./../Common/Loader";

import * as db from "../../firebase/db";
import * as analytics from "./../../analytics/analytics";

import AddSavingsPopup from "./AddSavingsPopup";

class SavingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = { showPopup: false };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        const styleFromSettings = {
            fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
            backgroundColor: this.props.settings
                ? this.props.settings.mode === "night"
                    ? "#484842"
                    : "#EDF0EF"
                : "#EDF0EF",
            minHeight: "91vh"
        };

        if (this.props.settings) {
            return (
                <div>
                    <div className="container-fluid" style={styleFromSettings}>
                        <div style={{ color: "white" }}>Savings Feature : Coming Soon</div>
                    </div>
                    <button className="addexpense-btn" onClick={this.togglePopup.bind(this)} id="addExpense">
                        <i className="fa fa-plus-circle fa-5x" aria-hidden="true" />
                    </button>
                    {this.state.showPopup ? (
                        <AddSavingsPopup
                            user={this.props.user}
                            closePopup={this.togglePopup.bind(this)}
                            settings={this.props.settings}
                        />
                    ) : null}
                </div>
            );
        } else {
            return <Loader />;
        }
    }
}

export default SavingsPage;
