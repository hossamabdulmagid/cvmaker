import {
  useState,
  useEffect,
  Fragment,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  RapperColor,
  Containers,
  Alert,
  Buttons,
  Ul,
  Li,
  AllCvLinks,
  SmallSideBar,
  LinkOption,
  LINK,
  ButtonForAddNewSection,
  Aroow,
  RapperdForms,
} from "./createcv.styles";
import { Col, Row } from "react-bootstrap";
import AddForm from "../../lib/addform";
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
import InputRadioBox from "./radiobox";
import { useParams, useHistory } from "react-router-dom";
import AddEditor from "../../lib/addckeditor";
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
import Paper from "../../components/paper/paper.component";
const CreateCv = (props) => {
  const [sidebarRoutes, setSidebarRouter] = useState([
    {
      section: "Basicinfo",
      type: "basicinfo",
      lastModified: new Date(),
      data: {
        concept: "",
        content_new: "",
        type: "",
        identiferId: null,
      },
    },
    {
      section: "Workexperience",
      type: "workexperience",
      lastModified: new Date(),
      data: {
        concept: "",
        content_new: "",
        type: "",
        identiferId: null,
      },
    },
    {
      section: "Qualifications",
      type: "qualifications",
      lastModified: new Date(),
      data: {
        concept: "",
        content_new: "",
        type: "",
        identiferId: null,
      },
    },
    {
      section: "Education",
      type: "education",
      lastModified: new Date(),
      data: {
        concept: "",
        content_new: "",
        type: "",
        identiferId: null,
      },
    },
    {
      section: "Interests",
      type: "interests",
      lastModified: new Date(),
      data: {
        concept: "",
        content_new: "",
        type: "",
        identiferId: null,
      },
    },
    {
      section: "References",
      type: "references",
      lastModified: new Date(),
      data: {
        concept: "",
        content_new: "",
        type: "",
        identiferId: null,
      },
    },
  ]);
  const [displayDataToUI, setDisplayDataToUI] = useState(true);

  const [expanded, setExpanded] = useState(false);

  const {
    currentUser,
    Get_allSection,
    GetNameOfCv,
    CvLabel,
    DoChangeNameofCv,
    allNameOfSections,
    tryflag,
    OldCvForUsers,
  } = props;

  const [ckeditorState, setCkeditorState] = useState({
    concept: "",
    content_new: "",
    type: "entry",
    identiferId: null,
  });

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

  const [formState, setFormState] = useState({
    concept: "",
    name: "",
    start: "",
    end: "",
    description: "",
    type: "text",
    lastModified: new Date(),
    identiferId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCvName({ ...cvName, [name]: value });
  };

  const handleChangeSection = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
    setCkeditorState({ ...ckeditorState, [name]: value });
    console.log(` ${formState.concept}`, `formState  while Changing`);
    console.log(` ${ckeditorState.concept}`, `ckeditorState   while Changing`);
  };

  const [turnOf, setTurnOf] = useState("disabled='disabled'");

  const handleChangeCheckBox = async (isChecked) => {
    setTurnOf(isChecked);
  };

  const [flagButton, setFlagButton] = useState(true);

  const onSubmit = async (value, isChecked) => {
    sidebarRoutes.push({
      section: value.concept,
      type: value.type,
      lastModified: new Date(),
    });
    array.push({
      section: value.concept,
      type: value.type,
      lastModified: new Date(),
    });
    setCkeditorState({ ...ckeditorState, content_new: "" });
    setFlagButton(false);
    setTimeout(() => {
      setFlagButton(true);
      setDisplayDataToUI(true);
      setActiveSection(value.type);
      onClose();
      toast({
        title: "Section created.",
        description: ` If you leave the fields in a section empty, the section will not
        appear in your CV : ${formState.concept}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setTurnOf(isChecked);
    }, 2000);
    setFormState({
      ...formState,
      name: "",
      start: "",
      end: "",
      description: "",
    });
  };

  const [cvName, setCvName] = useState({
    label: "YOUR CV NAME",
  });

  const [loading, setLoading] = useState(true);

  let NameCv = cvName.label;
  let c;
  const isCurrent = useRef(true);

  const onSubmitLabel = async (data) => {
    await DoChangeNameofCv(currentUser, id, NameCv, toast);
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

  const getLength = useCallback(() => {
    if (allNameOfSections.length > 5) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [allNameOfSections.length]);

  useLayoutEffect(() => {
    if (!currentUser) {
      return;
    }
    Get_allSection(currentUser, id);

    getLength();
  }, [
    Get_allSection,
    currentUser,
    id,
    getLength,
    allNameOfSections,
    allNameOfSections.length,
  ]);

  const getSelection = (newSelection) => {
    console.log(newSelection, `newSelection`);
    setCkeditorState({
      ...ckeditorState,
      concept: newSelection.data.concept || ckeditorState.concept,
      identiferId: newSelection.data.identiferId || ckeditorState.identiferId,
      content_new: newSelection.data.content_new || ckeditorState.content_new,
      type: ckeditorState.type,
    });
    // nothing to commit, working tree clean
    setFormState({
      ...formState,
      concept: newSelection.data.concept || formState.concept,
      name: newSelection.data.name || formState.name,
      start: newSelection.data.start || formState.start,
      end: newSelection.data.end || formState.end,
      description: newSelection.data.description || formState.description,
      type: formState.type,
      lastModified: newSelection.data.lastModified || formState.lastModified,
      identiferId: newSelection.data.identiferId || formState.identiferId,
    });
  };
  const PrintCv = () => {
    console.log(`!!@`);
    window.print();
  };

  console.log(allNameOfSections, `allNameOfSections`);
  return (
    <Fragment>
      <Paper
        Get_allSection={Get_allSection}
        allNameOfSections={allNameOfSections}
      />
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
            <div className="row no-printme">
              <div className="col" xs={10} s={12} md={12} lg={12}>
                <RapperdForms className="no-printme">
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

          <Row bsPrefix="d-none d-md-flex d-lg-flex  d-xl-flex center-item no-printme">
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
              <Buttons size="xs" variant="success" onClick={() => PrintCv()}>
                <AiTwotoneFileExcel />
                Quick preview
              </Buttons>
              <Buttons size="xs" variant="success" onClick={() => PrintCv()}>
                <AiTwotonePlaySquare />
                Save
              </Buttons>
              <Buttons size="xs" variant="success" onClick={() => PrintCv()}>
                <AiTwotoneFolderOpen />
                Download
              </Buttons>
            </Col>
          </Row>

          <Row bsPrefix="d-none d-md-flex d-lg-flex  d-xl-flex center-item">
            <Col lg={3} xl={3} md={3}>
              <Ul className="printme">
                {!flag
                  ? allNameOfSections.map((singleRouteforSidebar, x) => (
                      <Li
                        key={x}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(singleRouteforSidebar.type);
                          getSelection(singleRouteforSidebar);
                        }}
                      >
                        <LINK to="#">{singleRouteforSidebar.section}</LINK>
                      </Li>
                    ))
                  : sidebarRoutes.map((singleRouteforSidebar, x) => (
                      <Li
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(singleRouteforSidebar.type);
                          //  getSelection(singleRouteforSidebar)
                        }}
                        key={x}
                      >
                        <LINK to="#">{singleRouteforSidebar.section}</LINK>
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
                          name="concept"
                          onChange={handleChangeSection}
                          ref={register({
                            required: true,
                          })}
                        />

                        <div className="col-12">
                          {errors && errors.section && (
                            <label className="error">
                              {errors.concept.message || "Section is required"}
                            </label>
                          )}
                        </div>

                        {errors.concept && errors.concept.message}
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
                <AddForm
                  array={array}
                  formState={formState}
                  setFormState={setFormState}
                />
              ) : null}

              {activeSection === "entry" ? (
                <AddEditor
                  ckeditorState={ckeditorState}
                  setCkeditorState={setCkeditorState}
                />
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
                        ? allNameOfSections.map((singleRouteforSidebar, x) => (
                            <Li
                              key={x}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveSection(singleRouteforSidebar.type);
                                getSelection(singleRouteforSidebar);
                              }}
                            >
                              <LINK onClick={() => setExpanded(false)} to="#">
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
                                // getSelection(singleRouteforSidebar)
                              }}
                              key={x}
                            >
                              <LINK onClick={() => setExpanded(false)} to="#">
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
                                name="concept"
                                onChange={handleChangeSection}
                                ref={register({
                                  required: true,
                                })}
                              />
                              <div className="col-12">
                                {errors && errors.concept && (
                                  <label className="error">
                                    {errors.concept.message ||
                                      "Section is required"}
                                  </label>
                                )}
                              </div>
                              {errors.concept && errors.concept.message}
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
                <AddForm
                  array={array}
                  formState={formState}
                  setFormState={setFormState}
                />
              ) : null}

              {activeSection === "entry" ? (
                <AddEditor
                  ckeditorState={ckeditorState}
                  setCkeditorState={setCkeditorState}
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
  DoChangeNameofCv: (currentUser, id, NameCv, toast) =>
    dispatch(DoChangeNameofCv(currentUser, id, NameCv, toast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCv);
