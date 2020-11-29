import React, { useState } from "react";
import { Title } from "./interests.styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Interests = () => {
  const [state, setState] = useState({ content_intersets: "" });

  const { content } = state;

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    setState({ content_intersets: data });
  };

  console.log(state, `here is State =>>>>>>>>>`);

  return (
    <div className="container">
      <Title> Interests </Title>
      <CKEditor
        editor={ClassicEditor}
        onInit={(editor) => {}}
        onChange={HandleCkEditorState}
      />
    </div>
  );
};

export default Interests;
