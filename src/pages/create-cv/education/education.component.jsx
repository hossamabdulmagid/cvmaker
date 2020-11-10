import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AddToList } from "../../../redux/addtolist/addtolistAction";
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
} from "@chakra-ui/core";
import { ButtonForEducation, P, Rapperd, Strong } from "./education.styles";
import { connect } from "react-redux";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Education = (props) => {
  const { AddToList, currentUser } = props;
  const { id } = useParams();

  const [education, setEducation] = useState({
    CollageName: "",
    StartGraduationYear: "",
    EndGraduationYear: "",
  });
  const { EndGraduationYear, StartGraduationYear, CollageName } = education;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEducation({ ...education, [name]: value });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const { handleSubmit, register, getValues, errors } = useForm();

  const value = getValues();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [currentUser]);
  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/education`
    );
    await cvRef.set({
      CollageName: education.CollageName,
      StartGraduationYear: education.StartGraduationYear,
      EndGraduationYear: education.EndGraduationYear,
    });
    onClose();
    toast.success(`your cvs details has been updated`);
  };

  console.log(education.CollageName, `education.CollageName`);

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
        <Rapperd>
          <P>
            collageName: <Strong>{CollageName}</Strong>
          </P>
          <P>
            Start Year: <Strong>{StartGraduationYear}</Strong>
          </P>
          <P>
            End Year: <Strong>{EndGraduationYear}</Strong>
          </P>
        </Rapperd>
      </Rapperd>

      <>
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
                  name="CollageName"
                  value={education.CollageName}
                  onChange={handleChange}
                  ref={register({ required: "this Content is Required" })}
                  placeholder="collage name"
                />
                {errors.CollageName && errors.CollageName.message}
                <br />
                <FormLabel>Start Year </FormLabel>
                <Input
                  name="StartGraduationYear"
                  value={education.StartGraduationYear}
                  onChange={handleChange}
                  type="date"
                  ref={register({ required: "this Content is Required" })}
                />
                {errors.StartGraduationYear &&
                  errors.StartGraduationYear.message}
                <br />
                <FormLabel> End Year </FormLabel>

                <Input
                  name="EndGraduationYear"
                  value={education.EndGraduationYear}
                  type="date"
                  onChange={handleChange}
                  ref={register({ required: "this Content is Required" })}
                />

                {errors.EndGraduationYear && errors.EndGraduationYear.message}
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
      </>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  AddToList: (value) => dispatch(AddToList(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Education);
