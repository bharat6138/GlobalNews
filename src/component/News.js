import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../emitter/NewsContext";
import Spinner from "./Spinner";
import axios from "axios";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactFlagsSelect from "react-flags-select";
import Carousel from "./Carousel";
// import Carousel from "./Carousel";

import moment from "moment";
import NewsCard from "./NewsCard";
const News = (props) => {
  const { apiKey, setCountry, country } = useContext(NewsContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // apikey = process.env.REACT_APP_NEWS_API

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updateNews = async () => {
    props.setProgress(30);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    await axios
      .get(url)
      .then(response => {
        props.setProgress(40);
        setArticles(response.data.articles);
        setTotalResults(response.data.totalResults);
        setLoading(true);
        props.setProgress(100);
        console.log(response.data)

       })
      .catch((error) => console.log(error));
     
  };
  const countryNews = async () => {
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

  // const slectedCountry = async () => {
  //   //let setC = ((code) => setCountry(code))
  //     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${
  //       props.category
  //     }&apiKey=${apiKey}&page=1&pageSize=${props.pageSize}`;
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     setArticles(articles.concat(parsedData.articles));
  //     setTotalResults(parsedData.totalResults);
  //     props.setProgress(100);
  //     alert("page 1")
  // };
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
    //alert("page last")
    //alert(((code) => setCountry(code)))
    
  };
  useEffect(async () => {
    countryNews();

    console.log("work navbar");
  }, [country]);
 
//props.category
  return (
    <div className="container my-3 pt-5">
      <div className="row justify-content-between mt-4">
        <div className="col-sm-10 text-start align-self-center">
          <h3 className="my-2 news-headline">
            Top <strong>{capitalizeFirstLetter(props.category)}</strong> HeadLines of {country}
          </h3>
        </div>
        <div className="col-sm-2 text-start align-self-center">
          <ReactFlagsSelect
            className="select-btn my-2 "
            selected={country}
            onSelect={((code) => setCountry(code, setPage(1),props.category))}
            countries={["IN", "US", "AU", "IT", "RS", "JP"]}
          />
        </div>
      </div>
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
        <Carousel category={props.category}/>
          {articles.map((element, i) => {
            return (
              <div className="col-sm-4 py-3" key={i}>
                <NewsCard
                  sorcename={element.source.name}
                  author={element.author ? element.author : "Unknown"}
                  date={moment(element.publishedAt).format("lll")}
                  newsTitle={element.title ? element.title : ""}
                  imgUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://fakeimg.pl/1900x1000/"
                  }
                  newsDescription={
                    element.description ? element.description : element.title
                  }
                  readMore={element.url}
                />
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
