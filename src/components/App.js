import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import { firebase } from '../firebase/index'

import 'bootstrap/dist/css/bootstrap.min.css'
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
import * as db from '../firebase/db'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
            users: null
        };
    }

    componentDidMount(){
        firebase.auth.onAuthStateChanged(authUser => {
            console.log("Authenticated user : ", firebase.auth.currentUser)
            authUser ? this.setState({
                authUser: authUser
            }) : this.setState({
                authUser: null
            })
            // return authUser ? this.setState(() => { authUser: authUser}) : this.setState(() => ({authUser: null}))
        });

        // get all the users in the db
        db.onceGetUsers().then(snapshot => {
            this.setState({ users: snapshot.val() })
            console.log(this.state)
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
                        component={() => <HomePage user={this.state.authUser}/>}
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