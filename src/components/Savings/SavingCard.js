import React, { Component } from "react";
import * as firebase from "../../firebase/firebase";

import EditSavingPopup from "./EditSavingPopup";

import Loader from "../Common/Loader";
import "./styles/cards.css";
import $ from "jquery";

import moment from "moment";
import { deleteDoc, doc, updateDoc} from "firebase/firestore";

class SavingsCard extends Component {
    constructor(props) {
        super(props);

        this.state = { showEditPopup: false, addSavingAmount: "" };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // deleting the saving
    handleClick(e) {
        var message = "Once deleted you cannot get back this record , are you sure you want to delete";
        if (window.confirm(message)) {
            //firebase.db.ref(`savingsTable/${this.props.authUser.uid}/${this.props.savings.key}`).remove();
            deleteDoc(doc(firebase.db, `savingsTable/${this.props.authUser.uid}/savings`, this.props.savings.key));
        }
    }

    toggleEditPopup(e) {
        this.setState({
            showEditPopup: !this.state.showEditPopup
        });
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(event) {
        event.preventDefault();
        updateDoc(doc(firebase.db, `savingsTable/${this.props.authUser.uid}/savings`, this.props.savings.key), {
            
            savingAmount: Math.ceil(Number(this.props.savings.value.savingAmount) + Number(this.state.addSavingAmount)),
            
        });

        $("#closePopup").click();
    }

    render() {
        const savings = this.props.savings;
        const settings = this.props.settings;
        const currentUser = this.props.authUser;

        if (!savings || !currentUser || !settings) {
            return <Loader />;
        }

        if (savings && currentUser && settings) {
            let img = `url(https://source.unsplash.com/760x320/?${
                savings.value.savingFor.split(" ")[0]
                }) 20% 1% / cover no-repeat`;

            const customLabel = {
                padding: "0 0px 0 10px"
            };
            const customInput = {
                height: "28px"
            };
            return (
                <div className="col-sm-4 col-xs-12" id="saving-card" style={{ display: "inline-block" }}>
                    {this.state.showEditPopup ? (
                        <EditSavingPopup
                            user={this.props.authUser}
                            savings={this.props.savings}
                            closePopup={this.toggleEditPopup.bind(this)}
                            settings={this.props.settings}
                        />
                    ) : null}
                    <div className="img-card card-savings" style={{ border: "none" }}>
                        <div className="wrapper" style={{ background: img }}>
                            "
                            <div className="date">
                                <span className="day">{moment(savings.value.date).date()}</span>
                                <span className="month">
                                    {moment(savings.value.date)
                                        .format("MMMM")
                                        .substr(0, 3)}
                                </span>
                                <span className="year">{moment(savings.value.date).year()}</span>
                            </div>
                            <div className="moreToSaveMsg">
                                <span>
                                    {(savings.value.goalAmount - savings.value.savingAmount)
                                        .toString()
                                        .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}{" "}
                                    more to save
                                </span>
                            </div>
                            <div className="data">
                                <div className="content" style={{ borderLeft: `10px solid ${savings.value.cardColor}` }}>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-xs-6 col-form-label" style={customLabel}>
                                                <span>Add Saving :</span>
                                            </label>
                                            <div className="col-sm-4 col-xs-6">
                                                <input
                                                    className="form-control"
                                                    name="addSavingAmount"
                                                    required
                                                    type="number"
                                                    style={customInput}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                            </div>
                                            <div className="col-sm-1 col-xs-2" style={{ padding: "0" }}>
                                                <button className="save-btn" type="submit">
                                                    <i className="fa fa-save action-icons" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <h1 className="title">
                                        <a href="#">{savings.value.savingFor}</a>
                                    </h1>
                                    <p className="text">{savings.value.comments}</p>
                                    <label htmlFor="show-menu" className="menu-button">
                                        <span />
                                        <button className="edit-btn" onClick={this.toggleEditPopup.bind(this)}>
                                            <i className="fa fa-edit action-icons" aria-hidden="true" />
                                        </button>

                                        <button className="delete-btn" onClick={this.handleClick}>
                                            <i className="fa fa-trash-o" aria-hidden="true" />
                                        </button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default SavingsCard;
