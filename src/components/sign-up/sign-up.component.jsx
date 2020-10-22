import React from 'react';
import { Box, Input, H6, BUTTON, Small, SmalL } from './sign-up.styles'
import { useForm } from "react-hook-form";
import { VisuallyHidden, ControlBox, Icon } from "@chakra-ui/core"

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
const Signup = () => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = async (data) => {
        const { displayName, email, password, confirmPassword } = data;
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await createUserProfileDocument(user, { displayName });
        } catch (error) {
            console.log(error, `this an error`);
        }


    };


    return (
        <Box>
            <H6>  Not a member yet? Join now </H6>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="Label">DisplayName</label>
                <Input type='text' name="displayName" ref={register()} />

                <label className="Label">Email</label>

                <Input
                    name="email"
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}
                />
                {errors.email && errors.email.message}
                <Small>No verification e-mail will be sent</Small>

                <label className="Label">Password</label>

                <Input
                    name="password"
                    type="password"
                    ref={register()}
                />
                {errors.password && errors.password.message}


                <label className="Label"> Confirm Password</label>

                <Input
                    name="confirmPassword"
                    type="password"
                    ref={register()}
                />
                {errors.confirmPassword && errors.confirmPassword.message}
                <br />

                <BUTTON type="submit" size="xs">Submit</BUTTON>
            </form>





        </Box>
    )
};


export default Signup;