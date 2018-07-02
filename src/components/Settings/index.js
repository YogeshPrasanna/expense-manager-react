import React, { Component } from "react";

import * as db from "../../firebase/db";

class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            font: this.props.settings ? this.props.settings.font : "sans-serif",
            dataSaved: false,
            mode: this.props.settings ? this.props.settings.mode : "day"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        db.doCreateSettingsForUser(this.props.user.uid, this.state.font, this.state.mode);

        console.log("state from submit : ", this.state);

        // reset form once saved
        // this.setState({ font: "Dhurjati", dataSaved: true, mode: "day" });
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);

        console.log("state from change : ", this.state);
    }

    render() {
        const marR15 = {
            marginRight: "15px"
        };
        const marR5 = { marginRight: "5px" };

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
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
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Mode</span>
                        </label>
                        <div className="col-sm-10 col-xs-6" onChange={this.handleChange.bind(this)}>
                            <input
                                type="radio"
                                name="mode"
                                value="day"
                                defaultChecked={this.state.mode === "day"}
                                style={marR5}
                            />
                            <label style={marR15}>Day</label>
                            <input
                                type="radio"
                                name="mode"
                                value="night"
                                defaultChecked={this.state.mode === "night"}
                                style={marR5}
                            />
                            <label style={marR15}>Night</label>{" "}
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
    }
}

export default SettingsPage;
