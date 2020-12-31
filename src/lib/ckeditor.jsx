import React, { useState, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Paragraph } from "./styles";
import { useForm } from "react-hook-form";
import { Input, Button, useToast } from "@chakra-ui/core";
import { connect } from "react-redux";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { firestore } from "../firebase/firebase.utils";
import { BsCheck } from "react-icons/bs";
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

  const value = getValues();
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

  useEffect(() => {
    if (details) {
      setTimeout(() => {
        setUpdateTitle(false);
      }, 5000);
    }
  }, []);

  const createMarkup = () => {
    return { __html: state.content_new };
  };
  const [flagButton, setFlagButton] = useState(true);

  const onSubmit = async (data) => {
    const info = state.content_new;
    console.log(data.concept, info, `data on Submitting`);

    if (!currentUser.id) {
      return;
    }
    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/${value.concept}`
    );
    let dataToBeSaved = {
      concept: value.concept || "",
      content_new: info || "",
      type: state.type || "entry",
    };

    await SecRef.set(dataToBeSaved);

    setTimeout(() => {
      setFlagButton(false);
      toast({
        title: "Section Updated.",
        description: `Your new Section  name is : ${value.concept}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }, 2000);
  };
  console.log(state, `here is fullstate`);

  return (
    <Fragment>
      <small>
        If you leave the fields in a section empty, the section will not appear
        in your CV
      </small>
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
          ref={register({ required: true })}
          config={editorConfiguration}
          editor={ClassicEditor}
          onInit={(Editor) => {}}
          onChange={HandleCkEditorState}
          data={""}
          name={content_new}
        />
        <div dangerouslySetInnerHTML={createMarkup()} className="editor"></div>
        <Button type="submit">{flagButton ? "Submit" : <BsCheck />}</Button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, null)(Editor);
