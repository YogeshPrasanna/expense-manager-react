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
            monthLimit: this.props.settings
                ? this.props.settings.monthLimit
                    ? this.props.settings.monthLimit
                    : 15000
                : 15000,
            mode: this.props.settings ? this.props.settings.mode : "day",
            travelMode: this.props.settings
                ? this.props.settings.travelMode
                    ? this.props.settings.travelMode
                    : "off"
                : "off",
            fromCurrency: this.props.settings
                ? this.props.settings.fromCurrency
                    ? this.props.settings.fromCurrency
                    : "Indian Rupees"
                : "Indian Rupees"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        db.doCreateSettingsForUser(
            this.props.user.uid,
            this.state.font,
            this.state.mode,
            this.state.currency,
            this.state.travelMode,
            this.state.fromCurrency,
            this.state.monthLimit
        );

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

            const customLabel = {
                marginLeft: window.screen.width > 720 ? "-50%" : "0"
            };

            const inputNightMode = { background: "#2c2b2b", color: "#a9a0a0", border: "1px solid #9b8c8cc7" };

            const inputDayMode = { background: "#fff", color: "#495057" };

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
                                    style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
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
                                    style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
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
                                <span>Monthly Limit </span>
                            </label>
                            <div className="col-sm-10 col-xs-6">
                                <input
                                    className="form-control"
                                    required
                                    type="number"
                                    name="monthLimit"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.monthLimit}
                                    style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-xs-6 col-form-label" style={white}>
                                <span>Mode</span>
                            </label>
                            <div className="col-sm-4 col-xs-6 switch-field" onChange={this.handleChange.bind(this)}>
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
                        <div className="form-inline row">
                            <label className="col-sm-2 col-xs-6 col-form-label" style={white}>
                                <span style={customLabel}>Travel Mode</span>
                            </label>
                            <div className="col-sm-4 col-xs-6 switch-field" onChange={this.handleChange.bind(this)}>
                                <input
                                    type="radio"
                                    name="travelMode"
                                    value="on"
                                    defaultChecked={this.state.travelMode === "on"}
                                    id="switch_left_travel"
                                />
                                <label for="switch_left_travel">On</label>
                                <input
                                    type="radio"
                                    name="travelMode"
                                    value="off"
                                    defaultChecked={this.state.travelMode === "off"}
                                    id="switch_right_travel"
                                />
                                <label for="switch_right_travel">Off</label>{" "}
                            </div>
                            {this.state.travelMode === "on" ? (
                                <div className="col-sm-6 col-xs-6" onChange={this.handleChange.bind(this)}>
                                    <span>
                                        <select
                                            className="form-control"
                                            name="fromCurrency"
                                            value={this.state.fromCurrency}
                                            onChange={this.handleChange.bind(this)}
                                        >
                                            <option value="Indian Rupees">Indian Rupees</option>
                                            <option value="US Dollars">US Dollars</option>
                                            <option value="Pounds">Pounds</option>
                                            <option value="Yen">Yen</option>
                                            <option value="Euro">Euro</option>
                                        </select>
                                    </span>

                                    <span>
                                        {" "}
                                        <input
                                            type="text"
                                            style={{ width: "40px" }}
                                            className="form-control"
                                            value="to"
                                            disabled
                                        />{" "}
                                    </span>
                                    <span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.currency}
                                            disabled
                                        />
                                    </span>
                                </div>
                            ) : (
                                <div />
                            )}
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
