import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut/index';
import * as routes from '../../constants/routes';

const NavigationAuth = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto float-right">
                    <a className="navbar-brand" href="#">Expense Manager</a>
                    <li className="nav-item"><Link className="nav-link" to={routes.HOME}>Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={routes.ACCOUNT}>Account</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={routes.SIGN_IN}><SignOutButton /></Link></li>
                </ul>
            </div>
        </nav>
    )
}

const NavigationNonAuth = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto float-right">
                    <a className="navbar-brand" href="#">Expense Manager</a>
                    <li className="nav-item"><Link className="nav-link" to={routes.SIGN_IN}>Sign In</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={routes.LANDING}>Landing</Link></li>
                </ul>
            </div>
        </nav>
    )
}

const Navigation = ({ authUser }) => {
    return (
        <div>
            {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </div>
    )
}


export default Navigation;