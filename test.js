




import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../emitter/NewsContext";
import NewsCard from "./NewsCard";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingBar from 'react-top-loading-bar'


const News = (props) => {
  const { data,country,setData,apiKey,progress, setProgress} = useContext(NewsContext);
  let num = parseInt(Number(props.progress) + 60);
  useEffect(() => {
    
    console.log("category " + props.category)
    
    //progress(props.progress +60)

   // console.log("porr " + (progress(props.progress +60)))
    //setProgress(props.progress + 60)
    
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${country}&apiKey=${apiKey}`
      )
      .then((response, setProgress ) => {
        //alert(Number(num));
        setData(response.data)})
      .catch((error) => console.log(error))
      .finally(() => num + 20);
    
  }, [country, props.category,props.progress]);

  console.log(data);
  //console.log("my log ss " + parseInt(num + 20), typeof num)
  return (
    <>
       <LoadingBar
    color='#f11946'
    progress={num}
  />
    <div className="container my-3 pt-5">
  
      <h4 className="mb-3 mt-5 mx-2 news-headline">News Headline {props.category}</h4>
      <div className="row justify-content-start">
        {data
          ? data.articles
              .slice(0, 5)
              .map((news) => <NewsCard data={news} category={props.category}  key={news.url} />)
          : "Loading"}
      </div>
    </div>
    </>
  );
};

News.defaultProps ={
  category: "general",
}

News.propTypes={
  category: PropTypes.string,
}
export default News;












import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../emitter/NewsContext";
import NewsCard from "./NewsCard";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingBar from 'react-top-loading-bar'


const News = (props) => {
  const {apiKey} = useContext(NewsContext);
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState("IN");
  const updateNews = async () => {
		props.setProgress(30);
		const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${country}&apiKey=${apiKey}`;
		let data = await fetch(url);
	props.setProgress(40);
		let parsedData = await data.json();
		props.setProgress(70);
		console.log(parsedData);
		setArticles(articles.concat(parsedData.articles));
		props.setProgress(100);
	};


  //console.log("category yy" + this.props.setProgress(30))
  useEffect(() => {
    updateNews();
  }, [country, props.category,props.progress]);
  
  //console.log(articles);
  //console.log("my log ss " + parseInt(num + 20), typeof num)
  return (
    <>
 
    <div className="container my-3 pt-5">
  
      <h4 className="mb-3 mt-5 mx-2 news-headline">News Headline {props.category}</h4>
      <div className="row justify-content-start">
      {articles.slice(0, 5).map((element,i) => {
        return (
        <NewsCard data={element} category={props.category}  key={element.url} />
        );
      })}
      </div>
    </div>
    </>
  );
};

News.defaultProps ={
  category: "general",
}

News.propTypes={
  category: PropTypes.string,
}
export default News;



function getData(){
  
    axios
    .get(
      `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${country}&apiKey=${apiKey}`
    )
    .then((response) => {
      props.setProgress(60);
      setData(response.data);
      props.setProgress(100);
    })
    .catch((error) => console.log(error));
    setLoading(false);
	}







    useEffect( async ()  => {
        props.setProgress(30);
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
            setLoading(true);
         await axios
        .get(url)
        .then((response) => {
          props.setProgress(40);
          setArticles(response.data.articles);
          console.log(articles);
          setLoading(false);
          props.setProgress(100);
        })
        .catch((error) => console.log(error));
        setLoading(false);
            // props.setProgress(40);
            // let parsedData = await data.json();
            // props.setProgress(70);
            // console.log(parsedData);
            // setArticles(articles.concat(parsedData.articles));
            // seTotalResults(parsedData.totalResults);
        
    
            // props.setProgress(100);
        }, [country, props.category,page]);




        useEffect( async ()  => {
            async function updateNews() {
              const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
              setLoading(true);
              const data = await fetch(url);
              const parsedData = await data.json();
              setArticles(articles.concat(parsedData.articles));
                seTotalResults(parsedData.totalResults);
                setLoading(false);
          }
          updateNews();
            // props.setProgress(30);
                // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
                // setLoading(true);
                // let data = await fetch(url, country);
                // props.setProgress(40);
                // let parsedData = await data.json();
                // props.setProgress(70);
                // console.log(parsedData);
                // setArticles(articles.concat(parsedData.articles));
                // seTotalResults(parsedData.totalResults);
                // setLoading(false);
                // props.setProgress(100);
            }, [country, props.category,page]);



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
                    setLoading(false);
                    props.setProgress(100);
                    console.log(response.data)
            
                   })
                  .catch((error) => console.log(error));
                 
              };