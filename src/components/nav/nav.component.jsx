import React, { useState } from "react";
import { Rapper, Span, LINK, Select, Icon, Small } from "./nav.styles";
import { BsFillLockFill } from "react-icons/bs";
import { auth } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { Container, Row, Col } from "react-bootstrap";
const Nav = ({ currentUser, displayName }) => {
  const [languages, setLanguages] = useState([
    "English",
    "العربية",
    "Български",
    "Čeština",
    "Dansk",
    "Deutsch",
    "Eesti",
    "keel",
    "ქართული",
    "Dutch",
    "Español",
    "فارسی",
    "Français",
    "Galician",
    "Έλληνικά",
    "Hungarian",
    "Italiano",
    "עברית",
    "한국어",
    "Norsk",
    "Polski",
    "Português",
    "Român",
    "Pусский",
    "Slovenščina",
    "Slovenský",
    "Shqip",
    "Suomi",
    "Svenska",
    "Türkçe",
    "Українська",
    "Tiếng",
    "Việt",
    "മലയാളം",
    "中文",
    "繁體中文",
    "Hrvatski",
  ]);

  return (
    <Rapper>
      <Container>
        <Row>
          <Col xs={3} s={4} lg={6}>
            <Span>Create, maintain, publish, and share your CVs for free</Span>
          </Col>
          <Col xs={3} s={4} lg={3}>
            <Select>
              {languages.map((singlelang, i) => (
                <option key={i}>{singlelang}</option>
              ))}
            </Select>
          </Col>
          <Col xs={6} s={4} lg={3}>
            {currentUser ? (
              <LINK onClick={() => auth.signOut()} to="">
                {" "}
                <span> Sign Out</span>
                <Small prefix="d-xs-block d-sm-block d-lg-flex d-xl-flex d-md-flex">
                  {" "}
                  ({currentUser.displayName}){" "}
                </Small>
              </LINK>
            ) : (
              <>
                <Icon className="lock" />
                <LINK to="/login">Login | Signup</LINK>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Rapper>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(Nav);
