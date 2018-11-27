import React, { Component } from "react";
import Loader from "./../Common/Loader";

import * as db from "../../firebase/db";
import * as analytics from "./../../analytics/analytics";

class SavingsPage extends Component {
    constructor(props) {
        super(props);
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
                </div>
            );
        } else {
            return <Loader />;
        }
    }
}

export default SavingsPage;
