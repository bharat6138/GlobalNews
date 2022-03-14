import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../emitter/NewsContext";
import Spinner from "./Spinner";
import axios from "axios";
import PropTypes from "prop-types";
import moment from "moment";

const Carousel = (props) => {
  const { apiKey, setCountry, country } = useContext(NewsContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateCarousel = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${
        props.category
      }&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
  
      setLoading(true);
      await axios
        .get(url)
        .then((response) => {
          setArticles(response.data.articles);
          setTotalResults(response.data.totalResults);
        })
        .catch((error) => console.log(error));
      console.log(articles);
    };

    useEffect(async () => {
      updateCarousel();
  
      console.log("work navbar");
    }, [country]);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div className="carousel-inner">
        {articles.slice(0, 5).map((element, i) => {
          return (
            <div
              className={
                i === 0
                  ? "carousel-item text-center active"
                  : "carousel-item text-center"
              }
              key={element.url}
            >
              <a href={element.url} target="_blank" rel="noreferrer">
                <img
                  src={element.urlToImage?element.urlToImage:"https://fakeimg.pl/1900x1000/"}
                  className="d-block w-100 c-img"
                  alt="..."
                />
              </a>
              <div className="crd-sts">
                <div className="card card-blur-sl">
                  <div className="card-body">
                    <span className="badge rounded-pill bg-danger">
                      {element.source.name}
                    </span>
                    <p className="card-text text-start">
                      <small className="text-white fw-light">
                        By{" "}
                        <strong className=" mx-2 fw-bold text-decoration-underline">
                          {element.author}
                        </strong>
                        On{" "}
                        <strong className="fw-bold">
                          {moment(element.publishedAt).format("lll")}
                        </strong>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              <div className="carousel-caption d-none d-md-block gradient-bg">
                <div className="center-d">
                  <div className="row">
                    <div className="col-sm-12 text-start">
                      <h5 className="card-title fs-1 fw-bold">
                        {element.title}
                      </h5>
                      {/* <p className="card-text news-desc w-100 text-start">
                        {element.description
                          ? element.description
                          : element.title}
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

Carousel.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};
Carousel.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default Carousel;
