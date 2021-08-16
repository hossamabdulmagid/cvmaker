import { Fragment, useState } from "react";
import {
  RapperColor,
  RapperdCol,
  Color,
  LINK,
  COLL,
} from "./signin-signup.styles";
import { Container, Row, Col } from "react-bootstrap";
import Signin from "../../components/sign-in/sign-in.component";
import Signup from "../../components/sign-up/sign-up.component";
import NavGuest from "../../components/nav-guest/navGuest.component";
const SigninSignup = () => {
  const [download, setDownload] = useState(0);
  const [save, setSave] = useState(0);

  return (
    <Fragment>
      <RapperColor className="container-fluid">
        <NavGuest />
      </RapperColor>
      <Color>
        <Container>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <Signin />
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Signup />
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={0} lg={8}></Col>
            <Col xs={6} md={0} lg={4}></Col>
          </Row>
        </Container>
      </Color>
    </Fragment>
  );
};

export default SigninSignup;
