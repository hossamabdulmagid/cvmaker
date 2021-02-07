import { useState, Fragment, useEffect, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Small } from "./styles";
import { useForm } from "react-hook-form";
import { Spinner, Input, Button, useToast } from "@chakra-ui/core";
import { connect } from "react-redux";
import { firestore } from "../firebase/firebase.utils";
import { Container, Row, Col } from "react-bootstrap";
import {
  GetOLdDataForCkEditor,
  Do_Submiting_newCkEditor,
} from "../redux/newckeditor/newckeditorAction";
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
const Editor = ({
  details,
  currentUser,
  array = [],
  GetOLdDataForCkEditor,
  oldCkData,
  Do_Submiting_newCkEditor,
}) => {
  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  const isCurrent = useRef(true);

  const [state, setState] = useState({
    concept: details,
    content_new: "",
    type: "entry",
  });
  const { content_new, concept } = state;

  const { handleSubmit, register, getValues, errors } = useForm();

  const toast = useToast();

  const HandleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    if (isCurrent.current) {
      setState({ ...state, [name]: value });
    }
  };

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    if (isCurrent.current) {
      setState({ ...state, content_new: data });
    }
  };
  const { id } = useParams();

  const [updateTitle, setUpdateTitle] = useState(true);

  const createMarkup = () => {
    return { __html: state.content_new };
  };

  const [flagButton, setFlagButton] = useState(true);

  const value = getValues();

  const onSubmit = async (value, data) => {
    if (!currentUser && id) {
      return;
    }

    const url = state.concept;
    const info = data.content_new;
    console.log(info, `infoooooooooooooooooooooooooooooo state.content_NEw`);
    let dataToBeSaved = {
      concept: state.concept || "",
      content_new: content_new || "",
      type: state.type || "entry",
    };

    Do_Submiting_newCkEditor(currentUser, id, url, dataToBeSaved, toast);

    setFlagButton(false);
    setLoading(false);

    setTimeout(() => {
      setFlagButton(true);
    }, 2000);
  };
  const [flag, setFlag] = useState(false);

  const [lastModified, setLastModified] = useState(new Date());

  console.log(`oldCkData`, oldCkData);
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    GetOLdDataForCkEditor(currentUser, id);
    setTimeout(() => {
      if (Object.keys(oldCkData).includes("content_new" || "concept")) {
        setState({
          concept: oldCkData.concept,
          content_new: oldCkData.content_new,
        });
      } else {
        console.log(`iam False`);
      }
    }, 1200);
  }, [currentUser, id, GetOLdDataForCkEditor]);

  const [loading, setLoading] = useState(true);
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
          {oldCkData.concept ? (
            <span className="text-center1">
              Title For Section:
              <h1 className="text-center">{oldCkData.concept}</h1>
            </span>
          ) : (
            <Input
              refVal={register({ required: true })}
              placeholder="title for new Section"
              name="concept"
              type="text"
              value={details}
              onChange={HandleChange}
            />
          )}
          <CKEditor
            refVal={register({ required: true })}
            config={editorConfiguration}
            editor={ClassicEditor}
            onInit={(Editor) => {}}
            onChange={HandleCkEditorState}
            data={state.content_new || ""}
            name={content_new}
          />

          <div
            dangerouslySetInnerHTML={createMarkup()}
            className="editor"
          ></div>
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
  oldCkData: state.newSectionCkEditor.newckEditor,
});

const mapDispatchToProps = (dispatch) => ({
  GetOLdDataForCkEditor: (currentUser, id) =>
    dispatch(GetOLdDataForCkEditor(currentUser, id)),
  Do_Submiting_newCkEditor: (currentUser, id, url, dataToBeSaved, toast) =>
    dispatch(
      Do_Submiting_newCkEditor(currentUser, id, url, dataToBeSaved, toast)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
