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

  const history = useHistory();

  const { handleSubmit, register, errors, getValues } = useForm();

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
      fullname: dataform.fullname || "",
      phone: dataform.phone || "",
      email: dataform.email || "",
      address1: dataform.address1 || "",
      address2: dataform.address2 || "",
      address3: dataform.address3 || "",
      webSites: dataform.webSites || "",
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
        const newData = querySnapshot.data();
        if (newData) {
          setDataform({
            fullname: newData.fullname,
            phone: newData.phone,
            address1: newData.address1,
            address2: newData.address2,
            address3: newData.address3,
            webSites: newData.webSites,
            email: newData.email,
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
  return (
    <Fragment>
      <Container className="container-fluid">
        {!loading ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <Title> </Title>
              <div className="row">
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
              <br />
              <hr />
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
