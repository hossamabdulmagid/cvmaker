import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { AddToList } from '../../../redux/addtolist/addtolistAction'
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
    useDisclosure
} from "@chakra-ui/core";
import { ButtonForEducation, P, Rapperd, Strong } from './education.styles';
import { connect } from 'react-redux';
import { firestore } from '../../../firebase/firebase.utils'
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const Education = ({ AddToList, currentUser }) => {
    const { id } = useParams();

    const [education, setEducation] = useState({
        collage: '',
        stateyear: '',
        endyear: ''
    });


    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();

    const { handleSubmit, register, getValues, errors } = useForm();

    const value = getValues();
    const [loading, setLoading] = useState(false);


    useEffect(() => {


    }, [currentUser])
    const onSubmit = async value => {
        const cvRef = firestore.doc(`users/${currentUser.id}/cvs/${id}/data/education`);
        await cvRef.set({
            education: {
                CollageName: value.collage,
                StartGraduationYear: value.startyear,
                EndGraduationYear: value.endyear
            }
        });
        onClose();
        toast.success(`your cvs details has been updated`)
    }






    console.log(education.CollageName, `education.CollageName`)



    return (
        <div className="container">
            <div className="row">
                <div className="col-5">
                    <ButtonForEducation className="buttonforpremium" variant='success' onClick={onOpen}>
                        + Education
                    </ButtonForEducation>
                </div>
            </div>

            <Rapperd>
                <Rapperd>
                    <P>
                        collageName:  <Strong>{education.CollageName}</Strong>
                    </P>
                    <P>
                        Start Year:  <Strong>{education.StartGraduationYear}</Strong>
                    </P>
                    <P>
                        End Year:  <Strong>{education.EndGraduationYear}</Strong>

                    </P>
                </Rapperd>
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
                                <Input name="collage" ref={register({ required: "this Content is Required" })}
                                    placeholder="collage name" />
                                {errors.collage && errors.collage.message}
                                <br />
                                <FormLabel>Start Year </FormLabel>
                                <Input name='startyear' type="date"
                                    ref={register({ required: "this Content is Required" })} />
                                {errors.startyear && errors.startyear.message}
                                <br />
                                <FormLabel> End Year </FormLabel>

                                <Input name='endyear' type="date"
                                    ref={register({ required: "this Content is Required" })} />

                                {errors.endyear && errors.endyear.message}


                            </ModalBody>

                            <ModalFooter>
                                <Button variantColor="blue" mr={3} type='submit'>
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


const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})


const mapDispatchToProps = dispatch => ({
    AddToList: (value) => dispatch(AddToList(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Education);
