import { useState } from "react";
import { RapperColor, Small } from "./navGuest.styles";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
const NavGuest = () => {
  const [download, setDownload] = useState(0);
  const [save, setSave] = useState(0);
  return (
    <div>
      <RapperColor className="container text-center">
        <Row>
          <Col xs={4} md={6} lg={6}>
            <Link to="/">
              <img src="cvcreator.png" alt="" className="logo" />
            </Link>
          </Col>
          <Col xs={4} md={3} lg={3}>
            <small>{download}</small>
            <Small onClick={() => setDownload(download + 1)}> downloads</Small>
          </Col>
          <Col xs={4} md={3} lg={3}>
            <small>{save}</small>
            <Small onClick={() => setSave(save + 1)}>savedCvs </Small>
          </Col>
        </Row>
      </RapperColor>
    </div>
  );
};

export default NavGuest;
