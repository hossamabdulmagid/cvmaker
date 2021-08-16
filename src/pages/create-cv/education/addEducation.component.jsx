import { useForm } from "react-hook-form";
import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/core";
import generateRandom from "../../../lib/random";

const AddEducation = (props) => {
  const {
    setFlagButton,
    FlagButton,
    initialRef,
    finalRef,
    isOpen,
    onClose,
    Do_Submiting_Education,
    collagename,
    startgraduationyear,
    endgraduationyear,
    eduactionmajor,
    setEducation,
    education,
    currentUser,
    id,
    toast,
  } = props;

  const { handleSubmit, register, getValues, errors } = useForm();

  const value = getValues();

  let identiferId = generateRandom();

  education.identiferId = identiferId;
  const onSubmit = async (value) => {
    let dataToBeSaved = {
      education: {
        collagename: collagename || "",
        startgraduationyear: startgraduationyear || "",
        endgraduationyear: endgraduationyear || "",
        eduactionmajor: eduactionmajor || "",
        lastModified: new Date(),
        identiferId: identiferId,
      },
      type: "education",
    };
    await Do_Submiting_Education(currentUser, id, dataToBeSaved, toast);
    setFlagButton(false);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEducation({ ...education, [name]: value });
  };
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your Eduction</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormLabel>Collage name</FormLabel>
              <Input
                name="collagename"
                value={collagename}
                onChange={handleChange}
                ref={register({ required: "this Content is Required" })}
                placeholder="Collage Name"
              />
              <small className="error">
                {errors.collagename && errors.collagename.message}
              </small>
              <br />
              <FormLabel>Start Year </FormLabel>
              <Input
                name="startgraduationyear"
                value={startgraduationyear}
                onChange={handleChange}
                type="date"
                ref={register({ required: "this Content is Required" })}
              />
              <small className="error">
                {errors.startgraduationyear &&
                  errors.startgraduationyear.message}
              </small>
              <br />

              <FormLabel> End Year </FormLabel>
              <Input
                name="endgraduationyear"
                value={endgraduationyear}
                onChange={handleChange}
                type="date"
                ref={register({ required: "this Content is Required" })}
              />
              <small className="error">
                {errors.endgraduationyear && errors.endgraduationyear.message}
              </small>
              <br />

              <FormLabel> Education Majoring </FormLabel>
              <Input
                name="eduactionmajor"
                value={eduactionmajor}
                onChange={handleChange}
                type="text"
                placeholder="Collage Majoring"
                ref={register({ required: "this Content is Required" })}
              />
              <small className="error">
                {errors.eduactionmajor && errors.eduactionmajor.message}
              </small>
              <br />
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} type="submit">
                {!FlagButton ? <Spinner /> : "Save"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEducation;
