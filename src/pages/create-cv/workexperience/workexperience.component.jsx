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
  P,
  Strong,
  StrongMobile,
} from "./workexperience.styles";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const Workexperience = (props) => {
  const { AddToList, currentUser, cvs } = props;

  const { id } = useParams();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  const finalRef = React.useRef();

  const { handleSubmit, register, getValues, errors } = useForm();

  const value = getValues();
  const [workexp, setWorkexp] = useState([]);
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

  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/Workexperience`
    );

    workexp.push(workexperinceform);
    console.log(workexp, `arraytosend after pusing`);
    let dataToBeSave = {
      allwork: workexp,
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
    }, 2000);
  };

  const [loading, setLoading] = useState(true);
  const [oldworks, setOldWorks] = useState([]);
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
          setOldWorks(workexpData.allwork);

          /*setWorkexperinceform({
            companyname: workexpData.workexperience.companyname,
            startwork: workexpData.workexperience.startwork,
            endwork: workexpData.workexperience.endwork,
            position: workexpData.workexperience.position,
            lastModified: workexpData.workexperience.lastModified,
          }); */
        }
        setTimeout(() => {
          setLoading(false);
          console.log(oldworks, `fafff`);
        }, 3000);
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

  const saw = useMemo(() => {}, [setOldWorks, oldworks]);

  console.log(workexp.allwork, `$$$`);

  return (
    <Container>
      <Row>
        <div className="col-5">
          <ButtonForWork
            className="buttonforpremium"
            variant="success"
            onClick={onOpen}
          >
            + WorkExpernice
          </ButtonForWork>
        </div>
      </Row>
      <Rapperd>
        {!loading ? (
          <Fragment>
            <Row bsPrefix="d-none d-md-block d-lg-block  d-xl-block center-item">
              {oldworks.map((single, i) => (
                <Col
                  md={12}
                  lg={12}
                  xl={12}
                  className="text-center"
                  key={i}
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
              {oldworks.map((single, i) => (
                <Col
                  xs={12}
                  s={12}
                  className="text-center"
                  key={i}
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
                value={"" || companyname}
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
                value={"" || startwork}
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
                value={"" || endwork}
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
                value={"" || position}
                type="text"
              />
              <small className="error">
                {errors.position && errors.position.message}
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
