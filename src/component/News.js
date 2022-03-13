import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../emitter/NewsContext";
import Spinner from "./Spinner";
import axios from "axios";

import ReactFlagsSelect from "react-flags-select";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import Carousel from "./Carousel";

import moment from "moment";
import NewsCard from "./NewsCard";
const News = (props) => {
  const { country, setCountry, apiKey } = useContext(NewsContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // apikey = process.env.REACT_APP_NEWS_API

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // constructor(props) {
  //     super(props);
  //     this.state = {
  //       articles: [],
  //       loading: false,
  //       page: 1,
  //     };
  //     document.title=`${this.capitalizeFirstLetter(props.category)} - NewsMonkey`

  //   }

  const updateNews = async () => {
    props.setProgress(30);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${
      props.category
    }&apiKey=${apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(async () => {
    updateNews();
  }, [country, props.category, page]);

  const countryNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${
      props.category
    }&apiKey=${apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
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
    countryNews();
    console.log("work navbar");
  }, [country, props.category, page]);
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${
      props.category
    }&apiKey=${apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);

    props.setProgress(100);
  };

  return (
    <div className="container my-3 pt-5">
      <h3 className="my-4 news-headline">
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} HeadLines
      </h3>
      <ReactFlagsSelect
        className="select-btn"
        selected={country}
        onSelect={(code) => setCountry(code)}
        countries={["IN", "US", "AU", "IT", "RS", "JP"]}
      />
      <div>
        <InfiniteScroll
          className="row justify-content-start mt-4"
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          {/* {/* <Carousel apiKey={props.apikey} category={props.category?props.category:"sports"}/> */}
          {/* <div className="row justify-content-start mt-4"> */}
          {articles.map((element, i) => {
            return (
              <div className="col-sm-3 py-3" key={i}>
                <NewsCard
                  sorcename={element.source.name}
                  author={element.author ? element.author : "Unknown"}
                  date={moment(element.publishedAt).format("lll")}
                  newsTitle={element.title ? element.title : ""}
                  imgUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://i.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA"
                  }
                  readMore={element.url}
                />

                {/* newsDescription={
                    element.description ? element.description : element.title
                  } */}
              </div>
            );
          })}
          {/* </div> */}
        </InfiniteScroll>
      </div>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
