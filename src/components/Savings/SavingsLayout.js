import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

import SavingsCard from "./SavingCard";

const SavingsLayout = props => {
    const savings = props.savings;
    const settings = props.settings;
    const currentUser = props.authUser;

    if (!savings || !currentUser) {
        return <Loader />;
    }

    if (savings && currentUser) {
        const eachSaving = utils.eachExpense(savings);
        const thisUsersSavings = utils.currentUsersExpenses(eachSaving, currentUser);

        if (thisUsersSavings.length) {
            let abc = thisUsersSavings.map(function (elem, i) {
                return <SavingsCard savings={elem} authUser={currentUser} settings={settings} />;
            });

            return <div className="col-sm-12">{abc}</div>;
        } else {
            return <div>Nothing Found</div>;
        }
    }
};

export default SavingsLayout;
