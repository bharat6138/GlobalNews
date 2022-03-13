
import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../emitter/NewsContext";
import NewsCard from "./NewsCard";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingBar from 'react-top-loading-bar'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
const News = (props) => {
  const { data,country,setData,apiKey,progress, setProgress} = useContext(NewsContext);
 
  cconst [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalResults, seTotalResults] = useState(0);
  
function getData(){
  
}



const updateNews = async () => {
    props.setProgress(30);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    seTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
};
  useEffect(() => {
   updateNews()
  
  }, [country, props.category,setProgress,page]);

  // const handlePrevClick = async () => {
  //   console.log("previous");
  //    setPage(page - 1);
  // };

  const handleNextClick = async () => {
    
    setPage(page + 1);
  };
  return (
    <>
       <LoadingBar
    color='#f11946'
    progress={props.setProgress}
  />
    <div className="container my-3 pt-5">
  
      <h4 className="mb-3 mt-5 mx-2 news-headline">News Headline {props.category}</h4>
      
      {/* <InfiniteScroll
					className="row justify-content-start"
          dataLength={[]}
					next={handleNextClick}
          hasMore={true}
					loader={<Spinner />}
				> */}
        {data
          ? data.articles
              .map((news) => 
              <div className="col-sm-4" key={news.url}>
              <NewsCard data={news} category={props.category}  />
              </div>
              )
          : "Loading"}
     {/* </InfiniteScroll> */}
      {/* <div className="row justify-content-around mt-4">
            <div className="col-sm-6 text-start">
              <button
                type="button"
                disabled={ page <= 1}
                className="btn btn-dark"
                onClick={ handlePrevClick}
              >
                <i className="lni lni-arrow-left-circle me-2"></i>Previous
              </button>
            </div>
            <div className="col-sm-6 text-end">
              <button
                type="button"
                disabled={props.page + 1 > Math.ceil( totalResults /  props.pageSize)
                }
                className="btn btn-dark"
                onClick={ handleNextClick}
              >
                Next<i className="lni lni-arrow-right-circle ms-2"></i>
              </button>
            </div>
          </div> */}
    </div>
    </>
  );
};

News.defaultProps ={
  category: "general",
  progress: 0
}

News.propTypes={
  category: PropTypes.string,
  progress: PropTypes.number
}
export default News;

