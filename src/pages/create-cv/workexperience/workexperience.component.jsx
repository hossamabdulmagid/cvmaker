import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { AddToList } from '../../../redux/addtolist/addtolistAction'
import { connect } from 'react-redux'
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
import { ButtonForWork, Rapperd, P, Strong } from './workexperience.styles';

const Workexperience = ({ AddToList }) => {
    const [work, setWork] = useState([{
        companyName: '',
        startWork: '',
        endWork: ''
    }
    ]
    );


    console.log(work, `work`)
    useEffect(() => {
        setWork(work)
    })

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();




    const { handleSubmit, register, getValues, errors } = useForm();

    const value = getValues();


    const onSubmit = (data) => {
        work.unshift(data)
        setTimeout(() => {
            onClose()
        }, 500);
        console.log(data, `work is here`);
    }

    useEffect(() => {

        AddToList(value);


    }, [AddToList, setWork])
    return (
        <div className="container">
            <div className="row">
                <div className="col-5">
                    <ButtonForWork className="buttonforpremium" variant='success' onClick={onOpen}> +WorkExpernice</ButtonForWork>
                </div>
            </div>
            <Rapperd>
                {work.filter((singlework, idx) => idx < 2).map((singlework, i) => (
                    <Rapperd key={i}>
                        <P>
                            CompanyName:  <Strong>{singlework.companyName}</Strong>
                        </P>
                        <P>
                            Start Work:  <Strong>{singlework.startWork}</Strong>
                        </P>
                        <P>
                            End Work:  <Strong>{singlework.endWork}</Strong>

                        </P>
                    </Rapperd>
                ))}
            </Rapperd>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <ModalHeader>Add your WorkExpernice</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormLabel>Company Name</FormLabel>
                            <Input ref={register({ required: "this Feild is Required" })} name="companyName" placeholder="CompanyName" />
                            {errors.companyName && errors.companyName.message}
                            <br />
                            <FormLabel>  Start Year</FormLabel>
                            <Input ref={register({ required: "this Feild is Required" })} name="startWork" placeholder="Graduation Year" type="date"  />
                            {errors.startWork && errors.startWork.message}
                            <br />
                            <FormLabel> End Year</FormLabel>
                            <Input ref={register({ required: "this Feild is Required" })} name="endWork" placeholder="Graduation Year" type="date" />
                            {errors.endWork && errors.endWork.message}
                            <br />
                        </ModalBody>

                        <ModalFooter>
                            <Button variantColor="blue" mr={3} onClick={AddToList} type="submit" >
                                Save
                                </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>

                </ModalContent>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    AddToList: (value) => dispatch(AddToList(value))
})

export default connect(null, mapDispatchToProps)(Workexperience);