import React from 'react';
import { Title, Input, Label, P, Container, Span, IMG, Buttons, Upload } from './basicinfo.styles'
import { useForm } from "react-hook-form";
import { Spinner } from "@chakra-ui/core";
import { Button } from '@chakra-ui/core';
import { connect } from 'react-redux';
const BasicInfo = ({ currentUser }) => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => console.log(values);


    return (
        <>
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
                                    name="phone"
                                    ref={register({ required: " feild is Required" })}
                                /> <br />
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
                                    name="addressline3"
                                    ref={register()}
                                />
                                {errors.addressline3 && errors.addressline3.message}

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
                                    name="addressline2"
                                    ref={register()}
                                />
                                {errors.addressline2 && errors.addressline2.message}

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
        </>
    )
};
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(BasicInfo);