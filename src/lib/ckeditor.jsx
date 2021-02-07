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
import { GetOLdDataForCkEditor } from "../redux/newckeditor/newckeditorAction";
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
}) => {
  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  const isCurrent = useRef(true);

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
    if (isCurrent.current) {
      setState({ [name]: value });
    }
  };

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    if (isCurrent.current) {
      setState({ content_new: data });
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
  const [flag, setFlag] = useState(false);

  const [lastModified, setLastModified] = useState(new Date());

  //
  /*
  const FetchData = async (value) => {
    await firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
  
          const newData = doc.id;
  
          setLastModified(lastModified);
  
          if (Object.keys(data).includes("content_new")) {
            setState({
              concept: data.concept,
              content_new: data.content_new,
            });
          }
  
          return;
        });
      })
      .catch((error) => {
        setFlag(false);
        toast({
          title: `there is was an error`,
          description: `${error} `,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(error, `there is was an error`);
      });
  };
  */

  useLayoutEffect(() => {
    if (!currentUser) {
      return;
    }
    GetOLdDataForCkEditor(currentUser, id);
  }, [GetOLdDataForCkEditor, currentUser, id]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setTimeout(() => {
      if (Object.keys(oldCkData).includes("content_new")) {
        if (isCurrent.current) {
          setState({
            concept: oldCkData.concept,
            content_new: oldCkData.content_new,
          });
        }
      } else {
        console.log(`iam False`);
      }
    }, 500);
  }, [currentUser, array, GetOLdDataForCkEditor, id, setState]);

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
          <Input
            ref={register({ required: true })}
            placeholder="title for new Section"
            name="concept"
            type="text"
            value={state.concept || details}
            onChange={HandleChange}
          />

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
