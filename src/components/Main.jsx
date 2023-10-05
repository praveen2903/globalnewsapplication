import { useContext, useEffect, useState } from "react";
import { ParamContext } from "../context/Context";
import NewsCard from "./NewsCard";
import Loading from "./Loading";
import Error from "./Error";

const key = `${process.env.REACT_APP_NEWS_API_KEY}`;

const Main = () => {
    
  const params = useContext(ParamContext);
  const [result, setResult] = useState([]);
  const [err, setErr] = useState(false);
  const loc = params.location.toLowerCase();
  const cat = params.category.toLowerCase();
  const keyw = params.keyword.toLowerCase();
  const lang = params.lang || "en";

  var url = "https://gnews.io/api/v4/top-headlines?";
  const [load, setLoad] = useState(true);

  if (keyw) {
    url = `https://gnews.io/api/v4/search?token=${key}&q=${keyw}`;
  } else if (loc === "in") {
    if (cat)
      url = `https://gnews.io/api/v4/top-headlines?token=${key}&lang=${lang}&topic=${cat}&country=${loc}`;
    else
      url = `https://gnews.io/api/v4/top-headlines?token=${key}&lang=${lang}&country=${loc}`;
  } else {
    if (cat)
      url = `https://gnews.io/api/v4/top-headlines?token=${key}&lang=${lang}&topic=${cat}`;
    else
      url = `https://gnews.io/api/v4/top-headlines?token=${key}&lang=${lang}`;
  }
  useEffect(() => {
    setLoad(true);
    fetch(url)
      .then((res) => {
        if(!res||!res.ok){
          setErr(true);
        }else{
        setErr(false);
        return  res.json();
        }
      })
      .then((results) => {
        console.log(results);
        setResult(results.articles);
        setLoad(false);
      }).catch(error=>{
        setErr(true);
      })
      
  }, [url]);
  console.log(err);
  if (err) return (<><Error /> </>);
  return (
    <>
      {load && <Loading />}
      <div className="flex-col justify-center items-center w-full mx-auto sm:flex sm:flex-row  sm:flex-wrap ">
        {result.map((news_item, idx) => {
          return (
            <div
              key={idx + "$"}
              className="my-4 mx-2  shadow-md shadow-gray-500 sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <NewsCard props={news_item} key={"&" + idx} />
            </div>
          );
        })}
      </div>
   
    </>
  );
};

export default Main;