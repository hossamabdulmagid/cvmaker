import { useEffect, useState, Fragment } from "react";
import { firestore } from "../firebase/firebase.utils";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/core";
import { useToast, Input, Textarea, Spinner } from "@chakra-ui/core";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rapperd, RapperdForm, Small, P } from "./styles";
import { AiTwotoneEdit } from "react-icons/ai";
import { Col } from "react-bootstrap";
import generateRandom from "./random";

const FormDeatils = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const {
    array,
    details,
    sidebarRoutes,
    displayDataToUI,
    setDisplayDataToUI,
    activeSection,
    setActiveSection,
  } = props;
  const { handleSubmit, register, getValues, errors, data } = useForm();

  const value = getValues();

  const toast = useToast();

  useEffect(() => {}, [displayDataToUI]);

  console.log(activeSection, `activeSection`);

  const [state, setState] = useState({
    title: {
      concept: "",
      name: "",
      start: "",
      end: "",
      description: "",
      identiferId: null,
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

  useEffect(() => {
    setFlagButton(true);
  }, [currentUser.id]);

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
        identiferId: generateRandom(),
      },
      type: type || "text",
    };

    await SecRef.set(dataToBeSaved);

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
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }, 2000);

    setTimeout(() => {
      console.log(sidebarRoutes, `last thing from Submitting`);
    }, 3500);
  };

  useEffect(() => {}, [currentUser, id, details, sidebarRoutes]);

  const [loading, setLoading] = useState(true);

  const getData = () => {};

  const [dataTypeText, setDataTypeText] = useState([]);

  const [objectHaveTypeText, setObjectHaveTypeText] = useState({});

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, `doC`);
          const DataFromFireBase = doc.data();
          console.log(doc.data(), `doc/data()`);
          if (
            DataFromFireBase.type === "text" &&
            DataFromFireBase.title.concept === doc.id
          ) {
            dataTypeText.push(DataFromFireBase.title);
            console.log(dataTypeText, `dataTypeText`);
            setObjectHaveTypeText(DataFromFireBase.title);
            console.log(objectHaveTypeText);
            setState({
              title: {
                concept: "" || DataFromFireBase.title.concept,
                name: DataFromFireBase.title.name || "",
                start: DataFromFireBase.title.start || "",
                end: DataFromFireBase.title.end || "",
                description: DataFromFireBase.title.description || "",
                identiferId: DataFromFireBase.title.identiferId,
              },
            });
            console.log(state, `state withen iDentiferUniqeId`);
            setObjectHaveTypeText(state);

            setTimeout(() => {
              setDisplayDataToUI(false);
            }, 100);
          } else {
            console.log(`Iam Falseeeee`);
          }
        });

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error, `there is was an error`);
      });
  }, [currentUser, id, state.title]);

  return (
    <Fragment>
      <div className="container">
        {displayDataToUI ? (
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
        ) : (
          <Fragment>
            <Rapperd>
              <P className="text-center">
                Title :
                <strong>
                  {!displayDataToUI ? state.title.concept || "" : <Spinner />}
                </strong>
              </P>

              <P className="text-center">
                Name :
                <strong>
                  {!displayDataToUI ? state.title.name || "" : <Spinner />}
                </strong>
              </P>

              <P className="text-center">
                Start :
                <strong>
                  {!displayDataToUI ? state.title.start || "" : <Spinner />}
                </strong>
              </P>

              <P className="text-center">
                End :
                <strong>
                  {!displayDataToUI ? state.title.end || "" : <Spinner />}
                </strong>
              </P>

              <P className="text-center">
                Description :
                <strong>
                  {!displayDataToUI ? state.title.description : <Spinner />}
                </strong>
              </P>
              <Button
                size="sm"
                variantColor="blue"
                onClick={() =>
                  setTimeout(() => {
                    setDisplayDataToUI(true);
                  }, 2000)
                }
              >
                <AiTwotoneEdit />
              </Button>
            </Rapperd>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default FormDeatils;
