import React, { useState, useEffect } from "react";
import { Title, Small } from "./interests.styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";
import { Button, Spinner, useToast } from "@chakra-ui/core";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

const editorConfiguration = {
  toolbar: {
    items: [
      "heading",
      "|",
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
const Interests = ({ currentUser }) => {
  const [state, setState] = useState({
    concept: "Interests",
    content_intersets: "",
    type: "interests",
  });

  const { concept, content_intersets, type } = state;

  const { handleSubmit, register, getValues, errors, data } = useForm();

  const toast = useToast();

  const value = getValues();

  const [loading, setLoading] = useState(true);

  const [flagButton, setFlagButton] = useState(true);

  const { id } = useParams();

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    setState({ content_intersets: data });
  };

  const createMarkup = () => {
    return { __html: state.content_intersets };
  };

  const onSubmit = async () => {
    const info = state.content_intersets;

    if (!currentUser.id) {
      return;
    }
    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/Interests`
    );
    let dataToBeSaved = {
      concept: state.concept || "Interests",
      content_intersets: info || "",
      type: state.type || "interests",
    };

    await SecRef.set(dataToBeSaved);
    setLoading(false);
    setTimeout(() => {
      toast({
        title: "Section Updated.",
        description: `Your new Section  name is : Interests`,
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
      .doc(`Interests`)
      .get()
      .then(function (querySnapshot) {
        const newData = querySnapshot.data();
        if (newData) {
          setState({
            content_intersets: newData.content_intersets,
          });
          console.log(newData, `newData`);
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
      <Row className="text-center">
        <Col>
          <Small>
            If you leave the fields in a section empty, the section will not
            appear in your CV
          </Small>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title> Interests </Title>
        <CKEditor
          config={editorConfiguration}
          editor={ClassicEditor}
          refVal={register({ required: true })}
          name={state.content_intersets}
          onInit={(editor) => {}}
          onChange={HandleCkEditorState}
          data={state.content_intersets || ""}
          Required
        />
        <div dangerouslySetInnerHTML={createMarkup()} className="editor"></div>
        <Button type="submit" size="sm" variantColor="blue">
          {!flagButton ? <Spinner /> : "Save"}
        </Button>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(Interests);
