import { useRef, useState } from "react";
import {
  COL,
  Container,
  Title,
  ButtonSubmit,
  LinkForSignInSignUp,
  INPUT,
  RapperdInput,
  RapperdAlert,
  Form,
} from "./forget-password.styles";
import { Input, Button, Spinner } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebase.utils";
import { useToast } from "@chakra-ui/core";
import { Col } from "react-bootstrap";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";
const ForgetPassword = () => {
  const { handleSubmit, register, errors, data, getValues } = useForm();

  const value = getValues();

  const initialRef = useRef();

  const toast = useToast();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [massage, setMassage] = useState("");

  const [info, setInfo] = useState({ email: "" });

  const [flagButton, setFlagButton] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target.value;
    setInfo({ ...info, [name]: value });
  };
  const { email } = info;

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setError("");
      setLoading(true);
      setFlagButton(false);
      await auth.sendPasswordResetEmail(initialRef.current.value);
      setMassage("please check your email for further instructions ☺");
    } catch (error) {
      console.log(error, `this an error`);
      setError("Failed to reset Password");
      toast({
        title: "Error",
        description: `${error}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    setLoading(false);
    setFlagButton(true);
  };
  return (
    <Container className="container">
      <div className="">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Get in Touch</Title>
          <RapperdAlert>
            {error && (
              <Alert
                status="error"
                className="alert"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <AlertIcon />
                <AlertTitle mr={2}>ERROR!</AlertTitle>
                <AlertDescription>{error || error.massage}</AlertDescription>
              </Alert>
            )}

            {massage && (
              <Alert
                status="success"
                className="alert"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <AlertIcon />
                Check Your Mail
              </Alert>
            )}
          </RapperdAlert>

          <RapperdInput>
            <div className="row">
              <Col className="col" xs={12} lg={12} md={12}>
                <INPUT
                  type="email"
                  name="email"
                  placeholder="your email please"
                  ref={initialRef}
                  onChange={handleChange}
                  isRequired
                />
              </Col>
            </div>
          </RapperdInput>
          <ButtonSubmit size="sm" variantColor="blue" type="submit">
            {!flagButton ? <Spinner /> : "Confirm"}
          </ButtonSubmit>
        </Form>
        <LinkForSignInSignUp to="/login">Login || Register</LinkForSignInSignUp>
      </div>
    </Container>
  );
};

export default ForgetPassword;
