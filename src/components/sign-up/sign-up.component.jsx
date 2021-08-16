import { Box, Input, H6, BUTTON, Small, RapperdButton } from "./sign-up.styles";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/core";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { Container, Row, Col } from "react-bootstrap";
const Signup = () => {
  const { handleSubmit, register, errors } = useForm();
  const toast = useToast();
  const onSubmit = async (data) => {
    const { displayName, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast({
        title: "Check your password",
        description: "passwords don't match",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    if (data.error) {
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
        <H6> Not a member yet? Join now </H6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="Label">DisplayName</label>
          <Input type="text" name="displayName" ref={register()} />

          <label className="Label">Email</label>
          <Input
            name="email"
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
          <Row>
            <Col></Col>
          </Row>
          <Small>No verification e-mail will be sent</Small>

          <label className="Label">Password</label>

          <Input name="password" type="password" ref={register()} />
          <br />

          <small className="error">
            {errors.password && errors.password.message}
          </small>

          <label className="Label"> Confirm Password</label>

          <Input name="confirmPassword" type="password" ref={register()} />
          <br />
          <small className="error">
            {errors.confirmPassword && errors.confirmPassword.message}
          </small>
          <RapperdButton>
            <BUTTON type="submit" size="xs">
              Submit
            </BUTTON>
          </RapperdButton>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
