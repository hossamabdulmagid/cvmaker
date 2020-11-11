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
  const { currentUser, match, doc, info, basicinfo, UniqeIdForUser } = props;

  const { id } = useParams();


  useEffect(() => {
    //    console.log(UniqeIdForUser, `UniqeIdForUser`)
  }, [currentUser, id]);

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

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target.value;
    setDataform({ ...dataform, [name]: value });
  };

  const onSubmit = async (value) => {
    try {
      const cvRef = await firestore.doc(
        `users/${currentUser.id}/cvs/${id}/data/basicinfo`
      );

      await cvRef.set({
        fullname: fullname,
        phone: phone,
        email: email,
        address1: address1,
        address2: address2,
        address3: address3,
        webSites: webSites,
      });

      toast.success(`your cvs details has been updated`);

    } catch (error) {
      console.log(error, `error`)
      toast.error(`${error}You Must Edit In Your Feild`);
    }

  }

  // Add a new document in collection "cities"


  // here was an useEffect

  useEffect(() => {
    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data(), `here should show data`);
          let objz = doc.data();
          setDataform({
            fullname: objz.fullname,
            phone: objz.phone,
            email: objz.email,
            address1: objz.address1,
            address2: objz.address2,
            address3: objz.address3,
            webSites: objz.webSites,
          })
          setLoading(true);
        });

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
                    type="text"
                    ref={register({ required: " feild is Required" })}
                    onChange={handleChange}
                  />
                  {errors.fullname && errors.fullname.message}

                  <Label>Phone numbers</Label>
                  <Input
                    name="phone"
                    value={phone}
                    type='number'
                    onChange={handleChange}
                    ref={register({ required: " feild is Required" })}
                  />
                  <br />

                  {errors.phone && errors.phone.message}

                  <hr />
                  <Label>Address Line 1</Label>
                  <Input
                    name="address1"
                    ref={register({ required: " feild is Required" })}
                    value={address1}
                    type="text"
                    onChange={handleChange}
                  />
                  {errors.address1 && errors.address1.message}

                  <Label>Address Line 3</Label>
                  <Input
                    name="address3"
                    ref={register({ required: " feild is Required" })}
                    value={address3}
                    type="text"
                    onChange={handleChange}
                  />
                  {errors.address3 && errors.address3.message}
                </div>
                <hr />
                <div className="col-6">
                  <Label>E-mail address</Label>
                  <Input
                    name="email"
                    value={email}
                    type="email"
                    onChange={handleChange}
                    ref={register({ required: " feild is Required" })}
                  />
                  {errors.email && errors.email.message}

                  <Label>Websites</Label>
                  <Input
                    name="webSites"
                    ref={register({ required: " feild is Required" })}
                    value={webSites}
                    type="text"

                    onChange={handleChange}
                  />
                  {errors.websites && errors.websites.message}

                  <hr />
                  <Label>Address Line 2</Label>
                  <Input
                    name="address2"
                    ref={register({ required: " feild is Required" })}
                    value={address2}
                    onChange={handleChange}
                    type="text"

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
  UniqeIdForUser: state.user.currentUser.id
});

export default connect(mapStateToProps, null)(BasicInfo);
