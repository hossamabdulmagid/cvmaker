import React, { useState, useEffect, useMemo, Fragment, useRef } from "react";
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
  Strongs,
  StrongMobile,
  Icon,
} from "./workexperience.styles";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  Get_Workexperince,
  Do_Submiting_WorkExp,
  Do_Delete_Cv,
} from "../../../redux/workexperince/workexperinceAction";
const Workexperience = (props) => {
  const {
    AddToList,
    currentUser,
    Get_Workexperince,
    Do_Submiting_WorkExp,
    StateWorkExp = [],
    Do_Delete_Cv,
  } = props;

  const { id } = useParams();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const finalRef = useRef();

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

  const onSubmit = async (data, value) => {
    allworkexp.unshift(workexperinceform);

    let dataToBeSaved = {
      allwork: allworkexp,
      type: "workexperience",
    };
    setFlagButton(false);

    await Do_Submiting_WorkExp(currentUser, id, dataToBeSaved, toast);

    setTimeout(() => {
      setFlagButton(true);

      onClose();
    }, 2000);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  /*
    useEffect(() => {
      if (!currentUser) {
        return;
      }
      firestore
        .doc(`users/${currentUser.id}`)
        .collection(`cvs/${id}/data`)
        .doc(`Workexperience`)
        .get()
        .then((querySnapshot) => {
          const workexpData = querySnapshot.data();
          console.log(workexpData, `workexpData`)
   
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
  */
  const [flagButton, setFlagButton] = useState(true);

  useEffect(() => {
    setFlagButton(true);
  }, []);

  const DeleteSingleJob = () => {
    Do_Delete_Cv(currentUser, id, toast);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
    /*  firestore
        .collection(`users/${currentUser.id}/cvs/${id}/data`)
        .doc(`Workexperience`)
        .delete()
        .then(() => {
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
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
        */
  };

  const [displayData, setDisplayData] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!currentUser && !id) {
      return;
    }
    Get_Workexperince(currentUser, id);

    // console.log(StateWorkExp.allwork, `StateWorkExp`)

    //StateWorkExp.allwork = []
    //  console.log(StateWorkExp, `StateWorkExp`)
    if (Array.isArray(StateWorkExp)) {
      console.log(`true`);
      setLoading(false);
    } else {
      setDisplayData(false);
      console.log(`iam flase`);
    }
    return () => {
      //  console.log(StateWorkExp.allwork, `StateWorkExp`)
    };
  }, [Get_Workexperince, currentUser, id, StateWorkExp]);

  useEffect(() => {}, []);
  return (
    <Container>
      <Row>
        <Col xs={12} s={12} md={5} lg={5} xl={5}>
          <ButtonForWork
            className="buttonforpremium"
            variant="success"
            onClick={() => onOpen()}
          >
            + WorkExpernice
          </ButtonForWork>
        </Col>
        <Col xs={12} s={12} md={5} lg={5} xl={5}>
          {!loading ? (
            <ButtonFordeleteWork
              className="buttonforpremium"
              variant="success"
              onClick={() => DeleteSingleJob()}
            >
              - ClearYourJobs
              <Icon />
            </ButtonFordeleteWork>
          ) : null}
        </Col>
      </Row>
      <Rapperd>
        {!loading ? (
          <Fragment>
            <Row bsPrefix="d-none d-md-block d-lg-block  d-xl-block center-item">
              {StateWorkExp.map((single, key) => (
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
              )) || []}
            </Row>

            <Row bsPrefix="d-block d-md-none d-lg-none d-xl-none center-item">
              {StateWorkExp.map((single, key) => (
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
              )) || []}
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
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add your WorkExpernice</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormLabel>Company Name</FormLabel>
              <Input
                ref={register({ required: "Company Name Required" })}
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
                ref={register({ required: "Start Work Required" })}
                name="startwork"
                onChange={handleChange}
                type="date"
              />
              <small className="error">
                {errors.startwork && errors.startwork.message}
              </small>
              <br />
              <FormLabel> End Year</FormLabel>
              <Input
                ref={register({ required: "End Work  Required" })}
                name="endwork"
                onChange={handleChange}
                type="date"
              />
              <small className="error">
                {errors.endwork && errors.endwork.message}
              </small>
              <br />
              <FormLabel> Postion</FormLabel>
              <Input
                ref={register({ required: "Position Required" })}
                name="position"
                placeholder="Position"
                onChange={handleChange}
                type="text"
              />
              <small className="error">
                {errors.position && errors.position.message}
              </small>
              <br />
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} type="submit">
                {!flagButton ? <Spinner /> : "Save"}
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
  StateWorkExp: state.sectionWorkexperince.allwork,
});

const mapDispatchToProps = (dispatch) => ({
  AddToList: () => dispatch(AddToList()),
  Get_Workexperince: (currentUser, id) =>
    dispatch(Get_Workexperince(currentUser, id)),
  Do_Submiting_WorkExp: (currentUser, id, dataToBeSaved, toast) =>
    dispatch(Do_Submiting_WorkExp(currentUser, id, dataToBeSaved, toast)),
  Do_Delete_Cv: (currentUser, id, toast) =>
    dispatch(Do_Delete_Cv(currentUser, id, toast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workexperience);
