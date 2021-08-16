import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from "@chakra-ui/core";

const ModalDeletedOldCv = (props) => {
  const { isOpen, onClose, Delete_Single_CV, cv, toast } = props;
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Action</ModalHeader>
          <ModalCloseButton />
          <hr />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Are you sure you want to delete
              <strong style={{ color: "#e53e3e" }}> {cv.label} </strong>, will
              be deleted immediately. You can't undo this action.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variantColor="red"
              mr={3}
              type="submit"
              onClick={() => {
                Delete_Single_CV(cv, onClose(), toast);
              }}
            >
              Delete
            </Button>
            <Button onClick={onClose} className="">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalDeletedOldCv;
