import React from 'react'

const UserVerification = () => {

    const style = {
        "margin" : "15px auto"
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12" style={style}>
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">A verification mail has been sent to your email id</h4>
                            <p>Please verify your email - and then login to manage your expenses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserVerification;