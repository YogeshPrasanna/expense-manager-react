import React , { Component } from 'react'
import { auth } from '../../firebase/firebase'

const style = {
    "margin": "15px auto"
}

const Message = (props) => {
    return (
        <div className="row">
            <div className="col-sm-12" style={style}>
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">{props.message}</h4>
                </div>
            </div>
        </div>
    )
}

class UpdatePassword extends Component {
    constructor(props){
        super(props)

        this.state = {
            passwordOne : '',
            passwordTwo: '',
            user : this.props.user,
            message: ''
        }
    }

    onSubmit = (event) => {

        // update password 
        this.state.user.updatePassword(this.state.passwordOne).then(() => {
            this.setState({
                'message': 'password updated successfully'
            })
        }).catch(function (error) {
            alert(error);
        });

        event.preventDefault();
    }

    render() {

        const isInvalid =
            this.state.passwordOne !== this.state.passwordTwo ||
            this.state.passwordOne === '';

        
        return (
            <div className="login-page">
                <form onSubmit={this.onSubmit} className="form">
                    <input
                        value={this.state.passwordOne} 
                        onChange={event => this.setState({
                                'passwordOne': event.target.value
                                })
                            }
                        type="password" 
                        placeholder="Enter New Password" 
                    />
                    <input
                        value={this.state.passwordTwo}
                        onChange={event => this.setState({
                            'passwordTwo': event.target.value
                        })
                        }
                        type="password"
                        placeholder="Re Enter New Password"
                    />
                    <button disabled={isInvalid} type="submit">
                        Update Password
                    </button>
                </form>
                <Message message={this.state.message}/>
            </div>
        )
    }
}

export default UpdatePassword
