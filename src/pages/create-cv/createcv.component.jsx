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
  AllCvLinks,
  LinkOption,
  LINK,
  ButtonForAddNewSection,
  Span,
  Aroow,
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
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { Button } from "react-bootstrap";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { AddToList } from "../../redux/addtolist/addtolistAction";
const CreateCv = ({ AddToList, currentUser }) => {
  const [sidebarRoutes, setSidebarRouter] = useState([
    { section: "basicinfo", type: "text" },
    { section: "workexperience", type: "text" },
    { section: "qualifications", type: "text" },
    { section: "education", type: "text" },
    { section: "interests", type: "text" },
    { section: "references", type: "text" },
  ]);
  const [activeSection, setActiveSection] = useState(sidebarRoutes[0].section);

  const [color, setColor] = React.useState("");

  const styles = {
    backgroundColor: color,
  };

  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  const finalRef = React.useRef();
  const { id } = useParams();

  const { handleSubmit, register, getValues, errors } = useForm();
  const value = getValues();

  /*
    const onSubmit = (data) => {
      sidebarRoutes.push({ section: data.section, type: "" });
      console.log(sidebarRoutes, `sidebarRoutes after on submit`);
      setTimeout(() => {
        onClose();
      }, 500);
      console.log(data, `value is here`);
    };
    
  */
  const [sectionData, setSectionData] = useState({
    sectionName: {
      section: "",
      type: "",
    },
  });

  const { section, type } = sectionData;

  const onSubmit = async (value) => {
    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/${section}`
    );
    let dataToBeSaved = {
      sectionName: {
        section: sectionData.section || "",
        type: sectionData.type || "",
      },
    };
    await SecRef.set(dataToBeSaved);

    setTimeout(() => {
      onClose();
    }, 500);

    toast.info(`Your New Section  Has Been Added`);
  };

  const [cvName, setCvName] = useState({
    _label: "your CvName",
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCvName({ ...cvName, [name]: value });
  };

  const handleChangeSection = (event) => {
    const { name, value } = event.target;
    setSectionData({ ...sectionData, [name]: value });
  };

  const onSubmitLabel = async (value) => {
    await firestore
      .collection(`users/${currentUser.id}/cvs`)
      .doc(`${id}`)
      .update("_label", cvName._label);

    toast.info(`your cvs details has been updated`);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    firestore
      .doc(`users/${currentUser.id}/cvs/${id}`)

      .get()
      .then(function (querySnapshot) {
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

  const [array, setArray] = useState([]);

  const FetchData = async () => {
    await firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.data(), `############Data`);
          console.log(doc.id, "@@@@@@@@@@@@@id");
          const newData = doc.id;
          if (newData) {
            array.unshift({ section: newData.toString(), type: "" });

            setTimeout(() => {
              setFlag(false);
            }, 50);
          }
        });
      })
      .catch((error) => {
        setFlag(false);
        toast.error(error, `there is was an error`);
        console.log(error, `there is was an error`);
      });
  };
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    FetchData();

    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    return () => FetchData();
  }, [array, currentUser]);

  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log("render!");

    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    return () => console.log("unmounting...");
  });

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
                    width="110px"
                    placeholder="cvName here"
                    type="text"
                    name="_label"
                    value={cvName._label}
                    ref={register()}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="buttonforlabelcv"
                    type="submit"
                  >
                    Confirm
                  </Button>
                  <br />
                  Your Cv Name is :
                  <strong className="labelcv"> {cvName._label}</strong>
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
          </div>
          <div className="row">
            <div className="col-5"></div>
            <div className="col-2">
              <AllCvLinks to="/cv">
                Show All Cv
                <Aroow />
              </AllCvLinks>
            </div>
            <Col className="col-5">
              <Buttons size="xs" variant="success">
                <AiOutlineExclamation />
                Help
              </Buttons>
              <Buttons size="xs" variant="success">
                <AiTwotoneFileExcel />
                Quick preview
              </Buttons>
              <Buttons size="xs" variant="success">
                <AiTwotonePlaySquare />
                Save
              </Buttons>
              <Buttons size="xs" variant="success">
                <AiTwotoneFolderOpen />
                Save & Download
              </Buttons>
            </Col>

            <RapperSidebar className="col-3">
              <Ul>
                {!flag
                  ? array.map((singleRouteforSidebar, x) => (
                      <Li
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(singleRouteforSidebar.section);
                        }}
                        key={x}
                      >
                        <LINK>{singleRouteforSidebar.section}</LINK>
                      </Li>
                    ))
                  : sidebarRoutes.map((singleRouteforSidebar, x) => (
                      <Li
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(singleRouteforSidebar.section);
                        }}
                        key={x}
                      >
                        <LINK>{singleRouteforSidebar.section}</LINK>
                      </Li>
                    ))}

                <ButtonForAddNewSection onClick={onOpen} variant="success">
                  + New Section
                </ButtonForAddNewSection>
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
                          value={sectionData.section}
                          onChange={handleChangeSection}
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
                          className="buttonForSaveNewSection"
                          onOpen
                        >
                          Save
                        </Button>
                        <Button
                          onClick={onClose}
                          className="buttonForCancleNewSection"
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </form>
                  </ModalContent>
                </Modal>
              </Ul>
              <small>
                * Click and drag section names in the above list to reorder
                sections in your CV.
              </small>
              <br />
              <small>
                * If you leave the fields in a section empty, the section will
                not appear in your CV.
              </small>
            </RapperSidebar>
            <div className="col-9">
              {activeSection === sidebarRoutes[0].section ? (
                <BasicInfo />
              ) : null}
              {activeSection === sidebarRoutes[1].section ? (
                <Workexperience />
              ) : null}
              {activeSection === sidebarRoutes[2].section ? (
                <Qualifications />
              ) : null}
              {activeSection === sidebarRoutes[3].section ? (
                <Education />
              ) : null}
              {activeSection === sidebarRoutes[4].section ? (
                <Interests />
              ) : null}
              {activeSection === sidebarRoutes[5].section ? (
                <References />
              ) : null}

              {/*
              {activeSection === sidebarRoutes[5] ? <References /> : null}
              {activeSection === sidebarRoutes[6] ? <References /> : null}
              {activeSection === sidebarRoutes[7] ? <References /> : null}
              {activeSection === sidebarRoutes[8] ? <References /> : null}
              */}
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
  currentUser: state.user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  //AddToList: (value) => dispatch(AddToList(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateCv);
