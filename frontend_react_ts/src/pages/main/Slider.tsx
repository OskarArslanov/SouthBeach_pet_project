import React from "react";
import {Carousel} from 'react-bootstrap'
import carousel1 from './images/carousel1.jpg';
import carousel2 from './images/carousel2.jpg';
import carousel3 from './images/carousel3.jpg';
export default function () {
    return (
        <Carousel>
            <Carousel.Item>
                <img className={"d-block w-100"}
                     src={carousel1}
                     alt={"first slide"}
                />
                <Carousel.Caption>
                    <h3>some about black sea1</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className={"d-block w-100"}
                     src={carousel2}
                     alt={"second slide"}
                />
                <Carousel.Caption>
                    <h3>some about black sea2</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className={"d-block w-100"}
                     src={carousel3}
                     alt={"third slide"}
                />
                <Carousel.Caption>
                    <h3>some about black sea3</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}