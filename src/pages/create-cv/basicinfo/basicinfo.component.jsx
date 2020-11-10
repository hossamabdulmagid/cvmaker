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

  useEffect(() => {}, [currentUser, id]);

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
    FullName: "",
    Phone: "",
    Email: "",
    Address1: "",
    Address2: "",
    Address3: "",
    WebSites: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataform({ ...dataform, [name]: value });
  };

  const onSubmit = async (value) => {
    const cvRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/basicinfo`
    );
    await cvRef.set({
      basicinfo: {
        FullName: dataform.FullName,
        Phone: dataform.Phone,
        Email: dataform.Email,
        Address1: dataform.Address1,
        Address2: dataform.Address2,
        Address3: dataform.Address3,
        WebSites: dataform.WebSites,
      },
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
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let data = doc.data();
          console.log(doc.id, " => ", doc.data(), `here should show data`);
        });
        setLoading(true);
      })
      .catch((error) => {
        console.log(`there is was an error`);
        setLoading(false);
      });
  }, [data.basicinfo]);

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
                    defaultValue={dataform.fullname}
                    ref={register()}
                    onChange={handleChange}
                  />
                  {errors.fullname && errors.fullname.message}

                  <Label>Phone numbers</Label>
                  <Input
                    name="phone"
                    value={dataform.phone}
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
                    value={dataform.address1}
                    onChange={handleChange}
                  />
                  {errors.address1 && errors.address1.message}

                  <Label>Address Line 3</Label>
                  <Input
                    name="address3"
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
                    ref={register({ required: " feild is Required" })}
                  />
                  {errors.email && errors.email.message}

                  <Label>Websites</Label>
                  <Input
                    name="websites"
                    ref={register()}
                    value={dataform.websites}
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
