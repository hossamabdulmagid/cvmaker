import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddToList } from "../../../redux/addtolist/addtolistAction";
import { connect } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/core";
import { ButtonForWork, Rapperd, P, Strong } from "./workexperience.styles";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";

const Workexperience = (props) => {
  const { AddToList, currentUser, cvs } = props;

  const { id } = useParams();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  const finalRef = React.useRef();

  const { handleSubmit, register, getValues, errors } = useForm();

  const value = getValues();

  const [workexperinceform, setWorkexperinceform] = useState({
    workexperience: {
      companyname: "",
      startwork: "",
      endwork: "",
      position: "",
    },
  });

  const { companyname, startwork, endwork, position } = workexperinceform;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorkexperinceform({ ...workexperinceform, [name]: value });
  };

  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/workexperience`
    );

    let dataToBeSave = {
      workexperience: {
        companyname: companyname || "",
        startwork: startwork || "",
        endwork: endwork || "",
        position: position || "",
      },
    };

    await cvRef.set(dataToBeSave);
    onClose();
    toast({
      title: "Section updated.",
      description: `your cvs section workexperince has been updated`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`workexperience`)
      .get()
      .then(function (querySnapshot) {
        const workexpData = querySnapshot.data();

        if (workexpData) {
          setWorkexperinceform({
            companyname: workexpData.workexperience.companyname,
            startwork: workexpData.workexperience.startwork,
            endwork: workexpData.workexperience.endwork,
            position: workexpData.workexperience.position,
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
          <ButtonForWork
            className="buttonforpremium"
            variant="success"
            onClick={onOpen}
          >
            + WorkExpernice
          </ButtonForWork>
        </div>
      </div>
      <Rapperd>
        {!loading ? (
          <Rapperd>
            <P>
              CompanyName: <Strong>{companyname}</Strong>
            </P>
            <P>
              Start Work: <Strong>{startwork}</Strong>
            </P>
            <P>
              End Work: <Strong>{endwork}</Strong>
            </P>
            <P>
              Position: <Strong>{position}</Strong>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add your WorkExpernice</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormLabel>Company Name</FormLabel>
              <Input
                ref={register({ required: "this Feild is Required" })}
                name="companyname"
                value={companyname}
                onChange={handleChange}
                placeholder="CompanyName"
              />
              {errors.companyname && errors.companyname.message}
              <br />
              <FormLabel> Start Year</FormLabel>
              <Input
                ref={register({ required: "this Feild is Required" })}
                name="startwork"
                onChange={handleChange}
                value={startwork}
                placeholder="Graduation Year"
                type="date"
              />
              {errors.startwork && errors.startwork.message}
              <br />
              <FormLabel> End Year</FormLabel>
              <Input
                ref={register({ required: "this Feild is Required" })}
                name="endwork"
                placeholder="Graduation Year"
                onChange={handleChange}
                value={endwork}
                type="date"
              />
              {errors.endwork && errors.endwork.message}
              <br />
              <FormLabel> Postion</FormLabel>
              <Input
                ref={register({ required: "this Content is Required" })}
                name="position"
                placeholder="Position"
                onChange={handleChange}
                value={position}
                type="text"
              />
              {errors.position && errors.position.message}
              <br />
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

const mapDispatchToProps = (dispatch) => ({
  AddToList: () => dispatch(AddToList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workexperience);
