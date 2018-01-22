import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut/index';
import * as routes from '../../constants/routes';


const NavigationAuth = () => {
    return (<div className="NavigationBar">
        <ul>
            <li><Link to={routes.LANDING}>Landing</Link></li>
            <li><Link to={routes.HOME}>Home</Link></li>
            <li><Link to={routes.ACCOUNT}>Account</Link></li>
            <li><SignOutButton /></li>
        </ul>
    </div>)
}

const NavigationNonAuth = () => {
    return (<div className="NavigationBar">
        <ul>
            <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
            <li><Link to={routes.LANDING}>Landing</Link></li>
        </ul>
    </div>)
}

const Navigation = ({ authUser }) => {

    console.log(authUser)

    return (
        <div>
            {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </div>
    )
}
    

export default Navigation;