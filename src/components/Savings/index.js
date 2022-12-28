import React, { Component } from "react";
import Loader from "./../Common/Loader";

import * as db from "../../firebase/db";
import * as analytics from "./../../analytics/analytics";

import SavingsLayout from "./SavingsLayout";
import AddSavingForm from "./AddSavingForm";
import AddSavingsPopup from "./AddSavingsPopup";
import { Modal } from "react-bootstrap";

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

    componentDidMount() {
        analytics.initGA();
        analytics.logPageView();
    }

    render() {
        const styleFromSettings = {
            fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
            backgroundColor: this.props.settings ? (this.props.settings.mode === "night" ? "#484842" : "auto") : "auto",
            minHeight: "91vh"
        };

        let savings = {}
        if(this.props.savings) {
            savings = this.props.savings
        }
        


        if (this.props.settings) {
            return (
                <div>
                    <div className="container-fluid" style={styleFromSettings}>
                        {Object.keys(savings).length !== 0 ? (
                            <div className="row">
                                <SavingsLayout
                                    authUser={this.props.user}
                                    savings={this.props.savings}
                                    settings={this.props.settings}
                                />
                            </div>
                        ) : ( 
                            
                            //add message to tell the user that there is no saving insted of loading page
                            <div className="alert alert-info mb-0 text-center">
                        You haven't create any saving goal , add a saving goal by clicking on the +
                        button on the bottom right corner of this page
                    </div>

                        )}
                        {/* <SavingsLayout
                            authUser={this.props.user}
                            savings={this.props.savings}
                            settings={this.props.settings}
                        /> */}
                    </div>
                    <button className="addloan-btn"  onClick={this.togglePopup.bind(this)} id="addLoan">
                        <i className="fa fa-plus-circle fa-5x" aria-hidden="true" />
                    </button>
                    <Modal show={this.state.showPopup} onHide={this.togglePopup.bind(this)}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Saving</Modal.Title>
                        </Modal.Header> 
                        <Modal.Body>
                        <AddSavingForm
                            user={this.props.user}
                            closePopup={this.togglePopup.bind(this)}
                            settings={this.props.settings}
                        />
                        </Modal.Body>
                    </Modal>

                    {/*this.state.showPopup ? (
                        <AddSavingsPopup
                            user={this.props.user}
                            closePopup={this.togglePopup.bind(this)}
                            settings={this.props.settings}
                        />
                    ) : null*/}

                </div>
            );
        } else {
            return <Loader />;
        }
    }
}

export default SavingsPage;
