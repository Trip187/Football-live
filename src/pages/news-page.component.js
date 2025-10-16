import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import classes from "./news-page.styles.module.css";

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/latest?apikey=pub_148b0241d6d7450098a5205c460485b5&q=football"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const data = await response.json();
        console.log(data);
        setNewsData(data.results || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Stack gap={3}>
      <div className="p-2">
        <h2 className={classes["header"]}>Global Sports News</h2>
        <hr />
      </div>
      <div className="p-2">
        {newsData.length > 0 ? (
          newsData.map((news) => (
            <div key={news.article_id} className="p-2">
              <p className={classes["title"]}>{news.title}</p> <br />
              <p className={classes["image"]}>
                <img
                  src={news.image_url}
                  alt={news.title}
                  style={{ objectFit: "contain" }}
                  width={600}
                  height={300}
                />{" "}
              </p>
              <br />
              <p className={classes["description"]}>{news.description}</p>{" "}
              <br />
              <p className={classes["numbers"]}>{news.pubDate}</p> <br />
              <p className={classes["source-url"]}>
                Source: <Link to={news.source_url}>{news.link}</Link>
              </p>
              <hr />
            </div>
          ))
        ) : (
          <div>No news available</div>
        )}
      </div>
    </Stack>
  );
};
export default NewsPage;
