import React, { useState, useEffect, Fragment } from "react";
import {
  RapperColor,
  Containers,
  Alert,
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
  Aroow,
  RapperdForms,
} from "./createcv.styles";
import { Col } from "react-bootstrap";
import FormDeatils from "../../lib/form";
import NavGuest from "../../components/nav-guest/navGuest.component";
import {
  AiOutlineExclamation,
  AiTwotoneFolderOpen,
  AiTwotoneFileExcel,
  AiTwotonePlaySquare,
} from "react-icons/ai";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BasicInfo from "./basicinfo/basicinfo.component";
import Education from "./education/education.component";
import Workexperience from "./workexperience/workexperience.component";
import References from "./references/references.component";
import Qualifications from "./qualifications/qualifications.component";
import Interests from "./interests/interests.component";
import { firestore } from "../../firebase/firebase.utils";
import InputRadioBox from "./radiobox";
import { useParams, useHistory } from "react-router-dom";
import Editor from "../../lib/ckeditor";
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
  useToast,
  Spinner,
} from "@chakra-ui/core";
import { Button } from "react-bootstrap";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import InputCheckBox from "./checkbox";
import { Radio, RadioGroup, Stack } from "@chakra-ui/core";
import { Row } from "react-bootstrap";
const CreateCv = (props) => {
  const [sidebarRoutes, setSidebarRouter] = useState([
    { section: "basicinfo", type: "text", lastModified: new Date() },
    { section: "workexperience", type: "text", lastModified: new Date() },
    { section: "qualifications", type: "text", lastModified: new Date() },
    { section: "education", type: "text", lastModified: new Date() },
    { section: "interests", type: "text", lastModified: new Date() },
    { section: "references", type: "text", lastModified: new Date() },
  ]);
  const [displayDataToUI, setDisplayDataToUI] = useState(true);

  const { currentUser, details } = props;

  const [inputList, setInputList] = useState([]);

  const [editorList, setEditorList] = useState([]);

  const [activeSection, setActiveSection] = useState(sidebarRoutes[0].section);

  const toast = useToast();

  const [color, setColor] = React.useState("");

  const styles = {
    backgroundColor: color,
  };

  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  const finalRef = React.useRef();

  const { id } = useParams();

  const { handleSubmit, register, getValues, errors, data } = useForm();

  const value = getValues();

  const [sectionData, setSectionData] = useState({
    sectionName: {
      section: {
        title: "",
        name: "",
        start: "",
        end: "",
        description: "",
      },
      type: "",
      lastModified: new Date(),
    },
  });

  const { section, type } = sectionData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCvName({ ...cvName, [name]: value });
  };

  const handleChangeSection = (event) => {
    const { name, value } = event.target;
    setSectionData({ ...sectionData, [name]: value });
  };

  const [turnOf, setTurnOf] = useState("disabled='disabled'");

  const handleChangeCheckBox = async (isChecked) => {
    setTurnOf(isChecked);
  };

  const [flagButton, setFlagButton] = useState(true);

  const onSubmit = async (value, isChecked) => {
    /*  const SecRef = firestore.doc(
        `users/${currentUser.id}/cvs/${id}/data/${section}`
      );
  
      let dataToBeSaved = {
        sectionName: {
          section:
            {
              title: sectionData.sectionName.section.title || "",
              name: sectionData.sectionName.section.name || "",
              start: sectionData.sectionName.section.start || "",
              end: sectionData.sectionName.section.end || "",
              description: sectionData.sectionName.section.description || "",
            } || {},
          type: value.type || "",
          lastModified: new Date(),
        },
      };
      setFlagButton(false);
      await SecRef.set(dataToBeSaved); */

    sidebarRoutes.push({
      section: value.section,
      type: value.type,
      lastModified: new Date(),
    });
    array.push({
      section: value.section,
      type: value.type,
      lastModified: new Date(),
    });
    setFlagButton(false);
    setTimeout(() => {
      setFlagButton(true);
      setDisplayDataToUI(true);
      setActiveSection(value.type);
      onClose();
      toast({
        title: "Section created.",
        description: `Your new Section  name is : ${sectionData.section}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setTurnOf(isChecked);
    }, 2000);
  };

  const [cvName, setCvName] = useState({
    label: "your CvName",
  });

  const [loading, setLoading] = useState(true);

  const onSubmitLabel = async (value) => {
    await firestore
      .collection(`users/${currentUser.id}/cvs`)
      .doc(`${id}`)
      .update("label", cvName.label);
    toast({
      title: "cv name updated.",
      description: `your cvname updated  to : ${cvName.label} `,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
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
          console.log(newData, `newData@@@@ From CreateCv.jsx Line 218`);
          setCvName({
            label: newData.label,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: `there is was an error`,
          description: `${error}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(error, `there is was an error`);
      });
  }, [currentUser, id]);

  const [array, setArray] = useState([]);

  const [lastModified, setLastModified] = useState(new Date());

  const FetchData = async (value) => {
    await firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.data(), `############Data`);
          const data = doc.data();
          console.log(data, `*******`);
          console.log(doc.id, "@@@@@@@@@@@@@id");
          const newData = doc.id;
          console.log(data, `data.sectionName`);
          setLastModified(lastModified);
          if (newData) {
            array.unshift({
              section: newData.toString(),
              type: data.type || data.sectionName.type,
              lastModified,
            });
            console.log(array, `arra00000000000000000000000y comming from fb`);
            setTimeout(() => {
              setFlag(false);
            }, 50);
          }
        });
      })
      .catch((error) => {
        setFlag(false);
        toast({
          title: `there is was an error`,
          description: `${error} `,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(error, `there is was an error`);
      });
  };

  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    FetchData();
  }, [array, currentUser]);
  return (
    <Fragment>
      <NavGuest />
      <RapperColor className="container-fluid">
        <Containers className="container">
          <div className="row">
            {currentUser ? null : (
              <Alert>
                <LinkOption to="/login">
                  <strong>You are not logged in.</strong>
                  for download and save for now Or later editing, you will need
                  to signup or login by clicking the 'Save' button (your CV will
                  automatically be added to your account).
                </LinkOption>
              </Alert>
            )}
          </div>

          {!loading ? (
            <div className="row">
              <div className="col" xs={10} s={12} md={12} lg={12}>
                <RapperdForms>
                  <form onSubmit={handleSubmit(onSubmitLabel)}>
                    <Editable defaultValue={cvName.labelName}>
                      <EditablePreview />
                      <EditableInput
                        width="110px"
                        placeholder="cvName here"
                        type="text"
                        name="label"
                        value={cvName.label}
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
                      <strong className="labelcv"> {cvName.label}</strong>
                    </Editable>
                  </form>
                </RapperdForms>
              </div>
            </div>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          )}

          <div className="row">
            <Col xs={0} md={0} lg={4} />
            <Col xs={6} md={5} lg={4}>
              <AllCvLinks to="/cv">
                Show All Cv
                <Aroow />
              </AllCvLinks>
            </Col>
            <Col xs={6} md={7} lg={4}>
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
                Download
              </Buttons>
            </Col>
          </div>

          <div className="row">
            <Col className="col" xs={5} lg={3} md={3} xl={3}>
              <Ul>
                {!flag
                  ? array.map((singleRouteforSidebar, x) => (
                      <Li
                        key={x}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(singleRouteforSidebar.type);
                        }}
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
                  closeOnEsc={true}
                  autoFocus={true}
                  blockScrollOnMount={true}
                  allowPinchZoom={false}
                  // blockScrollOnMount={true}
                >
                  <ModalOverlay />1
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
                          onChange={handleChangeSection}
                          ref={register({
                            required: true,
                          })}
                        />
                        <div className="col-12">
                          {errors && errors.section && (
                            <label className="error">
                              {errors.section.message || "Section is required"}
                            </label>
                          )}
                        </div>
                        {errors.section && errors.section.message}
                        <InputCheckBox
                          refVal={register({ required: true })}
                          name="role"
                          labelText=""
                          id="checkbox-0"
                          value={true}
                          onChange={handleChangeCheckBox}
                          options={{
                            value: "agree Rules",
                            label: " Agree and understand",
                          }}
                        />
                        <div className="col-12">
                          {errors && errors.role && (
                            <label className="error">
                              {errors.role.message || "Role is required"}
                            </label>
                          )}
                        </div>
                        <div className="inputradiobox">
                          <InputRadioBox
                            refVal={register({ required: true })}
                            name="type"
                            id="checkbox-1"
                            labelText=""
                            value={true}
                            hint="You Will Be Added Basicform Details"
                            options={{
                              value: "text",
                              label: "Added Form",
                            }}
                            disabled={turnOf}
                            required
                          />

                          <InputRadioBox
                            refVal={register({ required: true })}
                            name="type"
                            id="checkbox-2"
                            labelText=""
                            value={false}
                            hint="You Will Be Added Editor Details"
                            options={{
                              value: "entry",
                              label: "Added Entry",
                            }}
                            disabled={turnOf}
                          />
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          variantcolor="blue"
                          mr={3}
                          type="submit"
                          className="buttonForSaveNewSection"
                          onOpen
                        >
                          {!flagButton ? <Spinner /> : "Save"}
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
            </Col>
            <div className="col" xs={7} md={10} lg={10}>
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
              {activeSection === "text" ? (
                <FormDeatils
                  array={array}
                  details={value.section}
                  displayDataToUI={displayDataToUI}
                  setDisplayDataToUI={setDisplayDataToUI}
                  sidebarRoutes={sidebarRoutes}
                />
              ) : null}

              {activeSection === "entry" ? (
                <Editor details={value.section} />
              ) : null}
            </div>
          </div>
        </Containers>
      </RapperColor>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, null)(CreateCv);
