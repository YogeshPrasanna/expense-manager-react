import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

import SavingsCard from "./SavingCard";

const SavingsLayout = props => {
    let savings = props.savings;
    let settings = props.settings;
    let currentUser = props.authUser;

    if (!savings || !currentUser) {
        return <Loader />;
    }

    if (savings && currentUser) {
        let eachSaving = utils.eachExpense(savings);
        let thisUsersSavings = utils.currentUsersExpenses(eachSaving, currentUser);

        if (thisUsersSavings.length) {
            var abc = thisUsersSavings.map(function(elem, i) {
                console.log("from inside map : ", elem, currentUser);
                return <SavingsCard savings={elem} authUser={currentUser} settings={settings} />;
            });

            return <div class="col-sm-12">{abc}</div>;
        } else {
            return <div>Nothing Found</div>;
        }
    }
};

export default SavingsLayout;
