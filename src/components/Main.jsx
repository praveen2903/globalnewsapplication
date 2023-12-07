import { useContext, useEffect, useState } from "react";
import { ParamContext } from "../context/Context";
import NewsCard from "./NewsCard";
import Loading from "./Loading";
import Error from "./Error";

// const key = `${process.env.REACT_APP_NEWS_API_KEY}`;

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
    url = `https://gnews.io/api/v4/search?token=c8315529a8b1679797271222a7b6fe03&q=${keyw}`;
  } else if (loc === "in") {
    if (cat)
      url = `https://gnews.io/api/v4/top-headlines?token=c8315529a8b1679797271222a7b6fe03&lang=${lang}&topic=${cat}&country=${loc}`;
    else
      url = `https://gnews.io/api/v4/top-headlines?token=c8315529a8b1679797271222a7b6fe03&lang=${lang}&country=${loc}`;
  } else {
    if (cat)
      url = `https://gnews.io/api/v4/top-headlines?token=c8315529a8b1679797271222a7b6fe03&lang=${lang}&topic=${cat}`;
    else
      url = `https://gnews.io/api/v4/top-headlines?token=c8315529a8b1679797271222a7b6fe03&lang=${lang}`;
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
        setResult(results.articles);
        setLoad(false);
      }).catch(error=>{
        setErr(true);
      })
      
  }, [url]);
 
  if (err) return (<><Error /> </>);

  return (
    <>
      {load?(
      <div className="flex items-center justify-center mt-5">
        {<Loading />}
    </div>
      ):(
    <div className="flex-col justify-center items-center w-full mx-auto sm:flex sm:flex-row sm:flex-wrap">
      {result.map((news_item, idx) => {
        return (
          <div
            key={idx + "$"}
            className="mx-4 my-4 shadow-md shadow-gray-500 sm:w-1/2 md:w-1/3 lg:w-1/4 flex items-center justify-center"
          >
            <NewsCard props={news_item} key={"&" + idx} />
          </div>
        );
      })}
    </div>
      )  
  }
   
    </>
  );
};

export default Main;