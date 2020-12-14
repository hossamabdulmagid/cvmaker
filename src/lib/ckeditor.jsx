import React, { useState, Fragment } from "react";

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
const Editor = () => {
  const [state, setState] = useState({ content_new: "" });
  const { content } = state;

  const HandleCkEditorState = (event, editor) => {
    const data = editor.getData();
    setState({ content_new: data });
    console.log(state, `here is State =>>>>>>>>>`);
  };
  return (
    <Fragment>
      <CKEditor
        config={editorConfiguration}
        editor={ClassicEditor}
        onInit={(Editor) => {}}
        onChange={HandleCkEditorState}
        data="<p className='zz'> new Section</p>"
      />
    </Fragment>
  );
};

export default Editor;
