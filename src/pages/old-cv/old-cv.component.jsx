import React, { useEffect, useState } from "react";
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
  Td,
  SpanforDelete
} from "./old-cv.styles";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Box,
  hh
} from "@chakra-ui/core";
import { firestore } from "../../firebase/firebase.utils";
import { Link, useHistory, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Redirect, Route } from "react-router-dom";
import { toast } from 'react-toastify'
import { connect } from "react-redux";
const OldCv = ({ currentUser, match }) => {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [allcv, setAllcv] = useState([]);

  const [data, setData] = useState([]);

  let { id } = match.params;

  const [datee, setDatee] = useState(new Date());

  const createAnewCv = async () => {
    const _createdAt = new Date();
    const docRef = await firestore
      .doc(`users/${currentUser.id}`)
      .collection("cvs")
      .add({
        _createdAt,
      });
    if (docRef.id) {
      toast.success("done  adding a cv");
      const newCvPath = `create-cv/${docRef.id}`;
      history.push(newCvPath);
      return;
    } else {
      console.log(`SomeThing Worng here`);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    firestore
      .doc(`users/${currentUser.id}`)
      .collection("cvs")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data.push(doc.id);

          // console.log(doc.id, " => ", doc.data(), `here should show data`);

          let obj = doc.data();

          Object.getOwnPropertyNames(obj).forEach((key) => {
            allcv.push(`${key}:${obj[key]}`);
          });
        });
      });
    var timerID = setInterval(() => {
      setDatee(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [data, currentUser, id]);

  const history = useHistory();

  console.log(id, `IDDDDDDDDDDDDDDDDDDDDDDDDDD`)

  const deletecv = async (id) => {

    const DeleteRef = await firestore.doc(`users/${currentUser.id}`).collection(`cvs`).doc(`${id}`)
      .delete()

      .then(function () {
        console.log("Document successfully deleted!");
      })

      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    if (DeleteRef.id) {
      toast.error(`your Cv ${id} has been deleted`)
    }

  }

  return (
    <>
      <RapperdColor className="container-fluid">
        <Content className="container">
          <Title>Your CVs</Title>
          <ButtonforcreateCv onClick={createAnewCv}>
            Create a new CV
          </ButtonforcreateCv>
        </Content>
        <div className="container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Name</th>
                <th>Last modified</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>

              {data.map((x, i) => (
                <tr key={i}>
                  <td>
                    {x}
                    <SpanforDelete onClick={() => deletecv()}>
                      Delete <Icon />
                    </SpanforDelete>
                  </td>
                  <td> {new Date().toDateString()}</td>
                  <Td>
                    <Linkcv to={"create-cv/" + `${x}`}> Edit now <Iconedit /></Linkcv>
                  </Td>
                </tr>
              ))}

            </tbody>
          </Table>
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
                      <div className="col-6">
                        <H2> Free</H2>

                        <Small>Basic templates</Small>

                        <Small>Add custom plain sections to your CV</Small>
                        <Small>Basic rich text editor</Small>
                        <Small>$0</Small>
                      </div>
                      <div className="col-6">
                        <H2> Premium</H2>
                        <Small>
                          <Green>★</Green> Premium templates in addition to the
                          free ones
                        </Small>
                        <Small>
                          <Green>★</Green> Add custom plain and special sections
                          (similar to education and work) to your CV
                        </Small>
                        <Small>
                          <Green>★</Green> Advanced rich text editor. Choose
                          fonts, text colors and more
                        </Small>
                        <Small>
                          <Green>★</Green> One-click e-mail. Send your resume
                          directly to your e-mail easily from your mobile or
                          tablet that doesn't allow file downloads
                        </Small>
                        <Small>
                          <Green>★</Green> Continued access to upcoming premium
                          features and templates
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
    </>
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