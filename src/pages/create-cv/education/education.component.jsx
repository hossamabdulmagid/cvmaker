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
  Spinner
} from "@chakra-ui/core";
import { ButtonForEducation, P, Rapperd, Strong } from "./education.styles";
import { connect } from "react-redux";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Education = (props) => {
  const { AddToList, currentUser } = props;
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const { handleSubmit, register, getValues, errors } = useForm();

  const value = getValues();


  const [education, setEducation] = useState({
    collagename: "",
    startgraduationyear: "",
    endgraduationyear: "",
  });

  const { collagename, startgraduationyear, endgraduationyear } = education;
  useEffect(() => { }, [currentUser, id]);

  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/education`
    );
    await cvRef.set({
      collagename: education.collagename,
      startgraduationyear: education.startgraduationyear,
      endgraduationyear: education.endgraduationyear,
    });
    onClose();
    toast.success(`your cvs details has been updated`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEducation({ ...education, [name]: value });
  };




  const [loading, setLoading] = useState(false);
  useEffect(() => {
    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data(), `here should show data`);
          let objoo = doc.data();

          setEducation({
            collagename: objoo.collagename,
            startgraduationyear: objoo.startgraduationyear,
            endgraduationyear: objoo.endgraduationyear,
          });
          setLoading(true);
        });

      })
      .catch((error) => {
        console.log(`there is was an error`);
        setLoading(false);
      });
  }, []);


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
        {loading ? (<Rapperd>
          <P>
            CollageName: <Strong>{collagename}</Strong>
          </P>
          <P>
            StartGraduationYear: <Strong>{startgraduationyear}</Strong>
          </P>
          <P>
            EndGraduationYear: <Strong>{endgraduationyear}</Strong>
          </P>
        </Rapperd>) : (<Spinner />)}
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
                {errors.startgraduationyear &&
                  errors.startgraduationyear.message}
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
