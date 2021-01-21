import { Rapper } from "./popup.styled";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Get_oldCv, Delete_Single_CV } from "../../redux/oldcv/oldcvAction";

const Popup = ({ Delete_Single_CV, closePopup, text, currentUser, id }) => {
  return (
    <Rapper className="contianer text-center">
      <div className="row">
        <div className="col">
          <div className="popup">
            <h1>{text}</h1>
            <br /> <br />
            <Button onClick={() => Delete_Single_CV(id, currentUser)}>
              Delete me
            </Button>
            <Button onClick={closePopup} className="btn btn-danger">
              Close me
            </Button>
          </div>
        </div>
      </div>
    </Rapper>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  Delete_Single_CV: (id, currentUser) =>
    dispatch(Delete_Single_CV(id, currentUser)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
