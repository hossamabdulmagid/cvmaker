import React, { useState } from "react";
import { Title, Paragraph } from "./references.styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
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
const References = () => {
  const [state, setState] = useState({ content_references: "" });

  const { content } = state;

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    setState({ content_references: data });
  };
  const createMarkup = () => {
    return { __html: state.content_references };
  };

  console.log(state, `here is State =>>>>>>>>>`);

  return (
    <div className="container">
      <Title> References </Title>
      <CKEditor
        editor={ClassicEditor}
        onInit={(editor) => {}}
        onChange={HandleCkEditorState}
        data=""
        config={editorConfiguration}
      />
      <div dangerouslySetInnerHTML={createMarkup()} className="editor"></div>
    </div>
  );
};

export default References;
