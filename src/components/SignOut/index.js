import React from 'react';

import { auth } from '../../firebase';

const SignOutButton = () =>
        <div
        className="nav-item" 
            onClick={auth.doSignOut}
        >
            Sign Out
  </div>

export default SignOutButton;