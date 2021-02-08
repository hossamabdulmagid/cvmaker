import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
  useToast,
} from "@chakra-ui/core";
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
    if (!currentUser) {
      return;
    }

    GET_Education(currentUser, id, toast);

    if (EducationState) {
      console.log(`iam already Setting the State`);
      setEducation({
        collagename: EducationState.collagename,
        startgraduationyear: EducationState.startgraduationyear,
        endgraduationyear: EducationState.endgraduationyear,
        eduactionmajor: EducationState.eduactionmajor,
        lastModified: EducationState.lastModified,
      });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [GET_Education, currentUser, id, toast]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  const { handleSubmit, register, getValues, errors } = useForm();

  const value = getValues();
  const {
    collagename,
    startgraduationyear,
    endgraduationyear,
    eduactionmajor,
    lastModified,
  } = education;

  const [FlagButton, setFlagButton] = useState(true);

  const onSubmit = async (value) => {
    let dataToBeSaved = {
      education: {
        collagename: collagename || "",
        startgraduationyear: startgraduationyear || "",
        endgraduationyear: endgraduationyear || "",
        eduactionmajor: eduactionmajor || "",
        lastModified: new Date(),
      },
      type: "education",
    };

    await Do_Submiting_Education(currentUser, id, dataToBeSaved, toast);
    setTimeout(() => {
      setFlagButton(false);
    }, 1000);

    setTimeout(() => {
      onClose();
    }, 2000);
  };
  useEffect(() => {
    return () => {
      setFlagButton(true);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEducation({ ...education, [name]: value });
  };

  const [loading, setLoading] = useState(true);

  return (
    <div className="container">
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
          <Rapperd>
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

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your Eduction</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormLabel>Collage name</FormLabel>
              <Input
                name="collagename"
                value={collagename}
                onChange={handleChange}
                ref={register({ required: "this Content is Required" })}
                placeholder="Collage Name"
              />
              <small className="error">
                {errors.collagename && errors.collagename.message}
              </small>
              <br />
              <FormLabel>Start Year </FormLabel>
              <Input
                name="startgraduationyear"
                value={startgraduationyear}
                onChange={handleChange}
                type="date"
                ref={register({ required: "this Content is Required" })}
              />
              <small className="error">
                {errors.startgraduationyear &&
                  errors.startgraduationyear.message}
              </small>
              <br />

              <FormLabel> End Year </FormLabel>
              <Input
                name="endgraduationyear"
                value={endgraduationyear}
                onChange={handleChange}
                type="date"
                ref={register({ required: "this Content is Required" })}
              />
              <small className="error">
                {errors.endgraduationyear && errors.endgraduationyear.message}
              </small>
              <br />

              <FormLabel> Education Majoring </FormLabel>
              <Input
                name="eduactionmajor"
                value={eduactionmajor}
                onChange={handleChange}
                type="text"
                placeholder="Collage Majoring"
                ref={register({ required: "this Content is Required" })}
              />
              <small className="error">
                {errors.eduactionmajor && errors.eduactionmajor.message}
              </small>
              <br />
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} type="submit">
                {!FlagButton ? <Spinner /> : "Save"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
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
