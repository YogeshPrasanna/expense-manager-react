import React from "react";
import Loader from "../Common/Loader";
import "./styles/cards.css";

import moment from "moment";

const SavingsCard = props => {
    let savings = props.savings;
    //let settings = props.settings;
    let currentUser = props.authUser;

    if (!savings || !currentUser) {
        return <Loader />;
    }

    if (savings && currentUser) {
        var img = `url(https://source.unsplash.com/760x320/?${
            props.savings.value.savingFor.split(" ")[0]
        }) 20% 1% / cover no-repeat`;

        return (
            <div class="col-sm-4 col-xs-12" style={{ display: "inline-block" }}>
                <div class="img-card card-savings" style={{ border: "none" }}>
                    <div class="wrapper" style={{ background: img }}>
                        "
                        <div class="date">
                            <span class="day">{moment(props.savings.value.date).date()}</span>
                            <span class="month">
                                {moment(props.savings.value.date)
                                    .format("MMMM")
                                    .substr(0, 3)}
                            </span>
                            <span class="year">{moment(props.savings.value.date).year()}</span>
                        </div>
                        <div class="data">
                            <div class="content" style={{ borderLeft: `10px solid ${props.savings.value.cardColor}` }}>
                                {/* <span class="author">Jane Doe</span> */}
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-xs-6 col-form-label">
                                            <span>Add Saving :</span>
                                        </label>
                                        <div className="col-sm-4 col-xs-6">
                                            <input className="form-control" required type="number" name="expense" />
                                        </div>
                                        <div className="col-sm-2 col-xs-2">
                                            {/* <button className="save-btn"> */}
                                            <i className="fa fa-save action-icons" aria-hidden="true" />
                                            {/* </button> */}
                                        </div>
                                    </div>
                                </form>
                                <h1 class="title">
                                    <a href="#">{props.savings.value.savingFor}</a>
                                </h1>
                                <p class="text">{props.savings.value.comments}</p>
                                <label for="show-menu" class="menu-button">
                                    <span />
                                    <i className="fa fa-edit action-icons" aria-hidden="true" />

                                    <button className="delete-btn">
                                        <i className="fa fa-trash-o" aria-hidden="true" />
                                    </button>
                                </label>
                            </div>
                            {/* <input type="checkbox" id="show-menu" />
                            <ul class="menu-content">
                                <li>
                                    <a href="#" class="fa fa-bookmark-o" />
                                </li>
                                <li>
                                    <a href="#" class="fa fa-heart-o">
                                        <span>47</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="fa fa-comment-o">
                                        <span>8</span>
                                    </a>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SavingsCard;
