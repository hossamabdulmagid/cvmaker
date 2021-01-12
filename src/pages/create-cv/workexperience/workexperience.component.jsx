import React, { useState, useEffect, useMemo, Fragment } from "react";
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
import {
  ButtonForWork,
  Rapperd,
  ButtonFordeleteWork,
  P,
  Strong,
  StrongMobile,
  Icon,
} from "./workexperience.styles";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Workexperience = (props) => {
  const { AddToList, currentUser } = props;
  const { id } = useParams();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  const finalRef = React.useRef();

  const { handleSubmit, register, getValues, errors } = useForm();

  const value = getValues();

  const [allworkexp, setAllWorkexp] = useState([]);

  const [workexperinceform, setWorkexperinceform] = useState({
    companyname: "",
    startwork: "",
    endwork: "",
    position: "",
    lastModified: new Date(),
    type: "workexperience",
  });

  const {
    companyname,
    startwork,
    endwork,
    position,
    lastModified,
  } = workexperinceform;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorkexperinceform({ ...workexperinceform, [name]: value });
  };

  const [loading, setLoading] = useState(true);

  const onSubmit = async (_ID) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/Workexperience`
    );

    allworkexp.unshift(workexperinceform);

    let dataToBeSave = {
      allwork: [...allworkexp],
      type: "workexperience",
    };

    await cvRef.set(dataToBeSave);
    setFlagButton(false);
    setTimeout(() => {
      onClose();
      toast({
        title: "Section updated.",
        description: `your cvs section workexperince has been updated`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }, 200);
    setLoading(false);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Workexperience`)
      .get()
      .then(function (querySnapshot) {
        const workexpData = querySnapshot.data();

        if (workexpData) {
          workexpData.allwork.map((Singlejob) => allworkexp.push(Singlejob));

          setTimeout(() => {
            setLoading(false);
          }, 300);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error, `there is was an error`);
      });
  }, [currentUser, id]);

  const [FlagButton, setFlagButton] = useState(true);

  useEffect(() => {
    setFlagButton(true);
  }, []);
  const DeleteSingleJob = () => {
    firestore
      .collection(`users/${currentUser.id}/cvs/${id}/data`)
      .doc(`Workexperience`)
      .delete()
      .then(function () {
        setAllWorkexp([]);
        console.log("Document successfully deleted!");
        toast({
          title: "jobs has Been deleted.",
          description: `Document successfully deleted`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <Container>
      <Row>
        <div className="col-5">
          <ButtonForWork
            className="buttonforpremium"
            variant="success"
            onClick={() => onOpen()}
          >
            + WorkExpernice
          </ButtonForWork>
        </div>
        <Col xs={12} s={12} md={5} lg={5} xl={5}>
          {allworkexp.length ? (
            <ButtonFordeleteWork
              className="buttonforpremium"
              variant="success"
              onClick={() => DeleteSingleJob()}
            >
              - Clear Your Jobs
              <Icon />
            </ButtonFordeleteWork>
          ) : null}
        </Col>
      </Row>
      <Rapperd>
        {!loading ? (
          <Fragment>
            <Row bsPrefix="d-none d-md-block d-lg-block  d-xl-block center-item">
              {allworkexp.map((single, key) => (
                <Col
                  md={12}
                  lg={12}
                  xl={12}
                  className="text-center"
                  key={key}
                  id="idforcss"
                >
                  <P>
                    CompanyName:
                    <Strong>{single.companyname}</Strong>
                  </P>
                  <hr />
                  <P>
                    Start Work:
                    <Strong>{single.startwork}</Strong>
                  </P>
                  <hr />
                  <P>
                    End Work:
                    <Strong>{single.endwork}</Strong>
                  </P>
                  <hr />
                  <P>
                    Position:
                    <Strong>{single.position}</Strong>
                  </P>
                </Col>
              ))}
            </Row>

            <Row bsPrefix="d-block d-md-none d-lg-none d-xl-none center-item">
              {allworkexp.map((single, key) => (
                <Col
                  xs={12}
                  s={12}
                  className="text-center"
                  key={key}
                  id="idforcss"
                >
                  <p>
                    CompanyName
                    <StrongMobile>{single.companyname}</StrongMobile>
                  </p>
                  <hr />
                  <p>
                    Start Work
                    <StrongMobile>{single.startwork}</StrongMobile>
                  </p>
                  <hr />
                  <p>
                    End Work
                    <StrongMobile>{single.endwork}</StrongMobile>
                  </p>
                  <hr />
                  <p>
                    Position
                    <StrongMobile>{single.position}</StrongMobile>
                  </p>
                </Col>
              ))}
            </Row>
          </Fragment>
        ) : (
          <>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          </>
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
                //value={"" }
                onChange={handleChange}
                placeholder="CompanyName"
              />
              <small className="error">
                {errors.companyname && errors.companyname.message}
              </small>
              <br />
              <FormLabel> Start Year</FormLabel>
              <Input
                ref={register({ required: "this Feild is Required" })}
                name="startwork"
                onChange={handleChange}
                // value={"" || startwork}
                placeholder="Graduation Year"
                type="date"
              />
              <small className="error">
                {errors.startwork && errors.startwork.message}
              </small>
              <br />
              <FormLabel> End Year</FormLabel>
              <Input
                ref={register({ required: "this Feild is Required" })}
                name="endwork"
                placeholder="Graduation Year"
                onChange={handleChange}
                // value={"" || endwork}
                type="date"
              />
              <small className="error">
                {errors.endwork && errors.endwork.message}
              </small>
              <br />
              <FormLabel> Postion</FormLabel>
              <Input
                ref={register({ required: "this Content is Required" })}
                name="position"
                placeholder="Position"
                onChange={handleChange}
                // value={"" || position}
                type="text"
              />
              <small className="error">
                {errors.position && errors.position.message}
              </small>
              <br />
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} type="submit">
                Save
                {/*
                {!FlagButton ? <Spinner /> : "Save"}
              */}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  AddToList: () => dispatch(AddToList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workexperience);
