/* eslint-disable react-hooks/exhaustive-deps */
import {
  Fragment,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
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
import { Col } from "react-bootstrap";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Spinner, useToast, useDisclosure } from "@chakra-ui/core";
import NavGuest from "../../components/nav-guest/navGuest.component";
import {
  Get_oldCv,
  Delete_Single_CV,
  DoRefreshLastModified,
} from "../../redux/oldcv/oldcvAction";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from "@chakra-ui/core";

import { CreateNewCv } from "../../redux/createnewcv/createnewcvAction";
const OldCv = ({
  currentUser,
  match,
  Get_oldCv,
  OldCvForUsers = [],
  Delete_Single_CV,
  DoRefreshLastModified,
  CreateNewCv,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const finalRef = useRef();

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const toast = useToast();

  const [loading, setLoading] = useState(true);

  const handleShow = () => setShow(true);

  const [allcv, setAllcv] = useState([]);

  const [data, setData] = useState([]);

  const history = useHistory();

  let { id } = match.params;

  let btnRef = useRef();

  const createAnewCv = async () => {
    await CreateNewCv(currentUser, history, toast);

    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
  };
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    Get_oldCv(currentUser);

    setTimeout(() => {
      if (OldCvForUsers && Array.isArray(OldCvForUsers)) {
        setLoading(false);
      }
    }, 250);
  }, [Get_oldCv, currentUser]);

  const Refresh = async (currentUser, id) => {
    await DoRefreshLastModified(currentUser, id);
  };

  const RenderTHeaderForTable = () => {
    let headerElement = ["Name", "Create At", "Last Modified", "Options"];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const removeSingleCv = useCallback(
    (id, currentUser) => {
      Delete_Single_CV(id, currentUser, toast);
      setTimeout(() => {
        onClose();
      }, 200);
    },
    [id, currentUser]
  );

  const RenderTBodyForTable = () => {
    return OldCvForUsers.map(({ label, lastModified, createdAt, id }) => {
      return (
        <tr key={id}>
          <td>
            {label}
            <ButtonForDeleteCv onClick={() => onOpen()}>
              delete
              <Icon />
            </ButtonForDeleteCv>
            <>
              <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Action</ModalHeader>
                  <ModalCloseButton />
                  <hr />
                  <ModalBody>
                    <Text fontWeight="bold" mb="1rem">
                      to delete this cv click Recycle Bin
                    </Text>
                  </ModalBody>
                  <ModalFooter>
                    <ButtonForDeleteCv
                      size="sm"
                      onClick={() => removeSingleCv(id, currentUser)}
                    >
                      <Icon />
                    </ButtonForDeleteCv>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          </td>
          <td>
            <Moment format="MMMM Do YYYY, h:mm a">{createdAt}</Moment>
            <IconCalendar />
          </td>
          <td>
            <Moment format="MMMM Do YYYY, h:mm a">{lastModified}</Moment>
            <IconCalendar />
          </td>
          <td>
            <Linkcv
              to={`create-cv/` + `${id}`}
              onClick={() => Refresh(currentUser, id)}
            >
              Edit now
              <Iconedit />
            </Linkcv>
          </td>
        </tr>
      );
    });
  };

  return (
    <Fragment>
      <NavGuest />
      <RapperdColor className="container-fluid">
        <Content className="container">
          <Title>Your CVs</Title>
          <ButtonforcreateCv onClick={createAnewCv} ref={btnRef}>
            Create a new CV
          </ButtonforcreateCv>
        </Content>
        <div className="container">
          <Table
            striped
            bordered
            hover
            size="xs"
            responsive="xl"
            responsive="sm"
            responsive="md"
            responsive="lg"
          >
            <thead>
              <tr>{RenderTHeaderForTable()}</tr>
            </thead>
            <tbody>
              {!loading ? (
                RenderTBodyForTable()
              ) : (
                <tr className="text-center">
                  <td>
                    <span>Loading ...</span>
                    <Spinner
                      thickness="10px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.200"
                      size="sm"
                    />
                  </td>
                  <td>
                    <span>Loading ...</span>
                    <Spinner
                      thickness="10px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.200"
                      size="sm"
                    />
                  </td>
                  <td>
                    <span>Loading ...</span>
                    <Spinner
                      thickness="10px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.200"
                      size="sm"
                    />
                  </td>
                  <td>
                    <span>Loading ...</span>
                    <Spinner
                      thickness="10px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.200"
                      size="sm"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <div className="container">
            <Accordion
              defaultIndex={[0]}
              allowToggle
              show={show}
              handleClose={handleClose}
              handleChange={handleShow}
            >
              <AccordionItem className="AccordionItem">
                <AccordionHeader _expanded={{ bg: "gray", color: "darkgray" }}>
                  <Box flex="1" textAlign="left">
                    <h1>
                      Go <Strong>Premium </Strong> ❤
                    </h1>
                    <Span>
                      {" "}
                      {handleShow ? "Show details ★" : "Hide details ★"}{" "}
                    </Span>
                  </Box>
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  CV Creator is absolutely FREE with no restrictions, but you
                  can get a lot more out of it and support its continued
                  development by going premium for a nominal annual subscription
                  fee.
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
                          Add custom plain and special sections (similar to
                          education and work) to your CV
                        </Small>
                        <Small>
                          <Green>★</Green>
                          Advanced rich text editor. Choose fonts, text colors
                          and more
                        </Small>
                        <Small>
                          <Green>★</Green>
                          One-click e-mail. Send your resume directly to your
                          e-mail easily from your mobile or tablet that doesn't
                          allow file downloads
                        </Small>
                        <Small>
                          <Green>★</Green>
                          Continued access to upcoming premium features and
                          templates
                        </Small>
                        <Small>$16 / year</Small>
                        <div className="container text-center center-item">
                          <ButtonForPremium>
                            Upgrade to Premium ♥
                          </ButtonForPremium>
                          <img src="paypal.png" alt="" className="imgpaypal" />
                        </div>
                      </Col>
                    </div>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </RapperdColor>
    </Fragment>
  );
};
const PrivateRoute = ({ component: Component, currentUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      currentUser != null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  OldCvForUsers: state.allOldCv.oldCv,
});

const mapDispatchToProps = (dispatch) => ({
  Get_oldCv: (currentUser) => dispatch(Get_oldCv(currentUser)),
  Delete_Single_CV: (id, currentUser, toast) =>
    dispatch(Delete_Single_CV(id, currentUser, toast)),
  DoRefreshLastModified: (currentUser, id) =>
    dispatch(DoRefreshLastModified(currentUser, id)),
  CreateNewCv: (currentUser, history, toast) =>
    dispatch(CreateNewCv(currentUser, history, toast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OldCv);
