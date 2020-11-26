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
} from "./basicinfo.styles";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { Spinner } from "@chakra-ui/core";
import { Button } from "@chakra-ui/core";
import { connect } from "react-redux";
import { firestore, storage } from "../../../firebase/firebase.utils";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Progress } from "@chakra-ui/core";
const BasicInfo = (props) => {
  const { currentUser, match, doc, info, basicinfo } = props;

  const { id } = useParams();

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
      },
    };
    await cvRef.set(dataToBeSaved);

    toast.info(`your section basicinfo has been updated`);
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
            fullname: newData.basicinfo.fullname,
            phone: newData.basicinfo.phone,
            address1: newData.basicinfo.address1,
            address2: newData.basicinfo.address2,
            address3: newData.basicinfo.address3,
            webSites: newData.basicinfo.webSites,
            email: newData.basicinfo.email,
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

  return (
    <Fragment>
      <Container className="container-fluid">
        {!loading ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <Title> </Title>
              <div className="row basicinfo">
                <div className="col-6">
                  <Label>Full name</Label>
                  <Input
                    name="fullname"
                    value={dataform.fullname}
                    ref={register()}
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <br />
                  {errors.fullname && errors.fullname.message}
                  <Label>Phone numbers</Label>
                  <Input
                    name="phone"
                    value={dataform.phone}
                    placeholder="010 000 0000"
                    onChange={handleChange}
                    ref={register({ required: "this input is required" })}
                    required
                  />
                  <br />

                  {errors.phone && errors.phone.message}

                  <hr />
                  <Label>Address Line 1</Label>
                  <Input
                    name="address1"
                    ref={register()}
                    placeholder="Country"
                    value={dataform.address1}
                    onChange={handleChange}
                  />
                  {errors.address1 && errors.address1.message}

                  <Label>Address Line 3</Label>
                  <Input
                    name="address3"
                    placeholder="Street"
                    ref={register()}
                    value={dataform.address3}
                    onChange={handleChange}
                  />
                  {errors.address3 && errors.address3.message}
                </div>
                <hr />
                <div className="col-6">
                  <Label>E-mail address</Label>
                  <Input
                    name="email"
                    value={dataform.email}
                    onChange={handleChange}
                    placeholder="Email"
                    ref={register({ required: "this input is required" })}
                    required
                  />{" "}
                  <br />
                  {errors.email && errors.email.message}
                  <Label>Websites</Label>
                  <Input
                    name="webSites"
                    placeholder="https://www."
                    ref={register()}
                    value={dataform.webSites}
                    onChange={handleChange}
                  />
                  {errors.websites && errors.websites.message}
                  <hr />
                  <Label>Address Line 2</Label>
                  <Input
                    name="address2"
                    ref={register()}
                    placeholder="City"
                    value={dataform.address2}
                    onChange={handleChange}
                  />
                  {errors.address2 && errors.address2.message}
                  <br />
                  <br />
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
                  {url.length > 5 ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Show you image
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
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
      </Container>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(BasicInfo);
