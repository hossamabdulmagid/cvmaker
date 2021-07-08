import { useState, Fragment, useEffect, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Small } from "./styles";
import { useForm } from "react-hook-form";
import { Spinner, Input, Button, useToast } from "@chakra-ui/core";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Do_Submiting_newCkEditor } from "../redux/newckeditor/newckeditorAction";
import generateRandom from "./random";
const editorConfiguration = {
  toolbar: {
    items: [
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

const AddEditor = (props) => {
  const {
    currentUser,
    Do_Submiting_newCkEditor,
    ckeditorState,
    setCkeditorState,
  } = props;

  const { handleSubmit, register, getValues, errors } = useForm();

  const toast = useToast();

  const HandleCkEditorState = async (event, editor) => {
    const data = editor.getData();
    await setCkeditorState({ ...ckeditorState, content_new: `${data}` });
  };

  const { id } = useParams();

  const createMarkup = () => {
    return { __html: ckeditorState.content_new };
  };

  const [flagButton, setFlagButton] = useState(true);

  const value = getValues();

  const onSubmit = async (value, data) => {
    if (!currentUser && id) {
      return;
    }

    console.log(data, `data OnSubmit`);

    let dataToBeSaved = {
      concept: ckeditorState.concept,
      content_new: ckeditorState.content_new || "",
      type: ckeditorState.type || "entry",
      identiferId: generateRandom() || "",
    };

    console.log(dataToBeSaved, `dataToBeSaved while Sending data`);

    await Do_Submiting_newCkEditor(currentUser, id, dataToBeSaved, toast);

    setFlagButton(false);

    setTimeout(() => {
      setFlagButton(true);
    }, 2000);
  };

  return (
    <Fragment>
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
          {/*    <h1>{"" || state.concept}</h1> */}
          <CKEditor
            refVal={register({ required: true })}
            config={editorConfiguration}
            editor={ClassicEditor}
            onInit={(Editor) => {}}
            onChange={HandleCkEditorState}
            data={ckeditorState.content_new || ""}
            name="ckeditorState.content_new"
          />
          <div dangerouslySetInnerHTML={createMarkup()} className="editor" />
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
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  Do_Submiting_newCkEditor: (currentUser, id, dataToBeSaved, toast) =>
    dispatch(Do_Submiting_newCkEditor(currentUser, id, dataToBeSaved, toast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditor);
