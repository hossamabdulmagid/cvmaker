import React, { useEffect, useState, Fragment } from "react";
import { firestore } from "../firebase/firebase.utils";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/core";
import { useToast, Input, Textarea, Spinner } from "@chakra-ui/core";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { Rapperd } from "./styles";

const FormDeatils = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(currentUser, `from user Selector`);

  const { array, sidebarRoutes, sectionData } = props;
  const { handleSubmit, register, getValues, errors, data } = useForm();
  const value = getValues();
  const toast = useToast();

  const [state, setState] = useState({
    title: {
      title: "",
      name: "",
      start: "",
      end: "",
      description: "",
    },
    type: "text",
  });
  const { id } = useParams();
  const { title, name, start, end, description } = state;

  const HandleChangenewData = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const [FlagButton, setFlagButton] = useState(true);

  useEffect(() => {}, [currentUser.id]);

  useEffect(() => {
    setFlagButton(true);
  }, []);

  const onSubmit = async (data) => {
    if (!currentUser.id) {
      return;
    }
    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/${title}`
    );
    let dataToBeSaved = {
      title: {
        title: state.title || "",
        name: state.name || "",
        start: state.start || "",
        end: state.end || "",
        description: state.description || "",
      },
      type: state.type || "text",
    };

    await SecRef.set(dataToBeSaved);
    sidebarRoutes.push({
      section: sectionData.section,
      type: sectionData.type,
      lastModified: new Date(),
    });
    array.push({
      section: sectionData.section,
      type: sectionData.type,
      lastModified: new Date(),
    });
    console.log(data);
    setFlagButton(false);
    setTimeout(() => {
      setFlagButton(true);
      toast({
        title: "Section Updated.",
        description: `Your new Section  name is : ${title}`,
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }, 2000);
  };
  useEffect(() => {}, [currentUser, id]);

  const [displayDataToUI, setDisplayDataToUI] = useState(true);
  const FetchData = async (value) => {
    await firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.data(), `############Data from new Form`);
          const data = doc.data();
          console.log(data, `******* from new Form`);
          console.log(doc.id, "@@@@@@@@@@@@@id from new Form");
          const newData = doc.id;
          console.log(data, `data.from new Form`);
          // setLastModified(lastModified);
          if (newData) {
            array.unshift({
              section: newData.toString(),
              type: data.type || data.sectionName.type,
              // lastModified,
            });
            console.log(array, `array comming from fb`);
            setTimeout(() => {
              // setFlag(false);
            }, 50);
          }
        });
      })
      .catch((error) => {
        //setFlag(false);
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
  return (
    <Fragment>
      <div className="container">
        {!displayDataToUI ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              ref={register({ required: true })}
              placeholder="title"
              name="title"
              type="text"
              //value={title}
              onChange={HandleChangenewData}
            />
            <strong className="col-12">
              {errors && errors.title && (
                <label className="error">
                  {errors.title.message || "title is required"}
                </label>
              )}
            </strong>
            <Input
              ref={register({ required: true })}
              placeholder="name"
              name="name"
              type="text"
              // value={name}
              onChange={HandleChangenewData}
            />
            <strong className="col-12">
              {errors && errors.name && (
                <label className="error">
                  {errors.name.message || "name is required"}
                </label>
              )}
            </strong>
            <Input
              ref={register({ required: true })}
              placeholder="start"
              name="start"
              type="text"
              //value={start}
              onChange={HandleChangenewData}
            />
            <strong className="col-12">
              {errors && errors.start && (
                <label className="error">
                  {errors.start.message || "start is required"}
                </label>
              )}
            </strong>
            <Input
              ref={register({ required: true })}
              placeholder="end"
              name="end"
              type="text"
              //value={end}
              onChange={HandleChangenewData}
            />
            <strong className="col-12">
              {errors && errors.end && (
                <label className="error">
                  {errors.end.message || "end is required"}
                </label>
              )}
            </strong>
            <Textarea
              ref={register({ required: true })}
              placeholder="description  here"
              type="textarea"
              name="description"
              // value={description}
              onChange={HandleChangenewData}
            />
            <strong className="col-12">
              {errors && errors.description && (
                <label className="error">
                  {errors.description.message || "description is required"}
                </label>
              )}
            </strong>
            <div className="someThing">
              <Button
                type="submit"
                className="buttonSavenewFrom"
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
              </Button>
            </div>
          </form>
        ) : (
          <Rapperd>
            <Rapperd>
              <p className="pFornewFormSection">
                Title: <strong>{"companyname"}</strong>
              </p>
              <p className="pFornewFormSection">
                Name: <strong>{"startwork"}</strong>
              </p>
              <p className="pFornewFormSection">
                Start: <strong>{"endwork"}</strong>
              </p>
              <p className="pFornewFormSection">
                End: <strong>{"position"}</strong>
              </p>
              <p className="pFornewFormSection">
                Description: <strong>{"position"}</strong>
              </p>
            </Rapperd>
          </Rapperd>
        )}
      </div>
    </Fragment>
  );
};
/*
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
*/
export default /*connect(mapStateToProps) */ FormDeatils;
