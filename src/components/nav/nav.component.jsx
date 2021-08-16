import { useState } from "react";
import { Rapper, Span, LINK, Select, Icon, Small } from "./nav.styles";
import { auth } from "../../firebase/firebase.utils";
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
        <Row bsPrefix="d-none d-md-flex d-lg-flex  d-xl-flex center-item">
          <Col xs={4} s={4} lg={6}>
            <Span>Create, maintain, publish, and share your CVs for free</Span>
          </Col>
          <Col xs={4} s={4} lg={3}>
            <Select>
              {languages.map((singlelang, i) => (
                <option key={i}>{singlelang}</option>
              ))}
            </Select>
          </Col>
          <Col xs={4} s={4} lg={3}>
            {currentUser ? (
              <LINK onClick={() => auth.signOut()} to="">
                <span>Sign Out ({currentUser.displayName})</span>
              </LINK>
            ) : (
              <>
                <Icon className="lock" />
                <LINK to="/login">Login | Signup</LINK>
              </>
            )}
          </Col>
        </Row>
        <Row bsPrefix="d-block d-md-none d-lg-none d-xl-none center-item">
          <Col xs={12} s={12} className="text-center">
            {currentUser ? (
              <LINK onClick={() => auth.signOut()} to="">
                {" "}
                <span>Sign Out ({currentUser.displayName})</span>
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
