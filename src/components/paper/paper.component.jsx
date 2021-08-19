import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Get_allSection } from "../../redux/allsections/allsectionsAction";
import { useParams, useHistory } from "react-router-dom";
import { useToast, Spinner, Button } from "@chakra-ui/core";
import { Get_Workexperince } from "../../redux/workexperince/workexperinceAction";
const Paper = (props) => {
  const {
    Get_allSection,
    currentUser,
    allNameOfSections,
    tryflag,
    Get_Workexperince,
    StateWorkExp = [],
  } = props;

  const { id } = useParams();

  const toast = useToast();

  //   useEffect(() => {
  //     if (!currentUser) {
  //       return;
  //     }
  //   }, []);

  const [flag, updatdFlag] = useState(false);

  const [flagworkexp, updatedFlagWorkExp] = useState(false);

  setTimeout(() => {
    updatdFlag(true);
    if (allNameOfSections.length > 1) {
      updatdFlag(true);
    } else {
      updatdFlag(false);
    }
    if (StateWorkExp.length > 1) {
      updatedFlagWorkExp(true);
    } else {
      updatedFlagWorkExp(false);
    }
  }, 500);

  const isCurrent = useRef(true);

  useLayoutEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!currentUser) {
      return;
    }
    if (!id) {
      return;
    }
    Get_Workexperince(currentUser, id);
  }, [Get_Workexperince, currentUser, id]);

  useEffect(() => {
    if (!id) {
      return;
    }
    if (StateWorkExp) {
      if (isCurrent.current) {
        if (StateWorkExp.length > 0) {
          setTimeout(() => {
            updatedFlagWorkExp(true);
          }, 200);
        } else if (StateWorkExp.length === 0) {
          updatedFlagWorkExp(false);
        }
      }
    }
  }, [StateWorkExp.length]);

  return (
    <Container className="hide-from-page">
      <div className="printme">
        <Col>
          {flag ? (
            allNameOfSections
              .filter((printSingleSection, idx) => idx < 1)
              .map((printSingleSection, idx) => {
                return (
                  <div key={idx}>
                    <strong>Contact :-</strong>
                    <p>
                      {" "}
                      <strong>email : </strong>
                      {(printSingleSection.data.basicinfo &&
                        printSingleSection.data.basicinfo.email) ||
                        ""}
                    </p>
                    <p>
                      <strong>fullname : </strong>

                      {(printSingleSection.data.basicinfo &&
                        printSingleSection.data.basicinfo.fullname) ||
                        ""}
                    </p>
                    <p>
                      <strong>phone : </strong>
                      {(printSingleSection.data.basicinfo &&
                        printSingleSection.data.basicinfo.phone) ||
                        ""}
                    </p>
                    <p>
                      <strong>address1 : </strong>

                      {(printSingleSection.data.basicinfo &&
                        printSingleSection.data.basicinfo.address1) ||
                        ""}
                    </p>
                    <p>
                      <strong>address2 : </strong>
                      {(printSingleSection.data.basicinfo &&
                        printSingleSection.data.basicinfo.address2) ||
                        ""}
                    </p>
                    <p>
                      <strong>address3 : </strong>
                      {(printSingleSection.data.basicinfo &&
                        printSingleSection.data.basicinfo.address3) ||
                        ""}
                    </p>
                    <p>
                      <strong>webSites : </strong>
                      {(printSingleSection.data.basicinfo &&
                        printSingleSection.data.basicinfo.webSites) ||
                        ""}
                    </p>
                    <hr />
                  </div>
                );
              })
          ) : (
            <div>you must submited section basicInformation</div>
          )}
        </Col>
        <Col>
          <div className="printme">
            {flagworkexp ? (
              StateWorkExp &&
              StateWorkExp.filter((workexp, idx) => idx < 2).map(
                (workexp, idx) => (
                  <div key={idx}>
                    <strong> Workexperience :-</strong>
                    <p>
                      <strong>Company Name : </strong>
                      {workexp.companyname || ""}
                    </p>
                    <p>
                      <strong>Position : </strong>
                      {workexp.position || ""}
                    </p>
                    <p>
                      <strong>Start Work : </strong>
                      {workexp.startwork || ""}
                    </p>
                    <p>
                      <strong>End Work : </strong>

                      {workexp.endwork || ""}
                    </p>
                    <hr />
                  </div>
                )
              )
            ) : (
              <div>
                <hr />
                you must submited section Workexperience{" "}
              </div>
            )}
          </div>
        </Col>
        {/* <Col>
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
        </Col>*/}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  StateWorkExp: state.sectionWorkexperince.data.allwork,
});

const mapDispatchToProps = (dispatch) => ({
  Get_Workexperince: (currentUser, id) =>
    dispatch(Get_Workexperince(currentUser, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
