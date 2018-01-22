import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import { firebase } from '../firebase/index'
import '../assets/css/index.css'
import '../assets/css/signin.css'


import Navigation from './Navigation/index';
import LandingPage from './Landing/index';
import SignUpPage from './signUp/index';
import SignInPage from './signIn/index';
import PasswordForgetPage from './forgotPassword/index';
import HomePage from './Home/index';
import AccountPage from './Account/index';

import * as routes from '../constants/routes';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };

        console.log("state" , this.state.authUser)
    }

    componentDidMount(){
        firebase.auth.onAuthStateChanged(authUser => {
            this.setState({
                authUser: authUser
            })
            // return authUser ? this.setState(() => { authUser: authUser}) : this.setState(() => ({authUser: null}))
        });
    }
    

    render() {

        const bodyStyle = {
            "backgroundColor": "#ecf0f1",
            "height": '100vh',
        }

        return (
            <Router>
                <div style={bodyStyle}>
                    <Navigation authUser={this.state.authUser}/>

                    <Route
                        exact path={routes.LANDING}
                        component={() => <LandingPage />}
                    />
                    <Route
                        exact path={routes.SIGN_UP}
                        component={() => <SignUpPage />}
                    />
                    <Route
                        exact path={routes.SIGN_IN}
                        component={() => <SignInPage />}
                    />
                    <Route
                        exact path={routes.PASSWORD_FORGET}
                        component={() => <PasswordForgetPage />}
                    />
                    <Route
                        exact path={routes.HOME}
                        component={() => <HomePage />}
                    />
                    <Route
                        exact path={routes.ACCOUNT}
                        component={() => <AccountPage />}
                    />
                </div>
            </Router>
        );
    }
}

export default App;