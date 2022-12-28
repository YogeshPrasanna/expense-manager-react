import React, { Component } from "react";
import * as firebase from "../../firebase/firebase";

import EditSavingPopup from "./EditSavingPopup";

import Loader from "../Common/Loader";
import "./styles/cards.css";
import $ from "jquery";

import moment from "moment";
import { deleteDoc, doc, updateDoc} from "firebase/firestore";
import { Modal } from "react-bootstrap";
import EditSavingForm from "./EditSavingForm";

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
            
            savingAmount: Number(this.props.savings.value.savingAmount) + Number(this.state.addSavingAmount),
            
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
               
<div className=" col-xl-4 col-md-4 col-sm-6 col-xs-12" id="saving-card" style={{ display: "inline-block" }}>
                    {this.state.showEditPopup ? (
                        <Modal show={this.state.showEditPopup} onHide={this.toggleEditPopup.bind(this)}>
                        <Modal.Header closeButton>
                        <Modal.Title>Edit Saving</Modal.Title>
                        </Modal.Header> 
                        <Modal.Body>
                        <EditSavingForm user={currentUser} savings={savings} settings={settings} />
                        </Modal.Body>
                    </Modal>

                        
                    ) : null}
                    {/** 
                    <div className="img-card card-savings" style={{ border: "none" }}>
                        <div className="wrapper" style={{ background: img }}>
                            "
                            <div className="date">
                                <span>Due to</span>
                                <span className="day">{moment(savings.value.date).date()}</span>
                                <span className="month">
                                    {moment(savings.value.date)
                                        .format("MMMM")
                                        .substr(0, 3)}
                                </span>
                                <span className="year">{moment(savings.value.date).year()}</span>
                            </div>
                            <div className="moreToSaveMsg">
                                

                                {(savings.value.savingAmount >= savings.value.goalAmount)
                                ? <span> Goal is Achieved </span>
                                : <span>{(savings.value.goalAmount - savings.value.savingAmount)
                                    .toString()
                                    .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}{" "}
                                    more to save
                                    </span>
                                    }
                               
                               <div class="progress">
  <div class="progress-bar bg-info" role="progressbar" style={{width:`${savings.value.savingAmount/savings.value.goalAmount *100}%` ,}} 
  >{savings.value.savingAmount} / {savings.value.goalAmount}</div>
</div>
                                   
                            </div>
                            <div className="data">
                                <div className="content" style={{ borderLeft: `10px solid ${savings.value.cardColor}` }}>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-sm-3 col-xs-3 col-form-label" style={customLabel}>
                                                <span>Add Saving :</span>
                                            </label>
                                            <div className="col-md-3 col-sm-2 col-xs-2">
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
                                        <span> {savings.value.savingFor} </span>
                                    </h1>
                                   
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

                    */}
                    <div class="card" >
                            <div class="card-body"  >
                                <h6 class="mb-4">Target date: {moment(savings.value.date).format("DD/MM/yyyy")}</h6>
                                <div class="row d-flex align-items-center">
                                    <div class="col-8">
                                        <h3 class="f-w-300 d-flex align-items-center m-b-0">
                                         {savings.value.savingFor}</h3>
                                        </div>
                                        <div class="col-4 text-right">
                                        {(savings.value.savingAmount >= savings.value.goalAmount)
                                ? <p class="m-b-0"><i className="fa fa-trophy" aria-hidden="true" />Achieved</p>
                                : <span> </span>
                                    }
                                            
                                            </div>
                                            </div>
                                            <div class="progress m-t-30" style={{height: "10px"}}>
                                                <div class="progress-bar progress-c-theme" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: `${savings.value.savingAmount/savings.value.goalAmount *100}%` , background:`${savings.value.cardColor}` }}>
                                                    </div>
                                                    </div>
                                                    <div class="row d-flex align-items-center">
                                    <div class="col-6 text-left">
                                        <p class="m-b-0" style={{color:`${savings.value.cardColor}`}}>Saved: RM {savings.value.savingAmount.toFixed(2)}</p>
                                        </div>
                                        <div class="col-6 text-right" >
                                            <p class="m-b-0">Goal: RM {savings.value.goalAmount.toFixed(2)}</p>
                                            </div>
                                            </div>
                                                    
                                        <form onSubmit={this.handleSubmit} style={{padding: "5px 0 0 0"}}>
                                        <div className="row">
                                            <div className="col-6" >
                                                <input
                                                    className="form-control"
                                                    name="addSavingAmount"
                                                    required
                                                    min = {0.1}
                                                    step = {0.1}
                                                    type="number"
                                                    placeholder="Add Saving"
                                                    style={customInput}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                               
                                            </div>
                                            <div className="col-6" style={{display:"flex" , padding: "5px 0 0 0"}}>
                                           
                                            <button className="smallButton save-btn" type="submit">
                                                    <i className="fa fa-save action-icons" aria-hidden="true" />
                                                </button>
                                            
                                            <button className="smallButton edit-btn" onClick={this.toggleEditPopup.bind(this)}>
                                            <i className="fa fa-edit action-icons" aria-hidden="true" />
                                            </button>     
                                            <button className="smallButton delete-btn" onClick={this.handleClick}>
                                            <i className="fa fa-trash-o" aria-hidden="true" />
                                            </button>

                                            </div>    
                                        </div>
                                        </form>

                                                    
                                                    
                                                    </div>
                                                    </div>


                </div>
               
                
            );
        }
    }
}

export default SavingsCard;
