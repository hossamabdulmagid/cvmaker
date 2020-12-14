import React, { useEffect, useState, Fragment } from "react";
import { firestore } from "../firebase/firebase.utils";
import { useForm } from "react-hook-form";
import { useToast, Input, Button, Textarea } from "@chakra-ui/core";
import { useParams } from "react-router-dom";
const FormDeatils = (props) => {
  const {
    array = [],
    sidebarRoutes = [],
    sectionData = {},
    currentUser,
  } = props;
  const { handleSubmit, register, getValues, errors, data } = useForm();
  const value = getValues();
  const toast = useToast();

  const [state, setState] = useState({
    title: "",
    name: "",
    start: "",
    end: "",
    description: "",
    type: "text",
  });
  const { id } = useParams();
  const { title, name, start, end, description } = state;

  const HandleChangenewData = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = async (data) => {
    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/${title}`
    );
    let dataToBeSaved = {
      title: state.title || "",
      name: state.name || "",
      start: state.start || "",
      end: state.end || "",
      description: state.description || "",
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
    toast({
      title: "Section Updated.",
      description: `Your new Section  name is : ${title}`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  return (
    <Fragment>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            ref={register({ required: true })}
            placeholder="title "
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
            <Button type="submit" className="buttonSavenewFrom">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default FormDeatils;
