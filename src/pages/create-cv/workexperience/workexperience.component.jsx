import {
  useState,
  useEffect,
  Fragment,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { AddToList } from "../../../redux/addtolist/addtolistAction";
import { connect } from "react-redux";
import { useDisclosure, useToast } from "@chakra-ui/core";
import {
  ButtonForWork,
  Rapperd,
  ButtonFordeleteWork,
  P,
  Strong,
  StrongMobile,
  Icon,
} from "./workexperience.styles";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  Get_Workexperince,
  Do_Submiting_WorkExp,
  Do_Delete_Cv,
} from "../../../redux/workexperince/workexperinceAction";
import generateRandom from "../../../lib/random";
import AddWorkExp from "./addworkexpernice";
const Workexperience = (props) => {
  const {
    AddToList,
    currentUser,
    Get_Workexperince,
    Do_Submiting_WorkExp,
    StateWorkExp = [],
    Do_Delete_Cv,
  } = props;

  const { id } = useParams();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const finalRef = useRef();

  const [displayData, setDisplayData] = useState(true);

  const [loading, setLoading] = useState(true);

  const [allworkexp, setAllWorkexp] = useState([]);

  const [workexperinceform, setWorkexperinceform] = useState({
    companyname: "",
    startwork: "",
    endwork: "",
    position: "",
    lastModified: new Date(),
    type: "workexperience",
  });

  let identiferId = generateRandom();

  workexperinceform.identiferId = identiferId;
  const {
    companyname,
    startwork,
    endwork,
    position,
    lastModified,
  } = workexperinceform;

  const DeleteJobs = useCallback(() => {
    Do_Delete_Cv(currentUser, id, toast);
    setLoading(true);
  }, []);

  const isCurrent = useRef(true);

  useLayoutEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!currentUser && !id) {
      return;
    }
    Get_Workexperince(currentUser, id);
  }, [Get_Workexperince, currentUser, id]);

  useEffect(() => {
    if (StateWorkExp) {
      if (isCurrent.current) {
        if (StateWorkExp.length > 0) {
          setTimeout(() => {
            setAllWorkexp([...StateWorkExp]);
            setLoading(false);
            setDisplayData(false);
          }, 200);
        } else if (StateWorkExp.length === 0) {
          setAllWorkexp([]);
          setDisplayData(true);
        }
      }
    }
  }, [StateWorkExp.length, allworkexp.length, StateWorkExp]);

  return (
    <Container>
      <Row>
        <Col xs={12} s={12} md={5} lg={5} xl={5}>
          <ButtonForWork
            className="buttonforpremium"
            variant="success"
            onClick={() => onOpen()}
          >
            + WorkExpernice
          </ButtonForWork>
        </Col>
        <Col xs={12} s={12} md={5} lg={5} xl={5}>
          {!displayData ? (
            <ButtonFordeleteWork
              className="buttonforpremium"
              variant="success"
              onClick={() => DeleteJobs(currentUser, id)}
            >
              - ClearYourJobs
              <Icon />
            </ButtonFordeleteWork>
          ) : null}
        </Col>
      </Row>
      <Rapperd>
        {!loading ? (
          <Fragment>
            <Row
              bsPr
              efix="d-none d-md-block d-lg-block  d-xl-block center-item"
            >
              {StateWorkExp.map((single, key) => (
                <Col
                  md={12}
                  lg={12}
                  xl={12}
                  className="text-center"
                  key={key}
                  id="idforcss"
                >
                  <P>
                    CompanyName:
                    <Strong>{single.companyname}</Strong>
                  </P>
                  <hr />
                  <P>
                    Start Work:
                    <Strong>{single.startwork}</Strong>
                  </P>
                  <hr />
                  <P>
                    End Work:
                    <Strong>{single.endwork}</Strong>
                  </P>
                  <hr />
                  <P>
                    Position:
                    <Strong>{single.position}</Strong>
                  </P>
                  <hr
                    style={{
                      color: "red",
                      backgroundColor: "red",
                      marginTop: "10px",
                    }}
                  />
                </Col>
              ))}
            </Row>

            <Row bsPrefix="d-block d-md-none d-lg-none d-xl-none center-item">
              {StateWorkExp.map((single, key) => (
                <Col
                  xs={12}
                  s={12}
                  className="text-center"
                  key={key}
                  id="idforcss"
                >
                  <p>
                    CompanyName
                    <StrongMobile>{single.companyname}</StrongMobile>
                  </p>
                  <hr />
                  <p>
                    Start Work
                    <StrongMobile>{single.startwork}</StrongMobile>
                  </p>
                  <hr />
                  <p>
                    End Work
                    <StrongMobile>{single.endwork}</StrongMobile>
                  </p>
                  <hr />
                  <p>
                    Position
                    <StrongMobile>{single.position}</StrongMobile>
                  </p>
                </Col>
              ))}
            </Row>
          </Fragment>
        ) : (
          <Fragment>
            <Row bsPrefix="d-none d-md-block d-lg-block  d-xl-block center-item">
              <Col
                md={12}
                lg={12}
                xl={12}
                className="text-center"
                id="idforcss"
              >
                <P>CompanyName:</P>
                <hr />
                <P>Start Work:</P>
                <hr />
                <P>End Work:</P>
                <hr />
                <P>Position:</P>
              </Col>
            </Row>

            <Row bsPrefix="d-block d-md-none d-lg-none d-xl-none center-item">
              <Col xs={12} s={12} className="text-center" id="idforcss">
                <p>CompanyName</p>
                <hr />
                <p>Start Work</p>
                <hr />
                <p>End Work</p>
                <hr />
                <p>Position</p>
              </Col>
            </Row>
          </Fragment>
        )}
      </Rapperd>
      <>
        <AddWorkExp
          initialRef={initialRef}
          finalRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          workexperinceform={workexperinceform}
          setWorkexperinceform={setWorkexperinceform}
          allworkexp={allworkexp}
          setLoading={setLoading}
          setDisplayData={setDisplayData}
          currentUser={currentUser}
          id={id}
          Do_Submiting_WorkExp={Do_Submiting_WorkExp}
        />
      </>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  StateWorkExp: state.sectionWorkexperince.data.allwork,
});

const mapDispatchToProps = (dispatch) => ({
  AddToList: () => dispatch(AddToList()),
  Get_Workexperince: (currentUser, id) =>
    dispatch(Get_Workexperince(currentUser, id)),
  Do_Submiting_WorkExp: (currentUser, id, dataToBeSaved, toast) =>
    dispatch(Do_Submiting_WorkExp(currentUser, id, dataToBeSaved, toast)),
  Do_Delete_Cv: (currentUser, id, toast) =>
    dispatch(Do_Delete_Cv(currentUser, id, toast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workexperience);
