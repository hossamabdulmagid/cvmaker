import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Get_allSection } from "../../redux/allsections/allsectionsAction";
import { useParams, useHistory } from "react-router-dom";
import { useToast, Spinner, Button } from "@chakra-ui/core";
const Paper = ({ Get_allSection, currentUser, allNameOfSections, tryflag }) => {
  const { id } = useParams();

  const toast = useToast();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    Get_allSection(currentUser, id, toast);
  }, [Get_allSection, currentUser, allNameOfSections]);

  return (
    <Container className="hide-from-page">
      <div>
        <Col>
          {allNameOfSections.map((printSingleSection, idx) => (
            <div key={idx}>
              {printSingleSection.data.basicinfo.email || ""}
              {printSingleSection.data.basicinfo.fullname || ""}
              {printSingleSection.data.basicinfo.phone || ""}
              {printSingleSection.data.basicinfo.title || ""}
              {printSingleSection.data.basicinfo.address1 || ""}
              {printSingleSection.data.basicinfo.address2 || ""}
              {printSingleSection.data.basicinfo.address3 || ""}
              {printSingleSection.data.basicinfo.webSites || ""}
              {printSingleSection.data.basicinfo.lastModified.toString() || ""}
            </div>
          ))}
          <div className="printme">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </Col>
        <Col>
          <div className="printme">
            <div>4</div>
            <div>5</div>
            <div>6</div>
          </div>
        </Col>
        <Col>
          <div className="printme">
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </Col>
        <Col>
          <div className="printme">
            <div>10</div>
            <div>11</div>
            <div>12</div>
          </div>
        </Col>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  allNameOfSections: state.allSections.section,
  tryflag: state.allSections.Flag,
});

const mapDispatchToProps = (dispatch) => ({
  Get_allSection: (currentUser, id, toast) =>
    dispatch(Get_allSection(currentUser, id, toast)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Paper);
