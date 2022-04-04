import { useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";

const AddWorkExp = (props) => {
  const {
    Do_Submiting_WorkExp,
    initialRef,
    finalRef,
    isOpen,
    onClose,
    allworkexp,
    workexperinceform,
    setWorkexperinceform,
    setDisplayData,
    setLoading,
    currentUser,
    id,
  } = props;

  const { handleSubmit, register, errors } = useForm();

  const toast = useToast();

  const [flagButton, setFlagButton] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorkexperinceform({ ...workexperinceform, [name]: value });
  };
  const onSubmit = () => {
    allworkexp.unshift(workexperinceform);
    let dataToBeSaved = {
      allwork: allworkexp,
      type: "workexperience",
    };
    setFlagButton(false);
    Do_Submiting_WorkExp(currentUser, id, dataToBeSaved, toast);
    setFlagButton(true);
    onClose();

    setLoading(false);
    setDisplayData(false);
  };

  useEffect(() => {
    setFlagButton(true);
  }, []);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add your WorkExpernice</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormLabel>Company Name</FormLabel>
              <Input
                ref={register({ required: "Company Name Required" })}
                name="companyname"
                //value={"" }
                onChange={handleChange}
                placeholder="CompanyName"
              />
              <small className="error">
                {errors.companyname && errors.companyname.message}
              </small>
              <br />
              <FormLabel> Start Year</FormLabel>
              <Input
                ref={register({ required: "Start Work Required" })}
                name="startwork"
                onChange={handleChange}
                type="text"
              />
              <small className="error">
                {errors.startwork && errors.startwork.message}
              </small>
              <br />
              <FormLabel> End Year</FormLabel>
              <Input
                ref={register({ required: "End Work  Required" })}
                name="endwork"
                onChange={handleChange}
                type="text"
              />
              <small className="error">
                {errors.endwork && errors.endwork.message}
              </small>
              <br />
              <FormLabel> Postion</FormLabel>
              <Input
                ref={register({ required: "Position Required" })}
                name="position"
                placeholder="Position"
                onChange={handleChange}
                type="text"
              />
              <small className="error">
                {errors.position && errors.position.message}
              </small>
              <br />
            </ModalBody>
            <ModalFooter>
              <Button variantColor="blue" mr={3} type="submit">
                {!flagButton ? <Spinner /> : "Save"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddWorkExp;
