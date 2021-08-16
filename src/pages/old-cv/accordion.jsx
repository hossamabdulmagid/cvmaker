import {
  ButtonForPremium,
  Content,
  Green,
  H2,
  Icon,
  RapperdColor,
  Small,
  Span,
  Strong,
  Title,
  ButtonforcreateCv,
  Linkcv,
  Iconedit,
  ButtonForDeleteCv,
  IconCalendar,
} from "./old-cv.styles";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/core";
import { Col } from "react-bootstrap";

const AccordionComponent = (props) => {
  const { HandleAcordionChange, flagHide } = props;
  return (
    <>
      <Accordion defaultIndex={[0]} allowToggle>
        <AccordionItem className="AccordionItem" onClick={HandleAcordionChange}>
          <AccordionHeader _expanded={{ bg: "gray", color: "darkgray" }}>
            <Box flex="1" textAlign="left">
              <h1>
                Go <Strong>Premium </Strong> ❤
              </h1>
              <Span>{!flagHide ? "Show details ★" : "Hide details ★"}</Span>
            </Box>
          </AccordionHeader>
          <AccordionPanel pb={4}>
            CV Creator is absolutely FREE with no restrictions, but you can get
            a lot more out of it and support its continued development by going
            premium for a nominal annual subscription fee.
            <div className="container">
              <div className="row">
                <Col xs={12} lg={6} md={6} className="center-item">
                  <H2> Free</H2>
                  <Small>Basic templates</Small>
                  <Small>Add custom plain sections to your CV</Small>
                  <Small>Basic rich text editor</Small>
                  <Small>$0</Small>
                </Col>
                <Col xs={12} lg={6} md={6}>
                  <H2> Premium</H2>
                  <Small>
                    <Green>★</Green>
                    Premium templates in addition to the free ones
                  </Small>
                  <Small>
                    <Green>★</Green>
                    Add custom plain and special sections (similar to education
                    and work) to your CV
                  </Small>
                  <Small>
                    <Green>★</Green>
                    Advanced rich text editor. Choose fonts, text colors and
                    more
                  </Small>
                  <Small>
                    <Green>★</Green>
                    One-click e-mail. Send your resume directly to your e-mail
                    easily from your mobile or tablet that doesn't allow file
                    downloads
                  </Small>
                  <Small>
                    <Green>★</Green>
                    Continued access to upcoming premium features and templates
                  </Small>
                  <Small>$16 / year</Small>
                  <div className="container text-center center-item">
                    <ButtonForPremium>Upgrade to Premium ♥</ButtonForPremium>
                    <img src="paypal.png" alt="" className="imgpaypal" />
                  </div>
                </Col>
              </div>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
export default AccordionComponent;
