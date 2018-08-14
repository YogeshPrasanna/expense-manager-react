import React, { Component } from "react";
import Loader from "./../Common/Loader";

import * as db from "../../firebase/db";
import * as analytics from "./../../analytics/analytics";

class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            font: this.props.settings ? this.props.settings.font : "sans-serif",
            dataSaved: false,
            currency: this.props.settings
                ? this.props.settings.currency
                    ? this.props.settings.currency
                    : "Indian Rupees"
                : "Indian Rupees",
            mode: this.props.settings ? this.props.settings.mode : "day"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        db.doCreateSettingsForUser(this.props.user.uid, this.state.font, this.state.mode, this.state.currency);

        // reset form once saved
        // this.setState({ font: "Dhurjati", dataSaved: true, mode: "day" });
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    componentDidMount() {
        analytics.initGA();
        analytics.logPageView();
    }

    render() {
        if (this.props.settings) {
            const styleFromSettings = {
                fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
                backgroundColor: this.props.settings
                    ? this.props.settings.mode === "night"
                        ? "#484842"
                        : "#EDF0EF"
                    : "#EDF0EF",
                minHeight: "91vh"
            };

            const white = {
                color: this.props.settings ? (this.props.settings.mode === "night" ? "#fff" : "#000") : "#000"
            };

            return (
                <div className="container-fluid" style={styleFromSettings}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label className="col-sm-2 col-xs-6 col-form-label" style={white}>
                                <span>Font</span>
                            </label>
                            <div className="col-sm-10 col-xs-6">
                                <select
                                    className="form-control"
                                    name="font"
                                    value={this.state.font}
                                    onChange={this.handleChange.bind(this)}
                                >
                                    <option value="Dhurjati">Dhurjati</option>
                                    <option value="sans-serif">sans-serif</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Ubuntu">Ubuntu</option>
                                    <option value="Exo 2">Exo 2</option>
                                    <option value="Lobster">Lobster</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-xs-6 col-form-label" style={white}>
                                <span>Select Currency</span>
                            </label>
                            <div className="col-sm-10 col-xs-6">
                                <select
                                    className="form-control"
                                    name="currency"
                                    value={this.state.currency}
                                    onChange={this.handleChange.bind(this)}
                                >
                                    <option value="Indian Rupees">Indian Rupees</option>
                                    <option value="US Dollars">US Dollars</option>
                                    <option value="Pounds">Pounds</option>
                                    <option value="Yen">Yen</option>
                                    <option value="Euro">Euro</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-xs-6 col-form-label" style={white}>
                                <span>Mode</span>
                            </label>
                            <div className="col-sm-10 col-xs-6 switch-field" onChange={this.handleChange.bind(this)}>
                                <input
                                    type="radio"
                                    name="mode"
                                    value="day"
                                    defaultChecked={this.state.mode === "day"}
                                    id="switch_left"
                                />
                                <label for="switch_left">Day</label>
                                <input
                                    type="radio"
                                    name="mode"
                                    value="night"
                                    defaultChecked={this.state.mode === "night"}
                                    id="switch_right"
                                />
                                <label for="switch_right">Night</label>{" "}
                            </div>
                        </div>

                        {this.state.dataSaved ? (
                            <span className="bg-success success-msg"> Data saved successfully</span>
                        ) : (
                            <span />
                        )}
                        <button className="btn btn-primary float-right" type="submit">
                            save
                        </button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <Loader />
                </div>
            );
        }
    }
}

export default SettingsPage;
