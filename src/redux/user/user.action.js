import React from 'react';
import { UserTypeAction } from './userType'

const setCurrentUser = user => {

    return {
        type: UserTypeAction.SET_CURRENT_USER,
        payload: user
    }


}

export default setCurrentUser;