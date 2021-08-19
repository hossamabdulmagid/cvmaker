import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Get_allSection } from "../../redux/allsections/allsectionsAction";
import { useParams, useHistory } from "react-router-dom";
import { useToast, Spinner, Button } from "@chakra-ui/core";
import { Get_Workexperince } from "../../redux/workexperince/workexperinceAction";
import { GET_Education } from "../../redux/education/educationAction";
import { Get_References } from "../../redux/references/referencesAction";
import { Get_Qualifications } from "../../redux/qualifications/qualificationsAction";
import { Get_Interest } from "../../redux/interests/interestsAction";

const Paper = (props) => {
  const {
    Get_allSection,
    currentUser,
    allNameOfSections,
    tryflag,
    Get_Workexperince,
    StateWorkExp = [],
    GET_Education,
    EducationState,
    sectionReferences,
    Get_References,
    Get_Qualifications,
    sectionQualifications,
    Get_Interest,
    sectionInterests,
  } = props;

  const [education, setEducation] = useState({
    education: {
      collagename: "",
      startgraduationyear: "",
      endgraduationyear: "",
      eduactionmajor: "",
      lastModified: new Date(),
      type: "education",
    },
  });

  const { id } = useParams();

  const toast = useToast();

  const [flagBasicInfo, updatdFlagBasicInfo] = useState(false);

  const [flagworkexp, updatedFlagWorkExp] = useState(false);

  const [educationFlag, setEducationFlag] = useState(false);

  const [referencesFlag, UpdateReferencesFlag] = useState(false);

  const [qualificationsFlag, UpdatedQualificationsFlag] = useState(false);

  const [interestsFlag, updatedInterstsFlag] = useState(false);

  setTimeout(() => {
    updatdFlagBasicInfo(true);
    if (allNameOfSections.length > 1) {
      updatdFlagBasicInfo(true);
    } else {
      updatdFlagBasicInfo(false);
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
    GET_Education(currentUser, id, toast);
    if (isCurrent.current) {
      if (EducationState) {
        setEducation({
          collagename: EducationState.collagename,
          startgraduationyear: EducationState.startgraduationyear,
          endgraduationyear: EducationState.endgraduationyear,
          eduactionmajor: EducationState.eduactionmajor,
          lastModified: EducationState.lastModified,
        });
        setEducationFlag(true);
      } else {
        setEducationFlag(false);
      }
    }
  }, [
    GET_Education,
    currentUser,
    id,
    toast,
    EducationState.identiferId,
    sectionReferences,
  ]);
  const {
    collagename,
    startgraduationyear,
    endgraduationyear,
    eduactionmajor,
    lastModified,
  } = education;

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

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    Get_References(currentUser, id);
    console.log(`sectionReferences`);
    console.log(sectionReferences);
    if (sectionReferences.length > 3) {
      UpdateReferencesFlag(true);
    } else {
      UpdateReferencesFlag(false);
    }
  }, [Get_References, sectionReferences]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    Get_Qualifications(currentUser, id);
    if (sectionQualifications.length > 3) {
      UpdatedQualificationsFlag(true);
    } else {
      UpdatedQualificationsFlag(false);
    }
  }, [
    Get_Qualifications,
    currentUser,
    id,
    sectionQualifications,
    UpdatedQualificationsFlag,
  ]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (sectionInterests.length > 3) {
      updatedInterstsFlag(true);
    } else {
      updatedInterstsFlag(false);
    }
    Get_Interest(currentUser, id);
  }, [Get_Interest, currentUser, id, sectionInterests]);

  return (
    <Container className="hide-from-page">
      <div className="printme">
        {flagBasicInfo ? (
          allNameOfSections
            .filter((printSingleSection, idx) => idx < 1)
            .map((printSingleSection, idx) => {
              return (
                <div key={idx}>
                  <Row>
                    <Col xs={3} md={3} lg={3} s={3}>
                      <strong className="title">Contact</strong>
                    </Col>

                    <Col xs={6} md={6} lg={6} s={6}>
                      <p>
                        {" "}
                        <strong>fullname : </strong>
                        {(printSingleSection.data.basicinfo &&
                          printSingleSection.data.basicinfo.fullname) ||
                          ""}
                      </p>
                      <p>
                        <strong>email : </strong>

                        {(printSingleSection.data.basicinfo &&
                          printSingleSection.data.basicinfo.email) ||
                          ""}
                      </p>
                      <p>
                        <strong>phone : </strong>
                        {(printSingleSection.data.basicinfo &&
                          printSingleSection.data.basicinfo.phone) ||
                          ""}
                      </p>
                      <p>
                        <strong>webSites : </strong>
                        {(printSingleSection.data.basicinfo &&
                          printSingleSection.data.basicinfo.webSites) ||
                          ""}
                      </p>
                    </Col>
                    <Col xs={3} md={3} lg={3} s={3}>
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
                    </Col>
                  </Row>
                  <hr />
                </div>
              );
            })
        ) : (
          <div>you must submited section Basic Information</div>
        )}
        <div className="primtme">
          <Row>
            <Col xs={3} md={3} lg={3} s={3}>
              <strong className="title">Education</strong>
            </Col>

            <Col>
              {" "}
              {educationFlag ? (
                <div>
                  <p>
                    <strong>CollageName : </strong>
                    {collagename}
                  </p>
                  <p>
                    <strong> StartGraduationYear : </strong>{" "}
                    {startgraduationyear}
                  </p>
                  <p>
                    <strong> EndGraduationYear : </strong>
                    {endgraduationyear}
                  </p>
                  <p>
                    <strong> Education Majoring : </strong>
                    {eduactionmajor}
                  </p>
                  <hr />
                </div>
              ) : (
                <div>you must submited section Education</div>
              )}
            </Col>
          </Row>
          <hr />
        </div>
        <div className="printme">
          <Row>
            <Col xs={3} md={3} lg={3} s={3}>
              <strong className="title">Workexperience</strong>
            </Col>

            {flagworkexp ? (
              StateWorkExp &&
              StateWorkExp.filter((workexp, idx) => idx < 2).map(
                (workexp, idx) => (
                  <>
                    <Col key={idx} xs={4} md={4} lg={4} s={4}>
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
                    </Col>
                    <hr />
                  </>
                )
              )
            ) : (
              <div>
                <hr />
                you must submited section Workexperience{" "}
              </div>
            )}
          </Row>
          <hr />
        </div>
        <Row>
          <Col xs={3} md={3} lg={3} s={3}>
            <strong className="title">Interests</strong>
          </Col>
          <Col>
            <div className="printme">
              {interestsFlag ? (
                <div>
                  <strong>Content-Interests : </strong>
                  {sectionInterests}
                </div>
              ) : (
                <div>
                  <hr />
                  you must submited section Interests{" "}
                </div>
              )}
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={3} md={3} lg={3} s={3}>
            <strong className="title">References</strong>
          </Col>
          <Col>
            <div className="printme">
              {referencesFlag ? (
                <div>
                  <strong>Content-References : </strong>
                  {sectionReferences}
                </div>
              ) : (
                <div>
                  <hr />
                  you must submited section References{" "}
                </div>
              )}
            </div>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col xs={3} md={3} lg={3} s={3}>
            <strong className="title">Qualifications</strong>
          </Col>
          <Col>
            <div className="printme">
              {qualificationsFlag ? (
                <div>
                  <strong>Content-Qualifications : </strong>
                  {sectionQualifications}
                </div>
              ) : (
                <div>
                  <hr />
                  you must submited section Qualifications{" "}
                </div>
              )}
            </div>
          </Col>
        </Row>
        <hr />

        {/* <Col>
        interestsFlag
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
        </Col> */}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  StateWorkExp: state.sectionWorkexperince.data.allwork,
  EducationState: state.sectionEducation.data.education,
  sectionReferences: state.sectionReferences.references.content_references,
  sectionQualifications:
    state.sectionQualifications.qualifications.content_Qualifications,
  sectionInterests: state.sectionInterests.interests.content_intersets,
});

const mapDispatchToProps = (dispatch) => ({
  GET_Education: (currentUser, id, toast) =>
    dispatch(GET_Education(currentUser, id, toast)),
  Get_Workexperince: (currentUser, id) =>
    dispatch(Get_Workexperince(currentUser, id)),
  Get_References: (currentUser, id) =>
    dispatch(Get_References(currentUser, id)),
  Get_Qualifications: (currentUser, id) =>
    dispatch(Get_Qualifications(currentUser, id)),
  Get_Interest: (currentUser, id) => dispatch(Get_Interest(currentUser, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
