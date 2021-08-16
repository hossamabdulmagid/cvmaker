import { useState } from "react";
import "../../App.css";
import {
  RapperColor,
  RapperContent,
  Links,
  SPan,
  BUTTON,
  RapperdRow,
  Div,
  RapperdCols,
  Small,
} from "./header.styles";
import Caro from "../carousel/carousel.component";
import Content from "../content/content.component";
import { Button } from "@chakra-ui/core";
import { Container, Col, Row } from "react-bootstrap";
const Head = () => {
  const [download, setDownload] = useState(0);
  const [save, setSave] = useState(0);
  return (
    <>
      <RapperColor>
        <RapperContent className="container">
          <RapperdRow>
            <Row>
              <Col xs={4} md={6} lg={6}>
                <img src="cvcreator.png" alt="" />
              </Col>

              <Col xs={4} md={3} lg={4}>
                <Small onClick={() => setDownload(download + 1)}>
                  {download}
                  download
                </Small>
              </Col>

              <Col xs={4} md={3} lg={2}>
                <Small onClick={() => setSave(save + 1)}>
                  {save}
                  saved
                </Small>
              </Col>
            </Row>
          </RapperdRow>

          <RapperdRow>
            <Row>
              <Col xs={3} md={5} lg={5}>
                <p>
                  Create beautiful, professional resumes in minutes,
                  <SPan> free.</SPan>
                </p>
              </Col>
              <Col xs={3} md={3} lg={4} />

              <Col xs={6} md={4} lg={3}>
                <RapperdCols>
                  <Links to="/cv">
                    <BUTTON variant="outline-dark" size="xs" variant="success">
                      <img
                        src="ico_start.png"
                        alt=""
                        margin="1"
                        className="imgforcreateCv"
                      />
                      Create a cv now
                    </BUTTON>
                  </Links>
                </RapperdCols>
              </Col>
            </Row>
          </RapperdRow>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <Caro />
            </Col>
          </Row>
        </RapperContent>
      </RapperColor>
      <Container>
        <Div className="row">
          <div className="col-7">
            <Button size="xs"> Like 17k</Button>
            <Button size="xs"> twitter</Button>
            <Button variant="info" size="xs">
              in Share
            </Button>
          </div>
          <div className="col-5">
            <small>
              Already have your resumes on CV Creator?
              <Button size="xs">
                <Links to="/login">login </Links>{" "}
              </Button>
            </small>
          </div>
        </Div>
        <Content />
      </Container>
    </>
  );
};

export default Head;
