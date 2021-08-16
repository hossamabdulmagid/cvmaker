/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState, useRef, useCallback } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/core";
import Table from "react-bootstrap/Table";
import { Redirect, Route, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Spinner, useToast, useDisclosure, Button } from "@chakra-ui/core";
import NavGuest from "../../components/nav-guest/navGuest.component";
import {
  Get_oldCv,
  Delete_Single_CV,
  DoRefreshLastModified,
} from "../../redux/oldcv/oldcvAction";
import { CreateNewCv } from "../../redux/createnewcv/createnewcvAction";
import ModalDeletedOldCv from "./deleteModal";
import AccordionComponent from "./accordion";
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

  const toast = useToast();

  const [loading, setLoading] = useState(true);

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

  const [cv, setCv] = useState({
    id: "",
    label: "",
    createdAt: "",
    lastModified: "",
    userId: "",
  });

  const selecting = (selecting) => {
    setCv({
      ...cv,
      id: selecting.id,
      label: selecting.label,
      createdAt: selecting.createdAt,
      lastModified: selecting.lastModified,
      userId: currentUser,
    });
  };

  const RenderTBodyForTable = () => {
    return OldCvForUsers.map((singleCv) => {
      return (
        <tr key={id}>
          <td>
            {singleCv.label}
            <ButtonForDeleteCv
              onClick={() => {
                onOpen();
                selecting(singleCv);
              }}
            >
              delete
              <Icon />
            </ButtonForDeleteCv>
            <>
              <ModalDeletedOldCv
                isOpen={isOpen}
                onClose={onClose}
                Delete_Single_CV={Delete_Single_CV}
                cv={cv}
                toast={toast}
              />
            </>
          </td>
          <td>
            <Moment format="MMMM Do YYYY, h:mm a">{singleCv.createdAt}</Moment>
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
              to={`create-cv/` + `${singleCv.id}`}
              onClick={() => Refresh(currentUser, singleCv.id)}
            >
              Edit now
              <Iconedit />
            </Linkcv>
          </td>
        </tr>
      );
    });
  };

  let [flagHide, setFlagHide] = useState(true);
  const HandleAcordionChange = () => {
    setFlagHide(!flagHide);
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
          <Table striped bordered hover size="xs" responsive>
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
            <AccordionComponent
              HandleAcordionChange={HandleAcordionChange}
              flagHide={flagHide}
            />
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
  Delete_Single_CV: (cv, onClose, toast) =>
    dispatch(Delete_Single_CV(cv, onClose, toast)),
  DoRefreshLastModified: (currentUser, id) =>
    dispatch(DoRefreshLastModified(currentUser, id)),
  CreateNewCv: (currentUser, history, toast) =>
    dispatch(CreateNewCv(currentUser, history, toast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OldCv);
