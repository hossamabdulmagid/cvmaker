import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { AddToList } from '../../../redux/addtolist/addtolistAction'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/core";
import { ButtonForEducation, P, Strong, Rapperd } from './education.styles';
import { connect } from 'react-redux';
const Education = ({ AddToList }) => {
    const [education, setEducation] = useState([{
        collageName: '',
        startGraduationYear: '',
        endGraduationYear: ''
    }
    ]
    );


    console.log(education, `education`)
    useEffect(() => {
        setEducation(education)
    })

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();




    const { handleSubmit, register, getValues, errors } = useForm();

    const value = getValues();

    const onSubmit = (data) => {
        education.unshift(data)
        setTimeout(() => {
            onClose()
        }, 500);
        console.log(data, `value is here`);
    }

    useEffect(() => {

        AddToList(value);


    }, [AddToList, setEducation])
    return (
        <div className="container">
            <div className="row">



                <div className="col-5">
                    <ButtonForEducation className="buttonforpremium" variant='success' onClick={onOpen}> + Education</ButtonForEducation>
                </div>
            </div>
            <Rapperd>
                {education.filter((singleEducation, idx) => idx < 1).map((singleEducation, i) => (
                    <Rapperd key={i}>
                        <P>
                            collageName:  <Strong>{singleEducation.collageName}</Strong>
                        </P>
                        <P>
                            Start Year:  <Strong>{singleEducation.startGraduationYear}</Strong>
                        </P>
                        <P>
                            End Year:  <Strong>{singleEducation.endGraduationYear}</Strong>

                        </P>
                    </Rapperd>
                ))}
            </Rapperd>



            <>

                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add your Eduction</ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <ModalBody pb={6}>
                                <FormLabel>Collage name</FormLabel>
                                <Input name="collageName" ref={register({ required: "this Content is Required" })} placeholder="collage name" />
                                {errors.collageName && errors.collageName.message}
                                <br />
                                <FormLabel>Start  Year </FormLabel>
                                <Input name='startGraduationYear' type="date" ref={register({ required: "this Content is Required" })} />
                                {errors.startGraduationYear && errors.startGraduationYear.message}
                                <br />
                                <FormLabel> End  Year </FormLabel>

                                <Input name='endGraduationYear' type="date" ref={register({ required: "this Content is Required" })} />

                                {errors.endGraduationYear && errors.endGraduationYear.message}


                            </ModalBody>

                            <ModalFooter>
                                <Button variantColor="blue" mr={3} type='submit' onClick={AddToList}>
                                    Save
                              </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </>
        </div>
    )
};




const mapDispatchToProps = dispatch => ({
    AddToList: (value) => dispatch(AddToList(value))
})

export default connect(null, mapDispatchToProps)(Education);