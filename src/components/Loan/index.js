import React, { Component } from "react";
import AddLoanPopup from "./AddLoanPopup";
import LoanTable from "./LoanTable";
import GenerateExcel from "./GenerateExcel";
import Cards from "./Cards";
import Loader from "./../Common/Loader";
import BarChartAllMonths from "./BarChartAllMonths";

import * as analytics from "./../../analytics/analytics";

class LoanPage extends Component {
    constructor(props) {
        super(props);

        this.state = { showPopup: false };
        this.state.search = "";
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

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    filterLoan() {
        if(this.state.search == "" && this.props.loans) {
            return this.props.loans;
        } else if (this.state.search != "") {
            var loans = Object.values(this.props.loans)
            return loans.filter((loan) => {
                return (loan.person.toLowerCase().includes(this.state.search.toLowerCase()) || loan.reason.toLowerCase().includes(this.state.search.toLowerCase()))
            });
        }
    }

    render() {
        const styleFromSettings = {
            fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
            backgroundColor: this.props.settings ? (this.props.settings.mode === "night" ? "#484842" : "auto") : "auto",
            minHeight: "91vh"
        };

        if (this.props.settings && this.props.cards) {
            return (
                <div className="container-fluid" style={styleFromSettings}>
                    <div className="row align-items-center">
                        <div className="col-sm-3 mobileNoPadding">
                            <Cards
                                loans={this.props.loans}
                                authUser={this.props.user}
                                settings={this.props.settings}
                                cards={this.props.cards}
                            />
                        </div>
                        <div className="col-sm-9 mobileNoPadding">
                            <BarChartAllMonths 
                                loans={this.props.loans} 
                                authUser={this.props.user} 
                                settings={this.props.settings} 
                            />
                        </div>
                    </div>
                    <div className="row">
                    <div className="form-group row">
                        <div className="col-6 col-sm-3">
                            <input
                                type="text"
                                name="search"
                                maxLength={50}
                                value={this.state.search}
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                    </div>
                        <div className="col-sm-12 mobileNoPadding">
                            <GenerateExcel
                                loans={this.props.loans}
                                authUser={this.props.user}
                                settings={this.props.settings}
                            />
                            <LoanTable
                                loans={this.filterLoan()}
                                authUser={this.props.user}
                                settings={this.props.settings}
                            />
                        </div>
                    </div>

                    <button className="addloan-btn" onClick={this.togglePopup.bind(this)} id="addLoan">
                        <i className="fa fa-plus-circle fa-5x" aria-hidden="true" />
                    </button>

                    {this.state.showPopup ? (
                        <AddLoanPopup
                            user={this.props.user}
                            closePopup={this.togglePopup.bind(this)}
                            settings={this.props.settings}
                        />
                    ) : null}
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

export default LoanPage;
