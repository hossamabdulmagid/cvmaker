import NavGuest from "../../components/nav-guest/navGuest.component";

import { Color, Container, H2, H3 } from "./contact.styles";
const Contact = () => {
  return (
    <>
      <NavGuest />
      <Color className="container-fluid">
        <Container className="container">
          <H2>Contact</H2>
          <small>
            For all account related and technical queries, please e-mail us. We
            will get back to you within 2 to 12 hours.
          </small>
          <H3>hosamabdulmaged@gmail.com</H3>
        </Container>
      </Color>
    </>
  );
};

export default Contact;
