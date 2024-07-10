import { useContext, useEffect, useState } from "react";
import { ParamContext } from "../context/Context";
import NewsCard from "./NewsCard";
import Loading from "./Loading";
import Error from "./Error";

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
        if (!res || !res.ok) {
          setErr(true);
        } else {
          setErr(false);
          return res.json();
        }
      })
      .then((results) => {
        setResult(results.articles);
        setLoad(false);
      })
      .catch((error) => {
        setErr(true);
      });
  }, [url]);

  if (err) return <><Error /></>;

  return (
    <>
      {load ? (
        <div className="flex items-center justify-center mt-5">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full mx-auto">
          {result.map((news_item, idx) => (
            <div
              key={idx}
              className="w-full mx-4 my-4 shadow-md shadow-gray-500 p-4"
            >
              <NewsCard props={news_item} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Main;