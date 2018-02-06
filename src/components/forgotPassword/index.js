import React , { Component } from 'react';
import { auth } from '../../firebase';


const style = {
    "margin": "15px auto"
}

class PasswordForgetPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            sent: false
        }
    }

    onSubmit = (event) => {
        // password reset
        auth.doPasswordReset(this.state.email).then(() => {
            this.setState({
                'sent': true
            })
        }).catch(function (error) {
            alert(error)
        });

        event.preventDefault();        
    }

    render() {
        return (
            <div className="login-page">
                <form onSubmit={this.onSubmit} className="form">
                        <input
                            value={this.state.email}
                            onChange={event => this.setState({
                                    'email': event.target.value
                                    })
                                }
                            type="text"
                            placeholder="Email Address"
                        />
                    <button type="submit" >reset password</button>
                </form>
                {this.state.sent ? 
                    <div className="row">
                        <div className="col-sm-12" style={style}>
                            <div class="alert alert-success" role="alert">
                                <h4 class="alert-heading">A Password Reset mail has been sent to your email id</h4>
                                <p>Please reset your password - and then login to manage your expenses</p>
                            </div>
                        </div>
                    </div> : 
                    <div> </div> 
                } 
            </div>
        )
    }
}

export default PasswordForgetPage;