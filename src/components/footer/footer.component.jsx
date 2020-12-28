import React from "react";
import { RapperColor, Content, LINK } from "./footer.styles";
import { Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <RapperColor>
      <Content className="container">
        <Row>
          <Col xs={4} md={4} lg={4}>
            CV Maker © 2010 - 2020. All rights reserved
          </Col>
          <Col xs={3} md={4} lg={4}></Col>
          <Col xs={5} md={4} lg={4}>
            <LINK to="/policy">Privacy policy</LINK> ||
            <LINK to="/contact">Contact</LINK>
          </Col>
        </Row>
      </Content>
    </RapperColor>
  );
};

export default Footer;
