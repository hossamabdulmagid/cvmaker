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
} from "./old-cv.styles";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/core";
import { firestore } from "../../firebase/firebase.utils";
import { Link, useHistory, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AddToList } from "../../redux/addtolist/addtolistAction";
const OldCv = ({ currentUser, doc, AddToList, match }) => {
  var tempDate = new Date();
  var date =
    tempDate.getFullYear() +
    "-" +
    (tempDate.getMonth() + 1) +
    "-" +
    tempDate.getDate();
  const currDate = "" + date;

  const [datee, setDatee] = useState(new Date());
  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);

    return function cleanup () {
      clearInterval(timerID);
    };
  });

  const tick = () => {
    setDatee(new Date());
  };

  const createAnewCv = async () => {
    const _createdAt = new Date();
    const docRef = await firestore
      .doc(`users/${currentUser.id}`)
      .collection("cvs")
      .add({
        _createdAt,
      });
    if (docRef.id) {
      console.log("done  adding a cv");
      const newCvPath = `create-cv/${docRef.id}`;
      history.push(newCvPath);
      return;
    } else {
      console.log(`SomeThing Worng here`);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [allcv, setAllcv] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
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
            allcv.push(`${key}:${obj[key]}`, `heeeeeeeeeeeeero`);
          });
          console.log(allcv, `here is array `);
        });
      });
  }, [firestore, data, doc]);

  let { id } = match.params;
  const history = useHistory();

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
              <tr>
                <td>
                  My CV
                  <Span>
                    Englsih <Icon />
                  </Span>
                </td>
                <td>{" " + currDate}</td>
                <td>Edit now</td>
              </tr>

              {data.map((x, i) => (
                <tr key={i}>
                  <td>
                    {x}
                    <Span>
                      Englsih <Icon />
                    </Span>
                  </td>
                  <td>{allcv[0]}</td>
                  <td>
                    {" "}
                    <Linkcv to={"create-cv/" + `${x}`}>Edit now</Linkcv>
                  </td>
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
              <AccordionItem>
                <AccordionHeader _expanded={{ bg: "gray", color: "darkgray" }}>
                  <Box flex="1" textAlign="left">
                    <h1>
                      {" "}
                      Go <Strong>Premium </Strong> ❤{" "}
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
                          {" "}
                          <Green>★</Green> Premium templates in addition to the
                          free ones
                        </Small>
                        <Small>
                          {" "}
                          <Green>★</Green> Add custom plain and special sections
                          (similar to education and work) to your CV
                        </Small>
                        <Small>
                          {" "}
                          <Green>★</Green> Advanced rich text editor. Choose
                          fonts, text colors and more
                        </Small>
                        <Small>
                          {" "}
                          <Green>★</Green> One-click e-mail. Send your resume
                          directly to your e-mail easily from your mobile or
                          tablet that doesn't allow file downloads
                        </Small>
                        <Small>
                          {" "}
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
  NOW: state.add.singleroutes,
});

const mapDispatchToProps = (dispatch) => ({
  AddToList: () => dispatch(AddToList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OldCv);
