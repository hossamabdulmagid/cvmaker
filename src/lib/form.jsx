import React, { useEffect, useState, Fragment } from "react";
import { firestore } from "../firebase/firebase.utils";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/core";
import { useToast, Input, Textarea, Spinner } from "@chakra-ui/core";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { Rapperd } from "./styles";
import { BsCheck } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
const FormDeatils = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(props, `props every where every render`);
  const { array, sidebarRoutes, sectionData, details } = props;
  const { handleSubmit, register, getValues, errors, data } = useForm();
  const value = getValues();
  const toast = useToast();

  const [state, setState] = useState({
    title: {
      concept: "",
      name: "",
      start: "",
      end: "",
      description: "",
    },
    type: "text",
  });

  const { id } = useParams();
  const { concept, name, start, end, description, type } = state;

  const HandleChangenewData = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const [FlagButton, setFlagButton] = useState(true);

  useEffect(() => {}, [currentUser.id]);

  useEffect(() => {
    setFlagButton(true);
  }, []);

  const onSubmit = async (data, props) => {
    if (!currentUser.id) {
      return;
    }
    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/${value.concept}`
    );
    let dataToBeSaved = {
      title: {
        concept: value.concept || "",
        name: name || "",
        start: start || "",
        end: end || "",
        description: description || "",
      },
      type: type || "text",
    };

    await SecRef.set(dataToBeSaved);

    sidebarRoutes.push({
      section: data.title,
      type: state.type,
      lastModified: new Date(),
    });

    array.push({
      section: data.title,
      type: state.type,
      lastModified: new Date(),
    });

    setFlagButton(false);
    setTimeout(() => {
      setFlagButton(true);
      toast({
        title: "Section Updated.",
        description: `Your new Section  name is : ${value.concept}`,
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setDisplayDataToUI(false);
      setLoading(false);
    }, 2000);
    setTimeout(() => {
      setDisplayDataToUI(false);
    }, 5000);
  };
  useEffect(() => {}, [currentUser, id, details]);

  const [displayDataToUI, setDisplayDataToUI] = useState(true);

  const [loading, setLoading] = useState(true);

  const getData = () => {};

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    firestore
      .doc(`users/${currentUser.id}/cvs/${id}/data`)
      .collection(`cvs/${id}/data`)
      .doc(`${data.concept}/title`)
      //   .doc(`/title`)
      .get()
      .then(function (querySnapshot) {
        const DATAFROMFB = querySnapshot.data();
        console.log(DATAFROMFB, `querysnapshot.data`);
        if (DATAFROMFB) {
          setState({
            concept: DATAFROMFB.state.concept,
            name: DATAFROMFB.state.name,
            start: DATAFROMFB.state.start,
            end: DATAFROMFB.state.end,
            description: DATAFROMFB.state.description,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error, `there is was an error`);
      });
  }, [currentUser, id]);

  /* 
  // wrong way to get DATA
    useEffect(() => {
    setLoading(true);
    if (!currentUser) {
      return;
    }

    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot) {

        const newData = querySnapshot.data();
        if (newData) {
          //   console.log(newData, `lololololololoy`);
           setState({
              title: {
                title: data.title.title || "",
                name: newData.title.name,
                start: newData.title.start,
                end: newData.title.end,
                description: newData.title.description,
              },
              type: newData.type || "text",
            }); 

          setLoading(false);
          setTimeout(() => {
            //   setDisplayDataToUI(false);
          }, 2000);
          
        }
      })
      .catch((error) => {
        console.log(error, `there is was an error`);
      });
  }, [currentUser, id, setState]); 
  */

  useEffect(() => {
    setDisplayDataToUI(true);
    setLoading(true);
  }, []);
  // console.log(data.title, `value`);

  useEffect(() => {
    console.log(`Render`);
    return () => {
      console.log(`cleaning`);
    };
  });

  return (
    <Fragment>
      <div className="container">
        {displayDataToUI ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              ref={register({ required: true })}
              placeholder="title for new Section"
              name="concept"
              type="text"
              value={details}
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
                //   onClick={() => setDisplayDataToUI(false)}
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
              <Rapperd>
                <p className="pFornewFormSection">
                  Title :
                  <strong>
                    {!displayDataToUI ? state.title.title || "" : <Spinner />}
                  </strong>
                </p>
              </Rapperd>

              <Rapperd>
                <p className="pFornewFormSection">
                  Name :
                  <strong>
                    {!displayDataToUI ? state.title.name || "" : <Spinner />}
                  </strong>
                </p>
              </Rapperd>

              <Rapperd>
                <p className="pFornewFormSection">
                  Start :{" "}
                  <strong>
                    {!displayDataToUI ? state.title.start || "" : <Spinner />}
                  </strong>
                </p>
              </Rapperd>

              <Rapperd>
                <p className="pFornewFormSection">
                  End :
                  <strong>
                    {!displayDataToUI ? state.title.end || "" : <Spinner />}
                  </strong>
                </p>
              </Rapperd>

              <Rapperd>
                <p className="pFornewFormSection">
                  Description :
                  <strong>
                    {!displayDataToUI ? (
                      state.title.description || ""
                    ) : (
                      <Spinner />
                    )}
                  </strong>
                </p>
              </Rapperd>
            </Rapperd>
            <button
              className="btn btn-danger"
              onClick={() =>
                setTimeout(() => {
                  setDisplayDataToUI(true);
                }, 2000)
              }
            >
              <AiTwotoneEdit />
            </button>
          </Rapperd>
        )}
      </div>
    </Fragment>
  );
};

export default FormDeatils;
