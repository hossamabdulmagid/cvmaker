import React, { useEffect, Fragment } from 'react';
import { Title, Input, Label, P, Container, Span, IMG, Buttons, Upload } from './basicinfo.styles'
import { useForm } from "react-hook-form";
import { Spinner } from "@chakra-ui/core";
import { Button } from '@chakra-ui/core';
import { connect } from 'react-redux';
const BasicInfo = ({ currentUser, fetchCollectionsStartAsync }) => {
    const { handleSubmit, register, errors, getValues } = useForm();
    const onSubmit = values => console.log(values);
    const value = getValues();

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
                                    name="FullName"
                                    ref={register()}
                                />
                                {errors.FullName && errors.FullName.message}

                                <Label>Phone numbers</Label>
                                <Input
                                    name="Phone"
                                    ref={register({ required: " feild is Required" })}
                                /> <br />
                                {errors.Phone && errors.Phone.message}

                                <hr />
                                <Label>Address Line 1</Label>
                                <Input
                                    name="Address1"
                                    ref={register()}
                                />
                                {errors.Address1 && errors.Address1.message}

                                <Label>Address Line 3</Label>
                                <Input
                                    name="Address3"
                                    ref={register()}
                                />
                                {errors.Address2 && errors.Address2.message}

                            </div>
                            <hr />
                            <div className="col-6">
                                <Label>E-mail address</Label>
                                <Input
                                    name="Email"
                                    ref={register({ required: " feild is Required" })}
                                />
                                {errors.Email && errors.Email.message}

                                <Label>Websites</Label>
                                <Input
                                    name="Websites"
                                    ref={register()}
                                />
                                {errors.Websites && errors.Websites.message}

                                <hr />
                                <Label>Address Line 2</Label>
                                <Input
                                    name="Address2"
                                    ref={register()}
                                />
                                {errors.Address2 && errors.Address2.message}

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
    currentUser: state.user.currentUser
});


export default connect(mapStateToProps, null)(BasicInfo);