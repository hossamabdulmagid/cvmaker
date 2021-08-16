import {
  Box,
  Input,
  H6,
  BUTTON,
  H7,
  IMG,
  ForgetPassword,
  RapperdButton,
} from "./sign-in.styles";
import { useForm } from "react-hook-form";
import {
  auth,
  signInWithGoogle,
  signInWithFacebook,
} from "../../firebase/firebase.utils";
import { Container } from "react-bootstrap";
import { useToast } from "@chakra-ui/core";
const Signin = () => {
  const toast = useToast();

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    if (password.length < 6) {
      toast({
        title: "Check your password",
        description: "The password must be 6 to 32 characters long.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });

      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error, `this an error`);
      toast({
        title: "Error",
        description: `${error}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };
  return (
    <Container>
      <Box>
        <H6> Member login </H6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="Label">Email</label>
          <Input
            name="email"
            placeholder="email"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
          <br />
          <small className="error">
            {errors.email && errors.email.message}
          </small>
          <br />
          <label className="Label">Password</label>

          <Input
            name="password"
            placeholder="Password"
            type="password"
            ref={register({
              validate: (value) => value !== "admin" || "Nice try!",
            })}
          />
          <br />
          <small className="error">
            {errors.password && errors.password.message}
          </small>
          <RapperdButton>
            <BUTTON type="submit" size="xs">
              Login
            </BUTTON>
          </RapperdButton>
        </form>
        <Container>
          <H7>
            <ForgetPassword to="/forgetpassword">
              Forgot your password
            </ForgetPassword>
          </H7>
          <IMG src="facebook.png" alt="" onClick={signInWithFacebook} />
          <IMG src="google.png" alt="" onClick={signInWithGoogle} />
        </Container>
      </Box>
    </Container>
  );
};

export default Signin;
