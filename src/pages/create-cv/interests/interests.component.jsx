import React, { useState } from "react";
import { Title, Paragraph } from "./interests.styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";
import { Button, Spinner, useToast } from "@chakra-ui/core";
import { firestore } from "../../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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
const Interests = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [state, setState] = useState({
    concept: "Interests",
    content_intersets: "",
    type: "entry",
  });

  const { concept, content_interset, type } = state;

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
  console.log(state.concept, `state.concept`);
  const onSubmit = async (data) => {
    console.log(data, `data from interstes Component`);
    const info = state.content_intersets;

    if (!currentUser.id) {
      return;
    }
    const SecRef = firestore.doc(
      `users/${currentUser.id}/cvs/${id}/data/Interests`
    );
    let dataToBeSaved = {
      concept: state.concept || "Interests",
      content_new: info || "",
      type: state.type || "entry",
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
  console.log(state, `here is State =>>>>>>>>>`);

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title> Interests </Title>
        <CKEditor
          config={editorConfiguration}
          editor={ClassicEditor}
          ref={register({ required: true })}
          name={state.content_intersets}
          onInit={(editor) => {}}
          onChange={HandleCkEditorState}
          data=""
        />
        <div dangerouslySetInnerHTML={createMarkup()} className="editor"></div>
        <Button type="submit" size="sm" variantColor="blue">
          {!flagButton ? <Spinner /> : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default Interests;
