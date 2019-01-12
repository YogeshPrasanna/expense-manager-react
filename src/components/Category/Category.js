import React from "react";
import CategoryRow from "../Common/CategoryRow";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Category = props => {
    let categories = props.categories;
    let currentUser = props.authUser;

    if (!categories || !currentUser) {
        return (
            <tr>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
            </tr>
        );
    }

    if (categories && currentUser) {
        let eachCategory = utils.eachCategory(categories);
        let thisUsersCategories = utils.currentUsersCategories(eachCategory, currentUser);

        if (thisUsersCategories.length) {
            return thisUsersCategories.map(function(elem, i) {
                return (
                    <CategoryRow
                        user={props.authUser}
                        category={elem}
                        num={i}
                        key={i}
                        categoryId={thisUsersCategories[i].key}
                        settings={props.settings}
                        convertedCurrency={props.convertedCurrency}
                    />
                );
            });
        } else {
            return (
                <tr>
                    <td>
                        <div className="alert alert-info" role="alert">
                            Start logging your expenses to see your expenses here , add an expense by clicking on the +
                            Button on the bottom right corner of this page
                        </div>
                    </td>
                </tr>
            );
        }
    }
};

export default Category;
