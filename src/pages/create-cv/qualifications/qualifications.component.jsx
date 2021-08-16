import { useState, useEffect } from "react";
import { Title, Small } from "./qualifications.styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";
import { Button, Spinner, useToast } from "@chakra-ui/core";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Get_Qualifications } from "../../../redux/qualifications/qualificationsAction";

const editorConfiguration = {
  toolbar: {
    items: [
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "undo",
      "redo",
    ],
  },
};

const Qualifications = ({ currentUser, Get_Qualifications }) => {
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    Get_Qualifications(currentUser, id);
  }, [Get_Qualifications]);

  const [state, setState] = useState({
    concept: "Qualifications",
    content_Qualifications: "",
    type: "qualifications",
  });

  const { concept, content_Qualifications, type } = state;

  const { handleSubmit, register, getValues, errors, data } = useForm();

  const toast = useToast();

  const value = getValues();

  const [loading, setLoading] = useState(true);

  const [flagButton, setFlagButton] = useState(true);

  const { id } = useParams();

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    setState({ content_Qualifications: data });
  };

  const createMarkup = () => {
    return { __html: state.content_Qualifications };
  };

  const onSubmit = async () => {
    const info = state.content_Qualifications;

    if (!currentUser.id) {
      return;
    }

    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/Qualifications`
    );

    let dataToBeSaved = {
      concept: state.concept || "Qualifications",
      content_Qualifications: info || "",
      type: state.type || "qualifications",
    };

    await SecRef.set(dataToBeSaved);
    setLoading(false);

    setTimeout(() => {
      toast({
        title: "Section Updated.",
        description: `Your new Section  name is : Qualifications`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }, 2000);

    setFlagButton(false);

    setTimeout(() => {
      setFlagButton(true);
    }, 2000);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Qualifications`)
      .get()
      .then(function (querySnapshot) {
        const newData = querySnapshot.data();
        if (newData) {
          setState({
            content_Qualifications: newData.content_Qualifications,
          });
          // console.log(newData, `newData`);
        }
        setLoading(false);
        //        setFlagButton(false)
      })
      .catch((error) => {
        setLoading(false);
        console.error(error, `there is was an error`);
        console.log(error, `there is was an error`);
      });
  }, [currentUser]);

  return (
    <Container>
      <Row bsPrefix="d-none d-md-block d-lg-block  d-xl-block center-item">
        <Col className="text-center">
          <Small>
            If you leave the fields in a section empty, the section will not
            appear in your CV
          </Small>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Qualifications</Title>
        <CKEditor
          config={editorConfiguration}
          editor={ClassicEditor}
          refVal={register({ required: true })}
          name={state.content_Qualifications}
          onInit={(editor) => {}}
          onChange={HandleCkEditorState}
          data={state.content_Qualifications || ""}
          required
        />
        <div dangerouslySetInnerHTML={createMarkup()} className="editor"></div>
        <Button
          type="submit"
          size="sm"
          variantColor="blue"
          className="saveEditor"
        >
          {!flagButton ? <Spinner /> : "Save"}
        </Button>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  Get_Qualifications: (currentUser, id) =>
    dispatch(Get_Qualifications(currentUser, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Qualifications);
