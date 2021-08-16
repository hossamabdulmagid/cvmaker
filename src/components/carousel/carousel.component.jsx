import { Fragment } from "react";
import Carousel from "react-bootstrap/Carousel";
const Caro = () => {
  return (
    <Fragment>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="1.png" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="2.png" alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="3.png" alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </Fragment>
  );
};
export default Caro;
