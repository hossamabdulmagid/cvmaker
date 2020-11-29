import React, { useState } from "react";
import { Title } from "./references.styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const References = () => {
  const [state, setState] = useState({ content: "" });

  const { content } = state;

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    setState({ content: data });
  };

  console.log(state, `here is State =>>>>>>>>>`);

  return (
    <div className="container">
      <Title> References </Title>
      <CKEditor
        editor={ClassicEditor}
        onInit={(editor) => {}}
        onChange={HandleCkEditorState}
      />
    </div>
  );
};

export default References;
