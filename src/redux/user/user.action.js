import React from 'react';
import { UserTypeAction } from './userType'
import { toast } from "react-toastify";

const setCurrentUser = user => {
    if (user) {
        toast.success('Account has been logged welcome');
    }
    return {
        type: UserTypeAction.SET_CURRENT_USER,
        payload: user
    }


}

export default setCurrentUser;