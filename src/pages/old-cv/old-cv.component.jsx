import React, { useEffect, useState } from 'react'
import { RapperdColor, Content, Title, LinkforcreateCv, Icon, Span, Strong, H2, Small, Green, ButtonForPremium } from './old-cv.styles'
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    useDisclosure,
    Box
} from "@chakra-ui/core";

import Table from 'react-bootstrap/Table'
const OldCv = () => {

    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    const currDate = "" + date;

    const [datee, setDatee] = useState(new Date());
    useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const tick = () => {
        setDatee(new Date());
    }



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <RapperdColor className="container-fluid">
            <Content className="container">
                <Title>Your CVs</Title>
                <LinkforcreateCv to='/create-cv'>Create a new CV</LinkforcreateCv>
            </Content>
            <div className='container'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th>Last modified</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>My CV <Span>Englsih <Icon /></Span></td>
                            <td>{datee.toLocaleTimeString()}{" " + currDate}</td>
                            <td>Edit now</td>
                        </tr>
                        <tr>
                            <td>Maado CV <Span>Englsih <Icon /></Span></td>
                            <td>{datee.toLocaleTimeString()}{" " + currDate}</td>
                            <td>Edit now</td>
                        </tr>
                        <tr>
                            <td>Zaki CV <Span>Englsih <Icon /></Span></td>
                            <td>{datee.toLocaleTimeString()}{" " + currDate}</td>
                            <td>Edit now</td>

                        </tr>
                    </tbody>
                </Table>
                <div className="container">
                    <Accordion defaultIndex={[0]} allowToggle show={show} handleClose={handleClose} >
                        <AccordionItem>
                            <AccordionHeader _expanded={{ bg: "gray", color: "darkgray" }}>
                                <Box flex="1" textAlign="left">
                                    <h1> Go <Strong>Premium </Strong> ❤ </h1>
                                    <Span> Show details ★ </Span>

                                </Box>
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                CV Maker is absolutely FREE with no restrictions,
                                but you can get a lot more out of it and support its continued development by going premium for a nominal annual subscription fee.
                            <div className="container">
                                    <div className="row">
                                        <div className="col-6">
                                            <H2>  Free</H2>

                                            <Small>Basic templates</Small>

                                            <Small>Add custom plain sections to your CV</Small>
                                            <Small>Basic rich text editor</Small>
                                            <Small>$0</Small>



                                        </div>
                                        <div className="col-6">
                                            <H2>  Premium</H2>
                                            <Small> <Green>★</Green> Premium templates in addition to the free ones</Small>
                                            <Small> <Green>★</Green>  Add custom plain and special sections (similar to education and work) to your CV</Small>
                                            <Small> <Green>★</Green>  Advanced rich text editor. Choose fonts, text colors and more</Small>
                                            <Small> <Green>★</Green> One-click e-mail. Send your resume directly to your e-mail easily from your mobile or tablet that doesn't allow file downloads</Small>
                                            <Small> <Green>★</Green>  Continued access to upcoming premium features and templates</Small>
                                            <Small>$16 / year</Small>
                                            <ButtonForPremium>Upgrade to Premium ♥</ButtonForPremium>
                                            <img src='paypal.png' alt="" />
                                        </div>

                                    </div>
                                </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

        </RapperdColor>
    )
}

export default OldCv;