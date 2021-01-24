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
import { firestore } from "../../firebase/firebase.utils";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Spinner, useToast, Button, useDisclosure } from "@chakra-ui/core";
import NavGuest from "../../components/nav-guest/navGuest.component";
import { Get_oldCv, Delete_Single_CV } from "../../redux/oldcv/oldcvAction";
import { Row } from "react-bootstrap";
const OldCv = ({
  currentUser,
  match,
  Get_oldCv,
  OldCvForUsers = [],
  Delete_Single_CV,
}) => {
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    Get_oldCv(currentUser);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      setLoading(true);
    };
  }, [Get_oldCv, currentUser]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const finalRef = useRef();

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const toast = useToast();

  const handleShow = () => setShow(true);

  const [allcv, setAllcv] = useState([]);

  const [data, setData] = useState([]);

  const history = useHistory();

  const [lastModified, setLastModified] = useState(new Date().toString());

  const refreshlastModified = () => {
    setLastModified(new Date().toString());
  };
  let { id } = match.params;
  let btnRef = useRef();

  const createAnewCv = async () => {
    const label = "Simple Cv";
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
    const docRef = await firestore
      .doc(`users/${currentUser.id}`)
      .collection("cvs")
      .add({
        createdAt: new Date().toString(),
        label,
        lastModified,
      });
    if (docRef.id) {
      toast({
        title: `Successfuly created new cv `,
        description: `Your cv name is : ${label}`,
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });

      const newCvPath = `create-cv/${docRef.id}`;
      history.push(newCvPath);
      return;
    } else {
      console.log(`SomeThing Worng here`);
    }
  };

  const [loading, setLoading] = useState(true);

  /*const GetData = async () => {
    await firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let obj = doc.data();
          obj.id = doc.id;
          obj.lastModified = new Date().toString();
          allcv.push(obj);

          setLoading(false);
        });
      });
    var timerID = setInterval(() => {
      setDatee(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    GetData();
  }, [data, currentUser, id, allcv]);

  const deleteCv = async (id) => {
    if (!id) {
      return;
    }

    console.log(id, `here is id gona deleted`);
    await firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs`)
      .doc(`${id}`)
      .delete()
      .then(function () {
        setAllcv([]);
        onClose();
        toast({
          title: "Your Cv Successfully Deleted!",
          description: "cv deleted you can Create new one.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .catch(function (error) {
        console.log(error, `error for removing deoucte`)
        toast({
          title: "Error removing document",
          description: `${error}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      });
  };
  */

  const RenderTHeaderForTable = () => {
    let headerElement = ["Name", "Create At", "Last Modified", "Options"];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const RenderTBodyForTable = () => {
    return OldCvForUsers.map(({ label, lastModified, createdAt, id }) => {
      return (
        <tr key={id}>
          <td>
            {label}
            <ButtonForDeleteCv
              onClick={() => Delete_Single_CV(id, currentUser, toast)}
            >
              delete
              <Icon />
            </ButtonForDeleteCv>
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
              to={"create-cv/" + `${id}`}
              onClick={() => refreshlastModified()}
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
                    <Span> {show ? "Show details ★" : "Hide details ★"} </Span>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(OldCv);
