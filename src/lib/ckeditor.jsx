import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Small } from "./styles";
import { useForm } from "react-hook-form";
import { Spinner, Input, Button, useToast } from "@chakra-ui/core";
import { connect } from "react-redux";
import { firestore } from "../firebase/firebase.utils";
import { Container, Row, Col } from "react-bootstrap";
const editorConfiguration = {
  toolbar: {
    items: [
      "heading",
      "|",
      "alignment",
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
const Editor = ({ details, currentUser }) => {
  const [state, setState] = useState({
    concept: "",
    content_new: "",
    type: "entry",
  });
  const { content_new, concept } = state;

  const { handleSubmit, register, getValues, errors, data } = useForm();

  const toast = useToast();

  const HandleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    setState({ [name]: value });
  };

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();

    setState({ content_new: data });
  };
  const { id } = useParams();

  const [updateTitle, setUpdateTitle] = useState(true);

  const createMarkup = () => {
    return { __html: state.content_new };
  };
  const [flagButton, setFlagButton] = useState(true);

  const value = getValues();

  const onSubmit = async (value, data) => {
    const info = state.content_new;

    if (!currentUser.id) {
      return;
    }
    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/${value.concept}`
    );
    console.log(value.concept, `value concept`);
    let dataToBeSaved = {
      concept: value.concept || "",
      content_new: info || "",
      type: state.type || "entry",
    };

    await SecRef.set(dataToBeSaved);
    setLoading(false);
    setTimeout(() => {
      toast({
        title: "Section Updated.",
        description: `Your new Section  name is : ${value.concept}`,
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

  const [loading, setLoading] = useState(true);
  return (
    <Fragment className="text-center">
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
          <Input
            ref={register({ required: true })}
            placeholder="title for new Section"
            name="concept"
            type="text"
            value={details}
            onChange={HandleChange}
          />

          <strong className="col-12">
            {errors && errors.title && (
              <label className="error">
                {errors.title.message || "title is required"}
              </label>
            )}
          </strong>

          <CKEditor
            refVal={register({ required: true })}
            config={editorConfiguration}
            editor={ClassicEditor}
            // onInit={(Editor) => { }}
            onChange={HandleCkEditorState}
            data={""}
            name={content_new}
          />

          <div
            dangerouslySetInnerHTML={createMarkup()}
            className="editor"
          ></div>
          <Button type="submit" size="sm" variantColor="blue">
            {!flagButton ? <Spinner /> : "Save"}
          </Button>
        </form>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, null)(Editor);
