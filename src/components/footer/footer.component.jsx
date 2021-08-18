import { RapperColor, Content, LINK } from "./footer.styles";
import { Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <RapperColor className="no-printme">
      <Content className="container">
        <Row bsPrefix="d-none d-md-flex d-lg-flex  d-xl-flex center-item no-printme">
          <Col xs={4} md={4} lg={4}>
            CV Creator © 2020 - 2021. All rights reserved
          </Col>
          <Col xs={3} md={4} lg={4}></Col>
          <Col xs={5} md={4} lg={4}>
            <LINK to="/policy">Privacy policy</LINK> ||
            <LINK to="/contact">Contact</LINK>
          </Col>
        </Row>
        <Row bsPrefix="d-block d-md-none d-lg-none d-xl-none center-item ">
          <Col xs={12} s={12} className="text-center no-printme">
            <LINK to="/policy">Privacy policy</LINK> ||
            <LINK to="/contact">Contact</LINK>
          </Col>
        </Row>
      </Content>
    </RapperColor>
  );
};

export default Footer;
