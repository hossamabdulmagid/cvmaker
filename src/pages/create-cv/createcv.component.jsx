import { useState, useEffect, Fragment, useRef, useLayoutEffect } from "react";
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
  SmallSideBar,
  LinkOption,
  LINK,
  ButtonForAddNewSection,
  Aroow,
  RapperdForms,
} from "./createcv.styles";
import { Col, Row, Container } from "react-bootstrap";
import FormDeatils from "../../lib/form";
import NavGuest from "../../components/nav-guest/navGuest.component";
import {
  AiOutlineExclamation,
  AiTwotoneFolderOpen,
  AiTwotoneFileExcel,
  AiTwotonePlaySquare,
} from "react-icons/ai";
import BasicInfo from "./basicinfo/basicinfo.component";
import Education from "./education/education.component";
import Workexperience from "./workexperience/workexperience.component";
import References from "./references/references.component";
import Qualifications from "./qualifications/qualifications.component";
import Interests from "./interests/interests.component";
import { firestore } from "../../firebase/firebase.utils";
import InputRadioBox from "./radiobox";
import { useParams, useHistory, Link } from "react-router-dom";
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
  Button,
} from "@chakra-ui/core";
import { Navbar, Nav } from "react-bootstrap";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import InputCheckBox from "./checkbox";
import { Get_allSection } from "../../redux/allsections/allsectionsAction";
import {
  GetNameOfCv,
  DoChangeNameofCv,
} from "../../redux/createnewcv/createnewcvAction";
const CreateCv = (props) => {
  const [sidebarRoutes, setSidebarRouter] = useState([
    {
      section: "Basicinfo",
      type: "basicinfo",
      lastModified: new Date(),
    },
    {
      section: "Workexperience",
      type: "workexperience",
      lastModified: new Date(),
    },
    {
      section: "Qualifications",
      type: "qualifications",
      lastModified: new Date(),
    },
    {
      section: "Education",
      type: "education",
      lastModified: new Date(),
    },
    {
      section: "Interests",
      type: "interests",
      lastModified: new Date(),
    },
    {
      section: "References",
      type: "references",
      lastModified: new Date(),
    },
  ]);
  const [displayDataToUI, setDisplayDataToUI] = useState(true);

  const [expanded, setExpanded] = useState(false);

  const {
    currentUser,
    details,
    Get_allSection,
    GetNameOfCv,
    CvLabel,
    DoChangeNameofCv,
    allNameOfSections,
    tryflag,
    OldCvForUsers,
  } = props;

  const [activeSection, setActiveSection] = useState(sidebarRoutes[0].type);

  const toast = useToast();

  const [color, setColor] = useState("");

  const styles = {
    backgroundColor: color,
  };

  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const finalRef = useRef();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
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
        position: "top-left",
      });
      setTurnOf(isChecked);
    }, 2000);
  };

  const [cvName, setCvName] = useState({
    label: "YOUR CV NAME",
  });

  const [loading, setLoading] = useState(true);

  let sawsaw = cvName.label;

  const isCurrent = useRef(true);

  const onSubmitLabel = async (data) => {
    await DoChangeNameofCv(currentUser, id, sawsaw, toast);
  };

  useEffect(() => {
    return () => {
      //cleaning Ref

      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    GetNameOfCv(currentUser, id);

    setTimeout(() => {
      if (isCurrent.current) {
        setCvName({
          label: CvLabel.data.label,
        });
        setLoading(false);
      }
    }, 100);
  }, [GetNameOfCv, currentUser, id, CvLabel.data.label]);

  const [array, setArray] = useState([]);

  const [lastModified, setLastModified] = useState(new Date());

  const [flag, setFlag] = useState(true);

  useLayoutEffect(() => {
    console.log(`iam Runniing First Re Render`);
    if (!currentUser) {
      return;
    }

    Get_allSection(currentUser, id);
  }, [Get_allSection, currentUser, id]);

  useEffect(() => {
    //console.log(OldCvForUsers, `OldCvForUsers`)
    //console.log(allNameOfSections, `allNameOfSections`)

    if (allNameOfSections.length > 5) {
      // console.log(`${currentUser.id}/cvs/${id}`, `checkthe Route Of Cv`)
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [setFlag, allNameOfSections.length]);

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
                    <Editable defaultValue={""}>
                      <EditablePreview />
                      <EditableInput
                        width="110px"
                        type="text"
                        name="label"
                        value={cvName.label || ""}
                        refVal={register()}
                        onChange={handleChange}
                      />
                      <Button
                        variantColor="blue"
                        size="xs"
                        className="buttonforlabelcv"
                        type="submit"
                      >
                        Confirm
                      </Button>
                      <br />
                      Your Cv Name is :
                      <strong className="labelcv">{cvName.label}</strong>
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

          <Row bsPrefix="d-none d-md-flex d-lg-flex  d-xl-flex center-item">
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
          </Row>

          <Row bsPrefix="d-none d-md-flex d-lg-flex  d-xl-flex center-item">
            <Col lg={3} xl={3} md={3}>
              <Ul>
                {!flag
                  ? allNameOfSections.map((singleRouteforSidebar, x) => (
                      <Li
                        key={x}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(singleRouteforSidebar.type);
                        }}
                      >
                        <LINK to>{singleRouteforSidebar.section}</LINK>
                      </Li>
                    ))
                  : sidebarRoutes.map((singleRouteforSidebar, x) => (
                      <Li
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(singleRouteforSidebar.type);
                        }}
                        key={x}
                      >
                        <LINK to>{singleRouteforSidebar.section}</LINK>
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
              <Col bsPrefix="d-block d-md-none d-lg-none d-xl-none center-item">
                <small>
                  * Click and drag section names in the above list to reorder
                  sections in your CV.
                </small>
                <small>
                  * If you leave the fields in a section empty, the section will
                  not appear in your CV.
                </small>
              </Col>
            </Col>
            <Col xl={8} md={8} lg={8}>
              {activeSection === sidebarRoutes[0].type ? <BasicInfo /> : null}
              {activeSection === sidebarRoutes[1].type ? (
                <Workexperience />
              ) : null}
              {activeSection === sidebarRoutes[2].type ? (
                <Qualifications />
              ) : null}
              {activeSection === sidebarRoutes[3].type ? <Education /> : null}
              {activeSection === sidebarRoutes[4].type ? <Interests /> : null}
              {activeSection === sidebarRoutes[5].type ? <References /> : null}
              {activeSection === "text" ? (
                <FormDeatils
                  array={array}
                  details={value.section}
                  displayDataToUI={displayDataToUI}
                  setDisplayDataToUI={setDisplayDataToUI}
                  sidebarRoutes={sidebarRoutes}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              ) : null}

              {activeSection === "entry" ? (
                <Editor details={value.section} />
              ) : null}
            </Col>
          </Row>
          <Row bsPrefix="d-block d-md-none d-lg-none d-xl-none  center-item">
            <Col>
              <Navbar bg="light" expand="sm" dir="rtl" expanded={expanded}>
                <Navbar.Brand>
                  <Col xs={6} md={5} lg={4}>
                    <AllCvLinks to="/cv">
                      <Aroow />
                      Show All Cv
                    </AllCvLinks>
                  </Col>
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  onClick={() => setExpanded(expanded ? false : "expanded")}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
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
                              <LINK onClick={() => setExpanded(false)}>
                                {singleRouteforSidebar.section}
                              </LINK>
                            </Li>
                          ))
                        : sidebarRoutes.map((singleRouteforSidebar, x) => (
                            <Li
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveSection(singleRouteforSidebar.type);
                              }}
                              key={x}
                            >
                              <LINK onClick={() => setExpanded(false)}>
                                {singleRouteforSidebar.section}
                              </LINK>
                            </Li>
                          ))}
                      <ButtonForAddNewSection
                        onClick={onOpen}
                        variant="success"
                      >
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
                                onChange={handleChangeSection}
                                ref={register({
                                  required: true,
                                })}
                              />
                              <div className="col-12">
                                {errors && errors.section && (
                                  <label className="error">
                                    {errors.section.message ||
                                      "Section is required"}
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
                                variantColor="blue"
                                mr={3}
                                type="submit"
                                className="buttonForSaveNewSection Deal"
                                onOpen
                              >
                                {!flagButton ? <Spinner /> : "Save"}
                              </Button>
                              <Button
                                onClick={onClose}
                                className="buttonForCancleNewSection Deal"
                              >
                                Cancel
                              </Button>
                            </ModalFooter>
                          </form>
                        </ModalContent>
                      </Modal>
                    </Ul>
                    <Col bsPrefix="d-block d-md-none d-lg-none d-xl-none center-item">
                      <SmallSideBar>
                        Click and drag section names in the above list to
                        reorder sections in your CV.
                      </SmallSideBar>
                      <SmallSideBar>
                        If you leave the fields in a section empty, the section
                        will not appear in your CV.
                      </SmallSideBar>
                    </Col>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
            <Col xs={12} s={12}>
              {activeSection === sidebarRoutes[0].type ? <BasicInfo /> : null}
              {activeSection === sidebarRoutes[1].type ? (
                <Workexperience />
              ) : null}
              {activeSection === sidebarRoutes[2].type ? (
                <Qualifications />
              ) : null}
              {activeSection === sidebarRoutes[3].type ? <Education /> : null}
              {activeSection === sidebarRoutes[4].type ? <Interests /> : null}
              {activeSection === sidebarRoutes[5].type ? <References /> : null}
              {activeSection === "text" ? (
                <FormDeatils
                  array={array}
                  details={value.section}
                  displayDataToUI={displayDataToUI}
                  setDisplayDataToUI={setDisplayDataToUI}
                  sidebarRoutes={sidebarRoutes}
                  activeSection={activeSection}
                />
              ) : null}

              {activeSection === "entry" ? (
                <Editor
                  details={value.section}
                  array={array}
                  setLastModified={setLastModified}
                  lastModified={lastModified}
                  setFlag={setFlag}
                  flag={flag}
                />
              ) : null}
            </Col>
          </Row>
        </Containers>
      </RapperColor>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  sectionData: state.data,
  CvLabel: state.createnewcv,
  allNameOfSections: state.allSections.section,
  tryflag: state.allSections.Flag,
  OldCvForUsers: state.allOldCv.oldCv,
});

const mapDispatchToProps = (dispatch) => ({
  Get_allSection: (currentUser, id, toast) =>
    dispatch(Get_allSection(currentUser, id, toast)),
  GetNameOfCv: (currnetUser, id) => dispatch(GetNameOfCv(currnetUser, id)),
  DoChangeNameofCv: (currentUser, id, sawsaw, toast) =>
    dispatch(DoChangeNameofCv(currentUser, id, sawsaw, toast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCv);
