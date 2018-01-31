import React from 'react';

const AccountPage = (props) => {

    if(props.user){
        console.log("authn props : " ,props.user)
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">You are registered with the email : {props.user.email}</h5>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">You are registered with the email : Loading ...</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountPage;