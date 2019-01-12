import React, { Component } from "react";

import $ from "jquery";

import Loader from "./../Common/Loader";

import * as db from "../../firebase/db";
import { SketchPicker } from "react-color";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/form.css";


class AddCategoryForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: "",
            categoryColor: "",
            categoryIcon: "",
            uid: this.props.user.uid,
            dataSaved: false,
            displayColorPicker: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        db.doCreateCategory(
            this.state.uid,
            this.state.category,
            this.state.categoryColor,
            this.state.categoryIcon
        );
        // reset form once saved
        this.setState({
            category: "",
            categoryColor: "",
            categoryIcon: "",
            uid: this.props.user.uid,
            dataSaved: true,
            displayColorPicker: false
        });
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleClick() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }

    handleClose() {
        this.setState({ displayColorPicker: false });
    }

    handleColorChange(color) {
        this.setState({ categoryColor: color.hex });
    }

    render() {


        if (this.props.settings) {
            const inputNightMode = {
                background: "#2c2b2b",
                color: "#a9a0a0",
                border: "1px solid #9b8c8cc7"
            };

            const inputDayMode = { background: "#fff", color: "#495057" };

            const validationBox = {
                background: "rgba(0,0,0,0)",
                color: "#ffecb8",
                fontSize: "12px",
                width: "60%",
                position: "absolute",
                bottom: "15px",
                left: "15px"
            };

            const color = {
                width: "36px",
                height: "14px",
                borderRadius: "2px",
                background: `${this.state.categoryColor}`
            };
            const swatch = {
                padding: "5px",
                background: "#fff",
                borderRadius: "1px",
                boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                display: "inline-block",
                cursor: "pointer"
            };
            const popover = {
                position: "absolute",
                zIndex: "2"
            };
            const cover = {
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px"
            };

            return (
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Category</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <input
                                className="form-control"
                                required
                                type="text"
                                name="category"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.category}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="" className="col-sm-2 col-xs-6 col-form-label">
                            <span>Color</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            {/* <SketchPicker color={this.state.cardColor} onChangeComplete={this.handleChangeComplete} /> */}
                            <div style={swatch} onClick={this.handleClick}>
                                <div style={color} />
                            </div>
                            {this.state.displayColorPicker ? (
                                <div style={popover}>
                                    <div style={cover} onClick={this.handleClose} />
                                    <SketchPicker
                                        name="categoryColor"
                                        color={this.state.categoryColor}
                                        onChange={this.handleColorChange}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Icon</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <select
                                className="form-control"
                                name="categoryIcon"
                                value={this.state.categoryIcon}
                                onChange={this.handleChange.bind(this)}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            >
                                <option value="Food">Food</option>
                                <option value="Automobile">Automobile</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Travel">Travel</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Personal Care">Personal Care</option>
                                <option value="Investment">Investment</option>
                                <option value="Gifts & Donations">Gifts & Donations</option>
                                <option value="Bills & Utilities">Bills & Utilities</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                    {this.state.dataSaved ? (
                        <span className="bg-success success-msg"> Data saved successfully</span>
                    ) : (
                            <span />
                        )}
                    {this.state.category && this.state.categoryColor && this.state.categoryIcon ? (
                        <button className="btn btn-primary float-right" type="submit">
                            save
                        </button>
                    ) : (
                            <div>
                                <div style={validationBox}>
                                    <div> Category : should be required </div>
                                    <div> Color : should be selected </div>
                                    <div> categoryIcon : should be selected </div>
                                </div>
                                <button className="btn btn-primary float-right" disabled type="submit">
                                    save
                            </button>
                            </div>
                        )}
                </form>
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

export default AddCategoryForm;
