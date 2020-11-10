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
import { firestore } from "../../../firebase/firebase.utils";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const BasicInfo = (props) => {
  const { currentUser, match, doc, info, basicinfo } = props;

  const { id } = useParams();

  console.log("current cv id is ", id);

  useEffect(() => { }, [currentUser, id]);

  const [allcv, setAllcv] = useState([]);
  const [data, setData] = useState({});
  const history = useHistory();

  const {
    handleSubmit,
    register,
    errors,
    getValues,
    userAuth,
    cvs,
    cid,
  } = useForm();

  const value = getValues();

  const [dataform, setDataform] = useState({
    fullname: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
    webSites: "",
  });

  const {
    fullname,
    phone,
    email,
    address1,
    address2,
    address3,
    webSites,

  } = dataform;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataform({ ...dataform, [name]: value });
  };

  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/basicinfo`
    );
    await cvRef.set({
      fullname: dataform.fullname,
      phone: dataform.phone,
      email: dataform.email,
      address1: dataform.address1,
      address2: dataform.address2,
      address3: dataform.address3,
      webSites: dataform.webSites,
    });
    toast.success(`your cvs details has been updated`);
  };

  // Add a new document in collection "cities"

  const [loading, setLoading] = useState(false);

  // here was an useEffect

  useEffect(() => {
    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot, obj) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data(), `here should show data`);
          let obj = doc.data();
          setDataform({
            fullname: obj.fullname,
            phone: obj.phone,
            email: obj.email,
            address1: obj.address1,
            address2: obj.address2,
            address3: obj.address3,
            webSites: obj.webSites,
          })
          console.log(dataform, `dataform is heeeeeeeeer`)

        });

        setLoading(true);
      })
      .catch((error) => {
        console.log(`there is was an error`);
        setLoading(false);
      });
  }, []);


  return (
    <Fragment>
      <Container className="container-fluid">
        {loading ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <Title> </Title>
              <div className="row">
                <div className="col-6">
                  <Label>Full name</Label>

                  <Input
                    name="fullname"
                    value={fullname}
                    ref={register()}
                    onChange={handleChange}
                  />
                  {errors.fullname && errors.fullname.message}

                  <Label>Phone numbers</Label>
                  <Input
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    ref={register({ required: " feild is Required" })}
                  />
                  <br />

                  {errors.phone && errors.phone.message}

                  <hr />
                  <Label>Address Line 1</Label>
                  <Input
                    name="address1"
                    ref={register()}
                    value={address1}
                    onChange={handleChange}
                  />
                  {errors.address1 && errors.address1.message}

                  <Label>Address Line 3</Label>
                  <Input
                    name="address3"
                    ref={register()}
                    value={address3}
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
                    ref={register({ required: " feild is Required" })}
                  />
                  {errors.email && errors.email.message}

                  <Label>Websites</Label>
                  <Input
                    name="webSites"
                    ref={register()}
                    value={webSites}
                    onChange={handleChange}
                  />
                  {errors.websites && errors.websites.message}

                  <hr />
                  <Label>Address Line 2</Label>
                  <Input
                    name="address2"
                    ref={register()}
                    value={dataform.address2}
                    onChange={handleChange}
                  />
                  {errors.address2 && errors.address2.message}

                  <br />
                  <br />
                  <Button type="submit" variantColor="teal" variant="ghost">
                    Save
                  </Button>
                  {/*
                                <Button variantColor="green" type="submit" className="Buttonforgreen">Save</Button>
                            */}
                </div>
                <hr />
              </div>
              <br />
              <hr />
              {currentUser ? (
                <>
                  <P>You have to be logged in to upload your photo</P>
                  <hr />

                  <div className="row">
                    <div className="col-6">
                      <Upload id="" type="file" />
                    </div>
                    <div className="col-6">
                      <Buttons>upload</Buttons>
                      <Buttons>save</Buttons>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </form>
        ) : (
            <Spinner />
          )}
      </Container>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(BasicInfo);
