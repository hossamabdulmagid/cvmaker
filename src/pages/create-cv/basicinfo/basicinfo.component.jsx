import {
  useEffect,
  Fragment,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Input,
  Label,
  Containers,
  H4,
  IconEditNameOfSection,
  ButtonForSaveBasicInfo,
} from "./basicinfo.styles";
import { Row, Col, Container } from "react-bootstrap";
import { BsCheck } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useParams, useHistory, Progress } from "react-router-dom";
import { Spinner, useToast } from "@chakra-ui/core";
import { connect } from "react-redux";
import { Button } from "@chakra-ui/core";
import { firestore, storage } from "../../../firebase/firebase.utils";
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
} from "@chakra-ui/core";
import ImageUpload from "./uploadimage";
import {
  GetBasicInfo,
  Do_Submiting_BasicInfo,
} from "../../../redux/basicinfo/basicinfoAction";
const BasicInfo = (props) => {
  const {
    currentUser,
    match,
    doc,
    info,
    basicinfo,
    GetBasicInfo,
    basicInfoState = {},
    Do_Submiting_BasicInfo,
    oldId = [],
  } = props;

  const { id } = useParams();

  const toast = useToast();

  const history = useHistory();

  const { handleSubmit, register, errors, getValues, data } = useForm();

  const value = getValues();

  const [dataform, setDataform] = useState({
    basicinfo: {
      title: "",
      fullname: "",
      phone: "",
      email: "",
      address1: "",
      address2: "",
      address3: "",
      webSites: "",
      lastModified: new Date(),
    },
    type: "basicinfo",
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataform({ ...dataform, [name]: value });
  };
  const [FlagButton, setFlagButton] = useState(true);

  const onSubmit = async (value, data) => {
    let dataToBeSaved = {
      basicinfo: {
        title: dataform.title || "",
        fullname: dataform.fullname || "",
        phone: dataform.phone || "",
        email: dataform.email || "",
        address1: dataform.address1 || "",
        address2: dataform.address2 || "",
        address3: dataform.address3 || "",
        webSites: dataform.webSites || "",
        lastModified: new Date(),
        id,
      },
      type: dataform.type || "basicinfo",
    };
    await Do_Submiting_BasicInfo(currentUser, id, dataToBeSaved, toast);

    setFlagButton(false);
    setTimeout(() => {
      setFlagButton(true);
    }, 2000);
  };

  const isCurrent = useRef(true);

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    GetBasicInfo(currentUser, id, toast);

    // console.log(Object.keys(basicInfoState).length === 0, `Object.keys(basicInfoState).length > 10`)

    if (Object.keys(basicInfoState).length === 0) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setDataform({});
      //  console.log(basicInfoState, `basicinfoState..>>>>>>>>>>>>>>>`);

      console.log(dataform, `iam setting state with empty object {{}}`);
    } else {
      if (isCurrent.current) {
        if (basicInfoState.id) {
          setDataform({
            title: basicInfoState.title,
            fullname: basicInfoState.fullname,
            phone: basicInfoState.phone,
            address1: basicInfoState.address1,
            address2: basicInfoState.address2,
            address3: basicInfoState.address3,
            webSites: basicInfoState.webSites,
            email: basicInfoState.email,
            lastModified: basicInfoState.lastModified,
          });
        } else {
          setDataform({
            basicinfo: {
              title: "",
              fullname: "",
              phone: "",
              email: "",
              address1: "",
              address2: "",
              address3: "",
              webSites: "",
              lastModified: new Date(),
            },
            type: "basicinfo",
          });
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }
  }, [GetBasicInfo, currentUser, id, basicInfoState.id]);

  const [color, setColor] = useState("");

  const styles = {
    backgroundColor: color,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const finalRef = useRef();

  const [sectionName, setSectionName] = useState({
    sectionlabel: "",
  });

  const { sectionlabel } = sectionName;

  const handleChangeSectionName = (event) => {
    const { name, value } = event.target;
    setSectionName({ ...sectionName, [name]: value });
  };

  const onSubmitSectionLabel = async (value) => {
    await firestore
      .doc(`users/${currentUser.id}/cvs/${id}/data/Basicinfo`)
      .update(
        "basicinfo.title",
        `${sectionlabel}`,
        "basicinfo.lastModified",
        new Date()
      );

    onClose();

    toast({
      title: "section name updated.",
      description: `your SectionName updated  to : ${sectionName.sectionlabel} `,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  /*
  
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
  
    const handleChangeImage = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
    const handleUpload = () => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
            });
        }
      );
    };
  
    //  console.log("image :", image);
  */

  return (
    <Fragment>
      <Containers>
        {!loading ? (
          <>
            <Container>
              <form onSubmit={handleSubmit(onSubmit)}>
                <button
                  onClick={onOpen}
                  variant="success"
                  className="pull-right"
                >
                  <IconEditNameOfSection />
                </button>
                <Row>
                  <Col
                    xs={12}
                    s={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className="text-center rappertitlebasicinfo"
                  >
                    Title Section:
                    <H4>{`${sectionName.sectionlabel}` || dataform.title}</H4>
                  </Col>
                </Row>
                <Row
                  className="basicinfo"
                  bsPrefix="d-none d-md-flex d-lg-flex  d-xl-flex center-item"
                >
                  <Col md={6} lg={6} xl={6}>
                    <Label>Full name</Label>
                    <Input
                      name="fullname"
                      defaultValue={"" || dataform.fullname}
                      ref={register({ required: "*input is required" })}
                      placeholder="Full Name"
                      onChange={handleChange}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="1"
                    />
                    <small className="errorSectionName">
                      {errors.fullname && errors.fullname.message}
                    </small>
                    <Label>Phone numbers</Label>
                    <Input
                      name="phone"
                      value={dataform.phone}
                      placeholder="010 000 0000"
                      onChange={handleChange}
                      ref={register({ required: "*input is required" })}
                      required
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="2"
                    />
                    <small className="errorSectionName">
                      {errors.phone && errors.phone.message}
                    </small>
                    <hr />

                    <Label>Address Line 1</Label>

                    <Input
                      name="address1"
                      ref={register({ required: "*input is required" })}
                      placeholder="Country"
                      value={dataform.address1}
                      onChange={handleChange}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="3"
                    />

                    <small className="errorSectionName">
                      {errors.address1 && errors.address1.message}
                    </small>
                    <Label>Address Line 3</Label>
                    <Input
                      name="address3"
                      placeholder="Street"
                      ref={register()}
                      value={dataform.address3}
                      onChange={handleChange}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="4"
                    />

                    <small className="errorSectionName">
                      {errors.address3 && errors.address3.message}
                    </small>
                  </Col>
                  <hr />
                  <Col md={6} lg={6} xl={6}>
                    <Label>E-mail address</Label>
                    <Input
                      name="email"
                      value={dataform.email}
                      onChange={handleChange}
                      placeholder="Email"
                      ref={register({ required: "*input is required" })}
                      required
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="5"
                    />
                    <small className="errorSectionName">
                      {errors.email && errors.email.message}
                    </small>
                    <Label>Websites</Label>
                    <Input
                      name="webSites"
                      placeholder="https://www."
                      ref={register()}
                      value={dataform.webSites}
                      onChange={handleChange}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="6"
                    />
                    <small className="errorSectionName">
                      {errors.websites && errors.websites.message}
                    </small>
                    <hr />
                    <Label>Address Line 2</Label>
                    <Input
                      name="address2"
                      ref={register({ required: "*input is required" })}
                      placeholder="City"
                      value={dataform.address2}
                      onChange={handleChange}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="7"
                    />
                    <small className="errorSectionName">
                      {errors.address2 && errors.address2.message}
                    </small>
                    <ButtonForSaveBasicInfo
                      type="submit"
                      className="Deal"
                      size="sm"
                      variantColor="blue"
                    >
                      {!FlagButton ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="sm"
                        />
                      ) : (
                        "Save"
                      )}
                    </ButtonForSaveBasicInfo>
                  </Col>
                  <hr />
                </Row>
                <Row bsPrefix="d-block d-md-none d-lg-none d-xl-none center-item">
                  <Col xs={12} s={12}>
                    <Label>Full name</Label>
                    <Input
                      name="fullname"
                      value={dataform.fullname}
                      ref={register({ required: "*input is required" })}
                      placeholder="Full Name"
                      onChange={handleChange}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="1"
                    />
                    <small className="errorSectionName">
                      {errors.fullname && errors.fullname.message}
                    </small>
                    <Label>Phone numbers</Label>
                    <Input
                      name="phone"
                      value={dataform.phone}
                      placeholder="010 000 0000"
                      onChange={handleChange}
                      ref={register({ required: "*input is required" })}
                      required
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="2"
                    />
                    <small className="errorSectionName">
                      {errors.phone && errors.phone.message}
                    </small>

                    <Label>Address Line 1</Label>

                    <Input
                      name="address1"
                      ref={register({ required: "*input is required" })}
                      placeholder="Country"
                      value={dataform.address1}
                      onChange={handleChange}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="3"
                    />

                    <small className="errorSectionName">
                      {errors.address1 && errors.address1.message}
                    </small>
                    <Label>Address Line 3</Label>
                    <Input
                      name="address3"
                      placeholder="Street"
                      ref={register()}
                      value={dataform.address3}
                      onChange={handleChange}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="4"
                    />

                    <small className="errorSectionName">
                      {errors.address3 && errors.address3.message}
                    </small>

                    <Label>E-mail address</Label>
                    <Input
                      name="email"
                      value={dataform.email}
                      onChange={handleChange}
                      placeholder="Email"
                      ref={register({ required: "*input is required" })}
                      required
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="5"
                    />
                    <small className="errorSectionName">
                      {errors.email && errors.email.message}
                    </small>
                    <Label>Websites</Label>
                    <Input
                      name="webSites"
                      placeholder="https://www."
                      ref={register()}
                      value={dataform.webSites}
                      onChange={handleChange}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="6"
                    />
                    <small className="errorSectionName">
                      {errors.websites && errors.websites.message}
                    </small>
                    <Label>Address Line 2</Label>
                    <Input
                      name="address2"
                      ref={register({ required: "*input is required" })}
                      placeholder="City"
                      value={dataform.address2}
                      onChange={handleChange}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      tabIndex="7"
                    />
                    <small className="errorSectionName">
                      {errors.address2 && errors.address2.message}
                    </small>
                    <ButtonForSaveBasicInfo
                      type="submit"
                      className="Deal"
                      size="sm"
                      variantColor="blue"
                    >
                      {!FlagButton ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="sm"
                        />
                      ) : (
                        "Save"
                      )}
                    </ButtonForSaveBasicInfo>
                  </Col>
                </Row>

                {/*   <div className="row">
                  <Col lg={6} md={6} xs={12}>
                    <Upload type="file" onChange={handleChangeImage} />
                    <br />
                    <img
                      src={url || "http://via.placeholder.com/100"}
                      alt="firebase-image"
                    />
                  </Col>
                  <Col lg={6} md={6} xs={12} s={12}>
                    <Buttons onClick={handleUpload}>Upload</Buttons>
                    <br />
                    <br />
                    {url.length > 5 ? null : null}
                  </Col>
                </div>
                <ImageUpload />
                 */}
              </form>
            </Container>
          </>
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        )}

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          blockScrollOnMount={true}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Section Name</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmitSectionLabel)}>
              <ModalBody pb={6}>
                <FormLabel>Section name</FormLabel>
                <Input
                  placeholder="SectionName"
                  type="text"
                  name="sectionlabel"
                  onChange={handleChangeSectionName}
                  ref={register({
                    required: true,
                  })}
                />
                <small className="">
                  {errors && errors.sectionlabel && (
                    <label className="errorForEditSectionName">
                      {errors.sectionlabel.message || "SectionName is required"}
                    </label>
                  )}
                </small>
              </ModalBody>
              <ModalFooter>
                <Button
                  variantColor="blue"
                  mr={3}
                  type="submit"
                  className=""
                  onOpen
                >
                  Save
                </Button>
                <Button onClick={onClose} className="">
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Containers>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  basicInfoState: state.sectionBasicInfo.data.basicinfo,
  oldId: state.allSections.section,
});
const mapDispatchToProps = (dispatch) => ({
  GetBasicInfo: (currentUser, id, toast) =>
    dispatch(GetBasicInfo(currentUser, id, toast)),
  Do_Submiting_BasicInfo: (currentUser, id, dataToBeSaved, toast) =>
    dispatch(Do_Submiting_BasicInfo(currentUser, id, dataToBeSaved, toast)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
