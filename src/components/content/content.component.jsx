import { Contents, H5, BoxShadow, IMG } from "./content.styles";
import { Container, Row, Col } from "react-bootstrap";
const Content = () => {
  return (
    <Contents className="container">
      <img src="press.png" alt="" />
      <H5>A wide range of templates to choose from</H5>
      <div className="row">
        <BoxShadow className="col-6">
          <img src="cv1.png" alt="" />
          <hr />
          <small>Headline</small>
        </BoxShadow>
        <BoxShadow className="col-6">
          <img src="cv2.png" alt="" />
          <hr />
          <small>Mocca</small>
        </BoxShadow>
      </div>
      <div className="row">
        <BoxShadow className="col-3">
          <img src="cv3.png" alt="" />
          <hr />
          <small>Executive</small>
        </BoxShadow>
        <BoxShadow className="col-3">
          <img src="cv4.png" alt="" />
          <hr />
          <small>Elegant</small>
        </BoxShadow>
        <BoxShadow className="col-3">
          <img src="cv5.png" alt="" />
          <hr />
          <small>Bold</small>
        </BoxShadow>
        <BoxShadow className="col-3">
          <img src="cv6.png" alt="" />
          <hr />
          <small>Literateur</small>
        </BoxShadow>
      </div>
      <div className="row">
        <BoxShadow className="col-3">
          <img src="cv6.png" alt="" />
          <hr />
          <small>Finesse</small>
        </BoxShadow>
        <BoxShadow className="col-3">
          <img src="cv7.png" alt="" />
          <hr />
          <small>Metro</small>
        </BoxShadow>
      </div>

      <div className="row">
        <Col xs={12} md={12} lg={12} className="text-center">
          <IMG src="premum.png" />
        </Col>
      </div>
    </Contents>
  );
};

export default Content;
