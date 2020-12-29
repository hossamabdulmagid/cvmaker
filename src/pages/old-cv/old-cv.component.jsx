import React, { Fragment, useEffect, useState } from "react";
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
import { Spinner, useToast, Progress } from "@chakra-ui/core";

const OldCv = ({ currentUser, match }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const toast = useToast();

  const handleShow = () => setShow(true);

  const [allcv, setAllcv] = useState([]);

  const [data, setData] = useState([]);

  let { id } = match.params;

  const history = useHistory();

  const [datee, setDatee] = useState(new Date());
  const [lastModified, setLastModified] = useState(new Date().toString());

  const refreshlastModified = () => {
    setLastModified(new Date().toString());

    console.log(`herrllllloooooooo`, lastModified);
  };

  const createAnewCv = async () => {
    const label = "Simple Cv";
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

  React.useMemo(() => {
    console.log(
      ` will only recompute the cache value when one of the Deps had Change`
    );
  }, []);

  const GetData = async () => {
    await firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (doc.data()) {
            console.log(`bla bla bla`);
          } else {
            console.log(`trep trep trep`);
          }
          let obj = doc.data();
          obj.id = doc.id;
          obj.lastModified = new Date().toString();
          allcv.push(obj);
          console.log(obj, `object Dataaaaaaa`);
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
        setTimeout(() => {
          GetData();
        }, 500);
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
  //    question={"Are you sure you want to delete the survey?"}

  return (
    <Fragment>
      <RapperdColor className="container-fluid">
        <Content className="container">
          <Title>Your CVs</Title>
          <ButtonforcreateCv onClick={createAnewCv}>
            Create a new CV
          </ButtonforcreateCv>
        </Content>
        <div className="container">
          {!loading ? (
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
                <tr>
                  <th> Name</th>
                  <th>Created At</th>
                  <th>Last Modified</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {allcv.map((singleCv, i) => (
                  <tr key={i}>
                    <td>
                      {singleCv.label}
                      <ButtonForDeleteCv
                        onClick={() => deleteCv(`${singleCv.id}`)}
                      >
                        delete
                        <Icon />
                      </ButtonForDeleteCv>
                    </td>
                    <td>
                      <Moment format="MMMM Do YYYY, h:mm a">
                        {singleCv.createdAt}
                      </Moment>
                      <IconCalendar />
                    </td>
                    <td>
                      <Moment format="MMMM Do YYYY, h:mm a">
                        {singleCv.lastModified}
                      </Moment>
                      <IconCalendar />
                    </td>

                    <td>
                      <Linkcv
                        to={"create-cv/" + `${singleCv.id}`}
                        onClick={() => refreshlastModified()}
                      >
                        Edit now
                        <Iconedit />
                      </Linkcv>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Spinner
              thickness="30px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}

          <div className="container">
            <Accordion
              defaultIndex={[0]}
              allowToggle
              show={show}
              handleClose={handleClose}
            >
              <AccordionItem className="AccordionItem">
                <AccordionHeader _expanded={{ bg: "gray", color: "darkgray" }}>
                  <Box flex="1" textAlign="left">
                    <h1>
                      Go <Strong>Premium </Strong> ❤
                    </h1>
                    <Span> Show details ★ </Span>
                  </Box>
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  CV Maker is absolutely FREE with no restrictions, but you can
                  get a lot more out of it and support its continued development
                  by going premium for a nominal annual subscription fee.
                  <div className="container">
                    <div className="row">
                      <Col xs={12} lg={6} md={6}>
                        <H2> Free</H2>
                        <Small>Basic templates</Small>
                        <Small>Add custom plain sections to your CV</Small>
                        <Small>Basic rich text editor</Small>
                        <Small>$0</Small>
                      </Col>
                      <div className="col" xs={12} lg={6} md={6}>
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
                        <ButtonForPremium>
                          Upgrade to Premium ♥
                        </ButtonForPremium>
                        <img src="paypal.png" alt="" />
                      </div>
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
});

export default connect(mapStateToProps, null)(OldCv);
