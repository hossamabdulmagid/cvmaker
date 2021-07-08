import { useEffect, useState, Fragment } from "react";
import { firestore } from "../firebase/firebase.utils";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/core";
import { useToast, Input, Textarea, Spinner } from "@chakra-ui/core";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RapperdForm, Small } from "./styles";
import generateRandom from "./random";

const AddForm = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { array, formState, setFormState } = props;
  const { handleSubmit, register, getValues, errors, data } = useForm();

  const value = getValues();

  const toast = useToast();

  const { id } = useParams();

  const { concept, name, start, end, description, type } = formState;

  const HandleChangenewData = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const [FlagButton, setFlagButton] = useState(true);

  useEffect(() => {
    setFlagButton(true);
  }, [currentUser.id]);

  const onSubmit = async (data, props) => {
    if (!currentUser.id) {
      return;
    }

    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/${concept}`
    );

    let dataToBeSaved = {
      concept: concept || "",
      name: name || "",
      start: start || "",
      end: end || "",
      description: description || "",
      identiferId: generateRandom(),
      type: type || "text",
    };

    await SecRef.set(dataToBeSaved);

    array.push({
      section: formState.concept,
      type: formState.type,
      lastModified: new Date(),
    });

    setFlagButton(false);

    setTimeout(() => {
      setFlagButton(true);

      toast({
        title: "Section Updated.",
        description: `Your new Section  name is : ${concept}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }, 2000);
  };

  return (
    <Fragment>
      <div className="container">
        <Fragment>
          <RapperdForm xs={12}>
            <Small>
              {" "}
              If you leave the fields in a section empty, the section will not
              appear in your CV
            </Small>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                ref={register({ required: true })}
                placeholder="title for new Section"
                name="concept"
                type="hidden"
                value={concept}
                onChange={HandleChangenewData}
              />

              <strong className="col-12">
                {errors && errors.concept && (
                  <label className="error">
                    {errors.concept.message || "concept is required"}
                  </label>
                )}
              </strong>
              <Input
                ref={register({ required: true })}
                placeholder="name"
                name="name"
                type="text"
                value={formState.name || ""}
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
                value={formState.start || ""}
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
                value={formState.end || ""}
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
                value={formState.description || ""}
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
          </RapperdForm>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default AddForm;
