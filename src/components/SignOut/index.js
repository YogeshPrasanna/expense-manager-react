import React from 'react';

import { auth } from '../../firebase';

const SignOutButton = () =>
        <button
            className="nav-link"
            type="button"
            onClick={auth.doSignOut}
        >
            Sign Out
  </button>

export default SignOutButton;