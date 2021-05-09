import { useState, useEffect } from "react";
import { Title, Small } from "./references.styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";
import { Button, Spinner, useToast } from "@chakra-ui/core";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Get_References } from "../../../redux/references/referencesAction";
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
const References = ({ currentUser, Get_References }) => {
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    Get_References(currentUser, id);
  }, [Get_References]);

  const [state, setState] = useState({
    concept: "References",
    content_references: "",
    type: "references",
  });

  const { concept, content_references, type } = state;

  const { handleSubmit, register, getValues, errors, data } = useForm();

  const toast = useToast();

  const value = getValues();

  const [loading, setLoading] = useState(true);

  const [flagButton, setFlagButton] = useState(true);

  const { id } = useParams();

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    setState({ content_references: data });
  };

  const createMarkup = () => {
    return { __html: state.content_references };
  };
  const onSubmit = async () => {
    const info = state.content_references;

    if (!currentUser.id) {
      return;
    }
    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/References`
    );
    let dataToBeSaved = {
      concept: state.concept || "References",
      content_references: info || "",
      type: state.type || "references",
    };

    await SecRef.set(dataToBeSaved);
    setLoading(false);
    setTimeout(() => {
      toast({
        title: "Section Updated.",
        description: `Your new Section  name is : References`,
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
      .doc(`References`)
      .get()
      .then(function (querySnapshot) {
        const newData = querySnapshot.data();
        if (newData) {
          setState({
            content_references: newData.content_references,
          });
          //  console.log(newData, `newData`);
        }
        setLoading(false);
        //        setFlagButton(false)
      })
      .catch((error) => {
        setLoading(false);
        console.error(error, `there is was an error`);
        console.log(error, `there is was an error`);
      });
  }, [currentUser, id]);
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
        <Title> References </Title>
        <CKEditor
          config={editorConfiguration}
          editor={ClassicEditor}
          refVal={register({ required: true })}
          name={state.content_references}
          onInit={(editor) => {}}
          onChange={HandleCkEditorState}
          data={state.content_references || ""}
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
  Get_References: (currentUser, id) =>
    dispatch(Get_References(currentUser, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(References);
