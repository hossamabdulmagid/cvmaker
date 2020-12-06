import React, { useEffect, Fragment, useState } from "react";
import {
  Title,
  Input,
  Label,
  P,
  Container,
  Span,
  IMG,
  Buttons,
  Upload,
  IconEditNameOfSection,
} from "./basicinfo.styles";
import { useForm } from "react-hook-form";
import { useParams, useHistory, Progress } from "react-router-dom";
import { Spinner, useToast, Button } from "@chakra-ui/core";
import { connect } from "react-redux";
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
const BasicInfo = (props) => {
  const { currentUser, match, doc, info, basicinfo } = props;

  const { id } = useParams();
  const toast = useToast();
  const history = useHistory();

  const { handleSubmit, register, errors, getValues } = useForm();

  const value = getValues();

  const [dataform, setDataform] = useState({
    basicinfo: {
      fullname: "",
      phone: "",
      email: "",
      address1: "",
      address2: "",
      address3: "",
      webSites: "",
      lastModified: new Date(),
    },
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataform({ ...dataform, [name]: value });
  };

  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/basicinfo`
    );
    let dataToBeSaved = {
      basicinfo: {
        fullname: dataform.fullname || "",
        phone: dataform.phone || "",
        email: dataform.email || "",
        address1: dataform.address1 || "",
        address2: dataform.address2 || "",
        address3: dataform.address3 || "",
        webSites: dataform.webSites || "",
        lastModified: new Date(),
      },
    };
    await cvRef.set(dataToBeSaved);
    toast({
      title: "Section updated.",
      description: `your section basicinfo has been updated`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`basicinfo`)
      .get()
      .then(function (querySnapshot) {
        console.log(querySnapshot, `querySnapshot from basic info`);
        const newData = querySnapshot.data();
        if (newData) {
          setDataform({
            basicinfo: {
              fullname: newData.basicinfo.fullname,
              phone: newData.basicinfo.phone,
              address1: newData.basicinfo.address1,
              address2: newData.basicinfo.address2,
              address3: newData.basicinfo.address3,
              webSites: newData.basicinfo.webSites,
              email: newData.basicinfo.email,
              lastModified: newData.basicinfo.lastModified,
            },
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

  console.log("image :", image);

  const [color, setColor] = React.useState("");

  const styles = {
    backgroundColor: color,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  const finalRef = React.useRef();
  const [sectionName, setSectionName] = useState({
    sectionlabel: "",
  });
  let { sectionlabel } = sectionName;
  const handleChangeSectionName = (event) => {
    const { name, value } = event.target;
    setSectionName({ ...sectionName, [name]: value });
  };

  const onSubmitSectionLabel = async (value) => {
    try {
      await firestore
        .collection(`users/${currentUser.id}/cvs`)
        .doc(`${id}/data`)
        .update("sectionName", sectionName.sectionlabel);
      toast({
        title: "section name updated.",
        description: `your SectionName updated  to : ${sectionName.sectionlabel} `,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log(error, `errror`);
    }
  };
  return (
    <Fragment>
      <Container className="container-fluid">
        {!loading ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="container">
                <button
                  onClick={onOpen}
                  variant="success"
                  className="pull-right"
                >
                  <IconEditNameOfSection />
                </button>

                <div className="row basicinfo">
                  <div className="col-6">
                    <Label>Full name</Label>
                    <Input
                      name="fullname"
                      value={dataform.fullname}
                      ref={register({ required: "*input is required" })}
                      placeholder="Full Name"
                      onChange={handleChange}
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
                    />

                    <small className="errorSectionName">
                      {errors.address3 && errors.address3.message}
                    </small>
                  </div>
                  <hr />
                  <div className="col-6">
                    <Label>E-mail address</Label>
                    <Input
                      name="email"
                      value={dataform.email}
                      onChange={handleChange}
                      placeholder="Email"
                      ref={register({ required: "*input is required" })}
                      required
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
                    />
                    <small className="errorSectionName">
                      {errors.address2 && errors.address2.message}
                    </small>
                    <Button type="submit" variantColor="teal" variant="ghost">
                      Save
                    </Button>
                  </div>
                  <hr />
                </div>

                <div className="row">
                  <div className="col-6">
                    <Upload id="" type="file" onChange={handleChangeImage} />
                    <br />
                    <img
                      src={url || "http://via.placeholder.com/100"}
                      alt="firebase-image"
                    />
                  </div>
                  <div className="col-6">
                    <Buttons onClick={handleUpload}>Upload</Buttons>
                    <br />
                    <br />
                    {url.length > 5 ? null : null}
                  </div>
                </div>
              </div>
            </form>
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
      </Container>
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
          <form onSubmit={handleSubmit(onSubmitSectionLabel)}>
            <ModalBody pb={6}>
              <FormLabel>Section name</FormLabel>
              <Input
                placeholder="SectionName"
                type="text"
                name="sectionlabel"
                value={sectionlabel}
                onChange={handleChangeSectionName}
                ref={register({
                  required: "*input is required",
                })}
              />
              <small className="errorSectionName">
                {errors.section && errors.section.message}
              </small>
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
              <Button onClick={onClose} className="buttonForCancleNewSection">
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(BasicInfo);
