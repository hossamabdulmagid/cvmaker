import React, { useState } from "react";
import { Title, Paragraph } from "./interests.styles";
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
const Interests = () => {
  const [state, setState] = useState({ content_intersets: "" });

  const { content } = state;

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    setState({ content_intersets: data });
  };
  const createMarkup = () => {
    return { __html: state.content_intersets };
  };

  console.log(state, `here is State =>>>>>>>>>`);

  return (
    <div className="container">
      <Title> Interests </Title>
      <CKEditor
        config={editorConfiguration}
        editor={ClassicEditor}
        onInit={(editor) => {}}
        onChange={HandleCkEditorState}
        data=""
      />
      <div dangerouslySetInnerHTML={createMarkup()} className="editor"></div>
    </div>
  );
};

export default Interests;
