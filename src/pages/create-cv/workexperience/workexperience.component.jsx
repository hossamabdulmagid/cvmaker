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
  Spinner
} from "@chakra-ui/core";
import { ButtonForWork, Rapperd, P, Strong } from "./workexperience.styles";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Workexperience = (props) => {
  const { AddToList, currentUser, cvs } = props;
  const { id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const { handleSubmit, register, getValues, errors } = useForm();

  const value = getValues();
  const [workexperinceform, setWorkexperinceform] = useState({
    companyname: "",
    startwork: "",
    endwork: "",
  });

  const { companyname, startwork, endwork } = workexperinceform;


  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/workexperience`
    );
    await cvRef.set({
      companyname: workexperinceform.companyname,
      startwork: workexperinceform.startwork,
      endwork: workexperinceform.endwork,
    });
    onClose();
    toast.success(`your cvs details has been updated`);
  };



  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorkexperinceform({ ...workexperinceform, [name]: value });
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
          let obj = doc.data();
          setWorkexperinceform({
            companyname: obj.companyname,
            startwork: obj.startwork,
            endwork: obj.endwork,
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
        {loading ? (
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
          </Rapperd>) : (<Spinner />)}

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
  AddToList: () => dispatch(AddToList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workexperience);
