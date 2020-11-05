import React, { useEffect, Fragment } from 'react';
import { Title, Input, Label, P, Container, Span, IMG, Buttons, Upload } from './basicinfo.styles'
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { Spinner } from "@chakra-ui/core";
import { Button } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { firestore } from '../../../firebase/firebase.utils'
import { v4 as uuidv4 } from 'uuid';

const BasicInfo = ({  currentUser, fetchCollectionsStartAsync, New }) => {
    const { id } = useParams();
    console.log("current cv id is ",id);
    const { handleSubmit, register, errors, getValues, userAuth, cvs, cid } = useForm();


    const value = getValues();


    useEffect(() => {



    }, [currentUser])

    const onSubmit = async value => {
    const cvRef = firestore.doc(`users/${currentUser.id}/cvs/${id}/data/basicinfo`);
    await cvRef.set({
            FullName: value.fullname,
                Phone: 20 + value.phone,
                Email: value.email,
                Address1: value.address1,
                Address2: value.address2,
                Address3: value.address3,
                WebSites: value.websites
        });
    }

    // Add a new document in collection "cities"

    return (
        <Fragment>

            <Container className="container-fluid">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <Title> </Title>
                        <div className="row">

                            <div className="col-6">
                                <Label>Full name</Label>

                                <Input
                                    name="fullname"
                                    ref={register()}
                                />
                                {errors.fullname && errors.fullname.message}

                                <Label>Phone numbers</Label>
                                <Input
                                    name="phone"
                                    ref={register({ required: " feild is Required" })}
                                />
                                <br />

                                {errors.phone && errors.phone.message}

                                <hr />
                                <Label>Address Line 1</Label>
                                <Input
                                    name="address1"
                                    ref={register()}
                                />
                                {errors.address1 && errors.address1.message}

                                <Label>Address Line 3</Label>
                                <Input
                                    name="address3"
                                    ref={register()}
                                />
                                {errors.address3 && errors.address3.message}

                            </div>
                            <hr />
                            <div className="col-6">
                                <Label>E-mail address</Label>
                                <Input
                                    name="email"
                                    ref={register({ required: " feild is Required" })}
                                />
                                {errors.email && errors.email.message}

                                <Label>Websites</Label>
                                <Input
                                    name="websites"
                                    ref={register()}
                                />
                                {errors.websites && errors.websites.message}

                                <hr />
                                <Label>Address Line 2</Label>
                                <Input
                                    name="address2"
                                    ref={register()}
                                />
                                {errors.address2 && errors.address2.message}

                                <br />
                                <br />
                                <Button type='submit' variantColor="teal" variant="ghost">Save</Button>
                                {/*
                                <Button variantColor="green" type="submit" className="Buttonforgreen">Save</Button>
                            */}
                            </div>
                            <hr />
                        </div>
                        <br />
                        <hr />
                        {currentUser ?
                            (<>
                                <P>
                                    You have to be logged in to upload your photo
                                   </P>
                                <hr />

                                <div className="row">

                                    <div className="col-6">
                                        <Upload id="" type="file" />
                                    </div>
                                    <div className="col-6">
                                        <Buttons>upload</Buttons>
                                        <Buttons>save</Buttons>
                                    </div>

                                </div>
                            </>) : null}

                    </div>
                </form>

            </Container>
        </Fragment>
    )
};
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});


export default connect(mapStateToProps, null)(BasicInfo);
