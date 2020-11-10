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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { ButtonForWork, Rapperd, P, Strong } from "./workexperience.styles";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Workexperience = ({ AddToList, currentUser, cvs }) => {
  const { id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const { handleSubmit, register, getValues, errors } = useForm();

  const value = getValues();

  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/workexperience`
    );
    await cvRef.set({
      Company: value.companyname,
      StartWork: value.startwork,
      EndWork: value.endwork,
    });
    onClose();
    toast.success(`your cvs details has been updated`);
  };

  useEffect(() => {
    //  console.log(currentUser.cvs._id, `bla bla bla`)
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <ButtonForWork
            className="buttonforpremium"
            variant="success"
            onClick={onOpen}
          >
            {" "}
            +WorkExpernice
          </ButtonForWork>
        </div>
      </div>
      {/*   <Rapperd>
                {work.filter((singlework, idx) => idx < 2).map((singlework, i) => (
                    <Rapperd key={i}>
                        <P>
                            CompanyName:  <Strong>{singlework.companyName}</Strong>
                        </P>
                        <P>
                            Start Work:  <Strong>{singlework.startWork}</Strong>
                        </P>
                        <P>
                            End Work:  <Strong>{singlework.endWork}</Strong>

                        </P>
                    </Rapperd>
                ))}
            </Rapperd>
            */}
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
                placeholder="CompanyName"
              />
              {errors.companyname && errors.companyname.message}
              <br />
              <FormLabel> Start Year</FormLabel>
              <Input
                ref={register({ required: "this Feild is Required" })}
                name="startwork"
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
                type="date"
              />
              {errors.endwork && errors.endwork.message}
              <br />
            </ModalBody>

            <ModalFooter>
              <Button
                variantColor="blue"
                mr={3}
                onClick={AddToList}
                type="submit"
              >
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
  AddToList: (value) => dispatch(AddToList(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workexperience);
