import { useEffect, useState, useRef } from "react";
import { useDisclosure, Spinner, useToast } from "@chakra-ui/core";
import AddEducation from "./addEducation.component";
import {
  ButtonForEducation,
  P,
  Rapperd,
  Strong,
  StrongMobile,
} from "./education.styles";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  GET_Education,
  Do_Submiting_Education,
} from "../../../redux/education/educationAction";

const Education = (props) => {
  const {
    currentUser,
    GET_Education,
    Do_Submiting_Education,
    EducationState,
  } = props;

  const { id } = useParams();

  const toast = useToast();

  const isCurrent = useRef(true);

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

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
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
      }
      setLoading(false);
    }
  }, [
    GET_Education,
    currentUser,
    id,
    toast,
    setEducation,
    EducationState.identiferId,
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const finalRef = useRef();

  const {
    collagename,
    startgraduationyear,
    endgraduationyear,
    eduactionmajor,
    lastModified,
  } = education;

  const [FlagButton, setFlagButton] = useState(true);

  useEffect(() => {
    return () => {
      setFlagButton(true);
    };
  }, []);

  const [loading, setLoading] = useState(true);

  return (
    <div className="container no-printme">
      <div className="row">
        <div className="col-5">
          <ButtonForEducation
            className="buttonforpremium"
            variant="success"
            onClick={onOpen}
          >
            + Education
          </ButtonForEducation>
        </div>
      </div>

      {!loading ? (
        <>
          <Rapperd className="no-printme">
            <Row bsPrefix="d-none d-md-block d-lg-block  d-xl-block center-item">
              <Col md={12} lg={12} xl={12} className="text-center">
                <P>
                  CollageName: <Strong>{collagename}</Strong>
                </P>
                <hr />
                <P>
                  StartGraduationYear: <Strong>{startgraduationyear}</Strong>
                </P>
                <hr />
                <P>
                  EndGraduationYear: <Strong>{endgraduationyear}</Strong>
                </P>
                <hr />
                <P>
                  Education Majoring: <Strong>{eduactionmajor}</Strong>
                </P>
              </Col>
            </Row>
            <Row bsPrefix="d-block d-md-none d-lg-none d-xl-none center-item">
              <Col xs={12} s={12} className="text-center">
                <p>
                  CollageName
                  <StrongMobile>{collagename}</StrongMobile>
                </p>
                <hr />
                <p>
                  StartGraduationYear
                  <StrongMobile>{startgraduationyear}</StrongMobile>
                </p>
                <hr />
                <p>
                  EndGraduationYear
                  <StrongMobile>{endgraduationyear}</StrongMobile>
                </p>
                <hr />
                <p>
                  Education Majoring
                  <StrongMobile>{eduactionmajor}</StrongMobile>
                </p>
              </Col>
            </Row>
          </Rapperd>
        </>
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="lg"
        />
      )}

      <>
        <AddEducation
          setFlagButton={setFlagButton}
          FlagButton={FlagButton}
          initialRef={initialRef}
          finalRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          Do_Submiting_Education={Do_Submiting_Education}
          collagename={collagename}
          startgraduationyear={startgraduationyear}
          endgraduationyear={endgraduationyear}
          eduactionmajor={eduactionmajor}
          setEducation={setEducation}
          education={education}
          currentUser={currentUser}
          id={id}
          toast={toast}
        />
      </>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  EducationState: state.sectionEducation.data.education,
});

const mapDispatchToProps = (dispatch) => ({
  GET_Education: (currentUser, id, toast) =>
    dispatch(GET_Education(currentUser, id, toast)),
  Do_Submiting_Education: (currentUser, id, dataToBeSaved, toast) =>
    dispatch(Do_Submiting_Education(currentUser, id, dataToBeSaved, toast)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Education);
