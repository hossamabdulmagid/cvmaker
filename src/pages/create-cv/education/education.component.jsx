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
import { ButtonForEducation, P, Rapperd, Strong } from "./education.styles";
import { connect } from "react-redux";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";

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
    },
  });

  const {
    collagename,
    startgraduationyear,
    endgraduationyear,
    eduactionmajor,
  } = education;

  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/education`
    );
    let dataToBeSaved = {
      education: {
        collagename: collagename || "",
        startgraduationyear: startgraduationyear || "",
        endgraduationyear: endgraduationyear || "",
        eduactionmajor: eduactionmajor || "",
      },
    };
    await cvRef.set(dataToBeSaved);
    onClose();
    toast({
      title: "Section updated.",
      description: `your cvs section education has been updated`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
  };

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
      .doc(`education`)
      .get()
      .then(function (querySnapshot) {
        const eduactionData = querySnapshot.data();

        if (eduactionData) {
          setEducation({
            collagename: eduactionData.education.collagename,
            startgraduationyear: eduactionData.education.startgraduationyear,
            endgraduationyear: eduactionData.education.endgraduationyear,
            eduactionmajor: eduactionData.education.eduactionmajor,
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
      <Rapperd>
        {!loading ? (
          <Rapperd>
            <P>
              CollageName: <Strong>{collagename}</Strong>
            </P>
            <P>
              StartGraduationYear: <Strong>{startgraduationyear}</Strong>
            </P>
            <P>
              EndGraduationYear: <Strong>{endgraduationyear}</Strong>
            </P>
            <P>
              Education Majoring : <Strong>{eduactionmajor}</Strong>
            </P>
          </Rapperd>
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        )}
      </Rapperd>

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
                placeholder="collage name"
              />
              {errors.collagename && errors.collagename.message}
              <br />
              <FormLabel>Start Year </FormLabel>
              <Input
                name="startgraduationyear"
                value={startgraduationyear}
                onChange={handleChange}
                type="date"
                ref={register({ required: "this Content is Required" })}
              />
              {errors.startgraduationyear && errors.startgraduationyear.message}
              <br />
              <FormLabel> End Year </FormLabel>
              <Input
                name="endgraduationyear"
                value={endgraduationyear}
                onChange={handleChange}
                type="date"
                ref={register({ required: "this Content is Required" })}
              />

              {errors.endgraduationyear && errors.endgraduationyear.message}
              <br />
              <FormLabel> Education Majoring </FormLabel>

              <Input
                name="eduactionmajor"
                value={eduactionmajor}
                onChange={handleChange}
                type="text"
                ref={register({ required: "this Content is Required" })}
              />

              {errors.eduactionmajor && errors.eduactionmajor.message}
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} type="submit">
                Save
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
