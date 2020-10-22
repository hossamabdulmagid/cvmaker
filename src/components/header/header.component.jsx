import React, { useState } from 'react'
import '../../App.css'
import { RapperColor, RapperContent, Links, SPan, P, BUTTON, Div, BUTTONFORLIKE, BUTTONFORTWITTER, BUTTONFORSHARE, BUTTONFORLOGIN } from './header.styles'
import Caro from '../carousel/carousel.component'
import Content from '../content/content.component';
import { Button } from "@chakra-ui/core";
const Head = () => {
    const [download, setDownload] = useState(0);
    const [save, setSave] = useState(0);
    return (
        <>
            <RapperColor className="">
                <RapperContent className="container">
                    <div className="row">
                        <div className='col-8'>
                            <img src='./cvmaker.png' alt="" />
                            <P>Create beautiful, professional resumes in minutes,<SPan> free.</SPan></P>
                        </div>
                        <div className='col-2'>
                            <small onClick={() => setDownload(download + 1)}>{download + " "}
                             downloads</small>
                            <Links to='/create-cv'>

                                <BUTTON variant="outline-dark" size="sm" variant='success'>
                                    <img src='ico_start.png' alt="" />
                                   Create a cv now
                            </BUTTON>
                            </Links>

                        </div>
                        <div className='col-2'>
                            <small onClick={() => setSave(save + 1)}>{save + " "}
                          saved CVs </small>

                        </div>
                        <Caro />

                    </div>
                </RapperContent>

            </RapperColor>
            <div className="container">
                <Div className="row">
                    <div className='col-7'>
                        <Button size="xs" > Like 17k</Button>
                        <Button size="xs" > twitter</Button>
                        <Button variant="info" size="xs"  > in Share</Button>
                    </div>
                    <div className="col-5">
                        <small>
                            Already have your resumes on CV Maker?
                                <Button size="xs"  ><Links to='/login' >
                                login    </Links> </Button>
                        </small>
                    </div>
                </Div>
                <Content />
            </div>
        </>
    );
}


export default Head;