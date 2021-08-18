import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Get_allSection } from "../../redux/allsections/allsectionsAction";
import { useParams, useHistory } from "react-router-dom";
import { useToast, Spinner, Button } from "@chakra-ui/core";
const Paper = (props) => {
  const { Get_allSection, currentUser, allNameOfSections, tryflag } = props;
  console.log(`props from paper`, props);
  const { id } = useParams();

  const toast = useToast();

  useEffect(() => {
    if (!currentUser) {
      return;
    }
  }, []);

  const [flag, updatdFlag] = useState(false);
  const [flagworkexp, updatedFlagWorkExp] = useState(false);

  const testedPrint = () => {
    if (!currentUser) {
      return;
    }
    // console.log(
    //   allNameOfSections.map((single) => single.data.allwork),
    //   `allNameOfSections`
    // );
    setTimeout(() => {
      if (
        allNameOfSections.map((singleSection) => singleSection.data.basicinfo)
      ) {
        updatdFlag(true);
      } else {
        // console.log(`false`);
        updatdFlag(false);
      }
      if (
        allNameOfSections.map((singleSection) => singleSection.data.allwork)
      ) {
        // console.log(`true`);
        updatedFlagWorkExp(true);
      } else {
        // console.log(`false`);
        updatedFlagWorkExp(false);
      }
    }, 10000);
  };

  console.log(testedPrint());

  return (
    <Container className="hide-from-page">
      <div>
        <Col>
          {flag
            ? allNameOfSections
                .filter((printSingleSection, idx) => idx < 1)
                .map((printSingleSection) => {
                  return (
                    <div key={printSingleSection.id}>
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
                        <strong>title : </strong>

                        {(printSingleSection.data.basicinfo &&
                          printSingleSection.data.basicinfo.title) ||
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
                        <strong>address3 : </strong>
                        {(printSingleSection.data.basicinfo &&
                          printSingleSection.data.basicinfo.webSites) ||
                          ""}
                      </p>
                    </div>
                  );
                })
            : null}
        </Col>
        <Col>
          {flagworkexp
            ? allNameOfSections
                .filter((printSingleSection, idx) => idx < 4)
                .map((singleSection, idx) => (
                  <div>
                    <strong>WorkExperince</strong>
                    <div key={idx}>
                      {/* {(singleSection.data &&
                        singleSection.data.allwork.map((singleJob, idx) => (
                          <div key={idx}>
                            {(singleJob && singleJob.companyname) || ""}
                          </div>
                        ))) ||
                        "null"} */}
                    </div>
                  </div>
                ))
            : null}
          {/* <div className="printme">
            <div>4</div>
            <div>5</div>
            <div>6</div>
          </div> */}
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

export default Paper;
