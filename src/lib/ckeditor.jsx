import React, { useState, Fragment, useEffect } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Paragraph } from "./styles";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
const Editor = ({ details }) => {
  const [state, setState] = useState({ content_new: "" });
  const { content } = state;

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    setState({ content_new: data });
    console.log(state, `here is State =>>>>>>>>>`);
  };

  const [updateTitle, setUpdateTitle] = useState(true);
  useEffect(() => {
    if (details) {
      setTimeout(() => {
        setUpdateTitle(false);
      }, 5000);
    }
  }, []);

  const Title = ({ details }) => {
    return <h1>{details}</h1>;
  };

  return (
    <Fragment>
      {!updateTitle ? <Title details={details}>{details}</Title> : null}
      <CKEditor
        config={editorConfiguration}
        editor={ClassicEditor}
        onInit={(Editor) => {}}
        onChange={HandleCkEditorState}
        data=""
      />
      <Paragraph>{state.content_new}</Paragraph>
    </Fragment>
  );
};

export default Editor;
