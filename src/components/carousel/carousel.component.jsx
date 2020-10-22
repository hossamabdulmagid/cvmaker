import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../../App.css'
const Caro = () => {
    return (
        <div className="relative">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="1.png"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="2.png"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3></h3>
                        <p>.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="3.png"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3></h3>
                        <p>.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
};
export default Caro;