import React, { useRef, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = styled.div`
  & .slick-slider {
    width: 772px;
    height: 658px;
  }

  button {
    z-index: 10;
    cursor: pointer;
  }
`;

const ImgContainer = styled.div`
  width: 160px;
  height: 90px;
  cursor: pointer;
  border: ${({ isCurrentSlide }) => (isCurrentSlide ? "3px solid red" : null)};
`;

const Thumbnail = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
`;

const images = [
  "https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
  "https://www.royalbcmuseum.bc.ca/sites/default/files/images/basic-pages/galleries/8952443104_808727392c_o.jpg",
  "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191120053137-03-milky-way-images-australia.jpg",
  "https://i0.wp.com/office365itpros.com/wp-content/uploads/2019/10/Teams-Custom-Background-Setting.jpg?fit=840%2C439&ssl=1",
  "https://media.istockphoto.com/photos/in-love-with-the-landscape-picture-id892010070?k=6&m=892010070&s=612x612&w=0&h=LE0vwwLhyLGUpQiP0OYXIYNtNWS5Ezna07YYyQ3WPe0=",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgswCFmbTpJmErjtFi_oOL8Q87v4W3jUQEDw&usqp=CAU",
];

const initialImages = [images[0], images[1], images[2], images[3], images[4]];

function CarouselComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlides, setCurrentSlides] = useState(initialImages);
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  let sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    swipeToSlide: true,
  };

  const getCarouselIndex = (img) => images.findIndex((image) => image === img);

  // Scrolls through thumbnail slider
  const nextSlide = () => {
    sliderRef.slickNext();

    // Keep scroll down through thumbnails if at the end.
    if (activeThumbnail < 4) {
      setActiveThumbnail((prevState) => prevState + 1);
    }

    // if at last slide set thumbnails to new slides. aka 0 - 4 initial then index 1-5, 2-6, 3-7 as we scroll through thumbnails
    if (currentSlide >= 4) {
      setCurrentSlides(() => images.slice(currentSlide - 3, currentSlide + 2));
    }

    if (currentSlide === images.length - 1) {
      // if last slide
      setCurrentSlides(initialImages); // reset thumbnails to initial images
      setActiveThumbnail(0); // reset active thumbnail to beginning
      return setCurrentSlide(0); // current slide resets to first.
    }

    setCurrentSlide((prevState) => prevState + 1);
  };

  const prevSlide = () => {
    sliderRef.slickPrev();

    // Keep scrolling up if at first image.
    if (activeThumbnail > 0) {
      setActiveThumbnail((prevState) => prevState - 1);
    }

    //If at top of thumbnail Gallery scroll back one thumbnail.
    if (activeThumbnail === 0) {
      setCurrentSlides(() => images.slice(currentSlide - 1, currentSlide + 4));
    }

    // If at very top of thumbnail gallery
    if (activeThumbnail === 0 && currentSlide === 0) {
      setCurrentSlides(() => images.slice(-5)); // Grab last thumbnails
      setActiveThumbnail(4); // set last as highlighted
      return setCurrentSlide(images.length - 1); // set current slide to last slide
    }

    setCurrentSlide((prevState) => prevState - 1);
  };

  const changeSlide = (slideNumber) => {
    sliderRef.slickGoTo(slideNumber);
    setCurrentSlide(slideNumber);
  };

  console.log(currentSlides);

  return (
    <>
      <Carousel>
        <h2> Single Item</h2>
        <Slider {...settings} ref={(ref) => (sliderRef = ref)}>
          {images.map((img) => (
            <img src={img} alt="text" key={img} />
          ))}
        </Slider>
      </Carousel>
      <button onClick={nextSlide}>next</button>
      <button onClick={prevSlide}>Prev</button>

      {/* THUMBNAIL SLIDER */}
      {currentSlides.map((image, index) => {
        return (
          <ImgContainer
            className="thumbnail-container"
            onClick={() => {
              changeSlide(getCarouselIndex(image));
              setActiveThumbnail(index);
            }}
            isCurrentSlide={activeThumbnail === index}
            key={image}
          >
            <Thumbnail src={image} alt="" className="thumbnail" />
          </ImgContainer>
        );
      })}
    </>
  );
}

export default CarouselComponent;
