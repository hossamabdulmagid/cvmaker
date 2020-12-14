import React, { useState } from "react";
import { Title } from "./qualifications.styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";

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

const Qualifications = () => {
  const { handleSubmit, register, getValues, errors, data } = useForm();

  const value = getValues();

  const [state, setState] = useState({
    title: "",
    name: "",
    position: "",
    address: "",
    content_qualifications: "",
  });

  // const { content } = state;

  const HandleCkEditorState = (event, editor) => {
    const datahere = editor.getData();
    setState({ content_qualifications: datahere });
  };

  const [datas, setDatas] = useState({});

  const handleChangeTitle = (event) => {
    const target = event.target;
    const { name, value } = target;
    setState({ [name]: value });
  };

  console.log("_state", state);

  React.useEffect(() => {
    console.log("_state", state);
    return () => {
      console.log("cleanup");
    };
  }, []);
  const onSubmit = (data) => console.log(data);

  return (
    <div className="container">
      <Title> Qualifications </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CKEditor
          className="cssforeditor"
          editor={ClassicEditor}
          ref={register({ required: true })}
          config={editorConfiguration}
          name="content_qualifications"
          onInit={(editor) => {}}
          onChange={HandleCkEditorState}
          data="Qualifications Section"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Qualifications;
