import React, { useState, useEffect, Fragment } from "react";
import {
  RapperColor,
  Container,
  Alert,
  Col,
  Buttons,
  IMG,
  Ul,
  Li,
  P,
  RapperSidebar,
  LinkForPremium,
  LinkOption,
  LINK,
  ButtonForAddNewSection,
  Span,
} from "./createcv.styles";
import NavGuest from "../../components/nav-guest/navGuest.component";
import {
  AiOutlineExclamation,
  AiTwotoneFolderOpen,
  AiTwotoneFileExcel,
  AiTwotonePlaySquare,
} from "react-icons/ai";
import BasicInfo from "./basicinfo/basicinfo.component";
import Education from "./education/education.component";
import { Spinner } from "@chakra-ui/core";
import Workexperience from "./workexperience/workexperience.component";
import References from "./references/references.component";
import Qualifications from "./qualifications/qualifications.component";
import Interests from "./interests/interests.component";
import { firestore } from "../../firebase/firebase.utils";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
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
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { AddToList } from "../../redux/addtolist/addtolistAction";

const CreateCv = ({ AddToList, currentUser }) => {
  const [sidebarRoutes, setSidebarRouter] = useState([
    { section: "Work experience" },
    { section: "Qualifications" },
    { section: "Education" },
    { section: "Interests" },
    { section: "References" },
  ]);

  const [activeSection, setActiveSection] = useState("Basic information");

  const [color, setColor] = React.useState("");

  const styles = {
    backgroundColor: color,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  const finalRef = React.useRef();
  const { id } = useParams();

  const { handleSubmit, register, getValues, errors } = useForm();
  const value = getValues();

  const onSubmit = (data) => {
    sidebarRoutes.push(data);
    setTimeout(() => {
      onClose();
    }, 500);
    console.log(data, `value is here`);
  };

  //console.log(value, `getValuesvalue`)

  useEffect(() => {
    AddToList(value);
  }, [AddToList, sidebarRoutes, currentUser]);

  /* new label name Section*/
  const [cvName, setCvName] = useState({
    _label: "",
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCvName({ ...cvName, [name]: value });
  };

  const onSubmitLabel = async (value) => {
    console.log(cvName._label, ` cvName._label`);
    await firestore
      .collection(`users/${currentUser.id}/cvs`)
      .doc(`${id}`)
      .update("_label", cvName._label);

    toast.success(`your cvs details has been updated`);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    firestore
      .doc(`users/${currentUser.id}/cvs/${id}`)

      .get()
      .then(function (querySnapshot) {
        console.log(querySnapshot.data(), `querySnapshot.data()`);
        const newData = querySnapshot.data();

        if (newData) {
          setCvName({
            _label: newData._label,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error, `there is was an error`);
        console.log(error, `there is was an error`);
      });
  }, [currentUser, id]);
  return (
    <>
      <NavGuest />
      <RapperColor>
        <Container className="container">
          {currentUser ? null : (
            <Alert>
              <LinkOption to="/login">
                <strong>You are not logged in.</strong>
                for download and save for now Or later editing, you will need to
                signup or login by clicking the 'Save' button (your CV will
                automatically be added to your account).
              </LinkOption>
            </Alert>
          )}

          <div className="cvName">
            {!loading ? (
              <form onSubmit={handleSubmit(onSubmitLabel)}>
                <Editable defaultValue={cvName.labelName}>
                  <EditablePreview />
                  <EditableInput
                    width="120px"
                    placeholder="cvName here"
                    type="text"
                    name="_label"
                    value={cvName._label}
                    ref={register()}
                    onChange={handleChange}
                  />
                  |{" "}
                  <Button className="btn btn-info" size="xs" type="submit">
                    Confirm
                  </Button>
                  <br />
                  Your Cv Name is : {cvName._label}
                </Editable>
              </form>
            ) : (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
            )}
            {/*
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg" />
          */}
          </div>
          <div className="row">
            <div className="col-5"></div>
            <div className="col-2">
              <LinkForPremium to="/cv">Show All Cv ♥</LinkForPremium>
            </div>
            <Col className="col-5">
              <Buttons size="xs" variant="success">
                {" "}
                <AiOutlineExclamation /> Help
              </Buttons>
              <Buttons size="xs" variant="success">
                {" "}
                <AiTwotoneFileExcel /> Quick preview
              </Buttons>
              {currentUser ? (
                <Fragment>
                  <Buttons size="xs" variant="success">
                    <AiTwotonePlaySquare />
                    Save
                  </Buttons>
                  <Buttons size="xs" variant="success">
                    <AiTwotoneFolderOpen />
                    Save & Download
                  </Buttons>
                </Fragment>
              ) : null}
            </Col>
            <br />
            <br />
            <RapperSidebar className="col-3">
              <Ul>
                <Li
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection("Basic information");
                  }}
                >
                  <LINK>Basic information</LINK>
                </Li>
                {sidebarRoutes.map((singleRouteforSidebar, x) => (
                  <Li
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(singleRouteforSidebar);
                    }}
                    key={x}
                  >
                    <LINK>{singleRouteforSidebar.section}</LINK>
                  </Li>
                ))}
                {/* {value.section === '' ?
                                    null :
                                    <Li>
                                        <LINK>
                                            {value.section}
                                        </LINK>
                                    </Li>
                                }
                                */}
                {currentUser ? (
                  <ButtonForAddNewSection onClick={onOpen} variant="success">
                    + New Section
                  </ButtonForAddNewSection>
                ) : (
                  <Span>*You must login to add newSection</Span>
                )}

                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add your section</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <ModalBody pb={6}>
                        <FormLabel>Section name</FormLabel>
                        <Input
                          placeholder="SectionName"
                          type="text"
                          name="section"
                          ref={register({
                            required: "this content is required",
                          })}
                        />
                        {errors.section && errors.section.message}
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          variantColor="blue"
                          mr={3}
                          type="submit"
                          onClick={AddToList}
                          onOpen
                        >
                          Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </ModalFooter>
                    </form>
                  </ModalContent>
                </Modal>
              </Ul>
              <small>
                * Click and drag section names in the above list to reorder
                sections in your CV.
              </small>{" "}
              <br />
              <small>
                * If you leave the fields in a section empty, the section will
                not appear in your CV.
              </small>
            </RapperSidebar>
            <div className="col-9">
              {activeSection === "Basic information" ? <BasicInfo /> : null}
              {activeSection === sidebarRoutes[0] ? <Workexperience /> : null}
              {activeSection === sidebarRoutes[1] ? <Qualifications /> : null}
              {activeSection === sidebarRoutes[2] ? <Education /> : null}
              {activeSection === sidebarRoutes[3] ? <Interests /> : null}
              {activeSection === sidebarRoutes[4] ? <References /> : null}
            </div>
          </div>
        </Container>
      </RapperColor>
      <div className="container-fluid">
        <div className="container">
          <IMG src="premum.png" alt="" />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  Routes: state.add.singleroutes,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  AddToList: (value) => dispatch(AddToList(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateCv);
