import React from 'react';
import { Box, Input, H6, BUTTON, H7, IMG } from './sign-in.styles'
import { useForm } from "react-hook-form";
import { auth, signInWithGoogle, signInWithFacebook } from '../../firebase/firebase.utils'

const Signin = () => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            await auth.signInWithEmailAndPassword(
                email,
                password
            );
        } catch (error) {
            console.log(error, `this an error`);
        }


    };
    return (
        <Box>
            <H6>  Member login </H6>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="Label">Email</label>

                <Input
                    name="email"
                    placeholder="email"
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}
                />
                {errors.email && errors.email.message}
                <br />
                <label className="Label">Password</label>

                <Input
                    name="password"
                    placeholder="Password"
                    type="password"

                    ref={register({
                        validate: value => value !== "admin" || "Nice try!"
                    })}
                />
                {errors.password && errors.password.message}

                <BUTTON type="submit" size="xs">Login</BUTTON>
            </form>

            {/*     <H7>  Forgot your password? </H7> */}

            <IMG src="facebook.png" alt="" onClick={signInWithFacebook} />
            <IMG src="google.png" alt="" onClick={signInWithGoogle} />

        </Box>
    )
};


export default Signin;