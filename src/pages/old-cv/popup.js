import { Rapper } from "./popup.styled";
import { Button } from "react-bootstrap";
const Popup = (props) => {
  return (
    <Rapper className="contianer text-center">
      <div className="row">
        <div className="col">
          <div className="popup">
            <h1>{props.text}</h1>
            <br /> <br />
            <Button onClick={props.closePopup}>Delete me</Button>
            <Button onClick={props.closePopup} className="btn btn-danger">
              close me
            </Button>
          </div>
        </div>
      </div>
    </Rapper>
  );
};

export default Popup;
