import React, { useEffect, useState } from "react";
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
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
const Education = (props) => {
  const { currentUser } = props;
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const { handleSubmit, register, getValues, errors } = useForm();

  const value = getValues();
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

  const {
    collagename,
    startgraduationyear,
    endgraduationyear,
    eduactionmajor,
    lastModified,
  } = education;
  const [FlagButton, setFlagButton] = useState(true);

  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/Education`
    );
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
    await cvRef.set(dataToBeSaved);
    setFlagButton(false);
    setTimeout(() => {
      onClose();
      toast({
        title: "Section updated.",
        description: `your cvs section education has been updated`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }, 2000);
  };
  useEffect(() => {
    setFlagButton(true);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEducation({ ...education, [name]: value });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Education`)
      .get()
      .then(function (querySnapshot) {
        const eduactionData = querySnapshot.data();

        if (eduactionData) {
          setEducation({
            collagename: eduactionData.education.collagename,
            startgraduationyear: eduactionData.education.startgraduationyear,
            endgraduationyear: eduactionData.education.endgraduationyear,
            eduactionmajor: eduactionData.education.eduactionmajor,
            lastModified: eduactionData.education.lastModified,
          });
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.log(error, `there is was an error`);
      });
  }, [currentUser, id]);

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
});

export default connect(mapStateToProps, null)(Education);
