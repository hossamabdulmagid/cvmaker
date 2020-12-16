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
      `users/${currentUser.id}/cvs/${id}/data/title`
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
    console.log(
      data.title,
      data.name,
      `KKKKKKKKKKKKKKKK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
    );
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
      setDisplayDataToUI(false);
      setLoading(false);
    }, 2000);
    setTimeout(() => {
      setDisplayDataToUI(false);
    }, 5000);
  };
  useEffect(() => {}, [currentUser, id]);

  const [displayDataToUI, setDisplayDataToUI] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (!currentUser) {
      return;
    }
    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`title`)
      .get()
      .then(function (querySnapshot) {
        console.log(querySnapshot.data(), `querySnapshot from basic info`);

        const newData = querySnapshot.data();
        console.log(newData, `newData...`);
        if (newData) {
          console.log(newData.title, `lololololololoy`);
          setState({
            title: {
              title: newData.title.title,
              name: newData.title.name,
              start: newData.title.start,
              end: newData.title.end,
              description: newData.title.description,
            },
            type: newData.type || "text",
          });
          setLoading(false);

          setTimeout(() => {
            setDisplayDataToUI(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error, `there is was an error`);
      });
  }, [currentUser, id, setState]);

  useEffect(() => {
    setDisplayDataToUI(true);
    setLoading(true);
    console.log(value.title, `value`);
  }, []);
  console.log(value.title, `value`);

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
              placeholder="title"
              name="title"
              type="text"
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
                  Title :{" "}
                  <strong>
                    {setDisplayDataToUI ? (
                      state.title.title || title
                    ) : (
                      <Spinner />
                    )}
                  </strong>
                </p>
              </Rapperd>

              <Rapperd>
                <p className="pFornewFormSection">
                  Name :{" "}
                  <strong>
                    {setDisplayDataToUI ? (
                      state.title.name || name
                    ) : (
                      <Spinner />
                    )}
                  </strong>
                </p>
              </Rapperd>

              <Rapperd>
                <p className="pFornewFormSection">
                  Start :{" "}
                  <strong>
                    {setDisplayDataToUI ? (
                      state.title.start || start
                    ) : (
                      <Spinner />
                    )}
                  </strong>
                </p>
              </Rapperd>

              <Rapperd>
                <p className="pFornewFormSection">
                  End :{" "}
                  <strong>
                    {setDisplayDataToUI ? state.title.end || end : <Spinner />}
                  </strong>
                </p>
              </Rapperd>

              <Rapperd>
                <p className="pFornewFormSection">
                  Description :{" "}
                  <strong>
                    {setDisplayDataToUI ? (
                      state.title.description || description
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
                }, 3000)
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
/*
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
*/
export default /*connect(mapStateToProps) */ FormDeatils;
