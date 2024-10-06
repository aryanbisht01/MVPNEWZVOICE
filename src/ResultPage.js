import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null); // State to store the id from the first API

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const websiteUrl = params.get("url");

  // First API call to get the ID
  useEffect(() => {
    if (websiteUrl) {
      const encodedUrl = encodeURIComponent(websiteUrl);
      const targetUrl = `https://kcvjp07281.execute-api.us-east-1.amazonaws.com/getBrandData?url=${encodedUrl}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
        targetUrl
      )}`;

      fetch(proxyUrl)
        .then((response) => response.json())
        .then((result) => {
          const parsedData = result.contents
            ? JSON.parse(result.contents).body
            : null;

          // Store the id from the first API
          if (parsedData && parsedData.id) {
            setId(parsedData.id); // Save the id to the state
          }
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [websiteUrl]);

  // Second API call to use the ID and get the additional data
  useEffect(() => {
    if (id) {
      const secondApiUrl = `https://kcvjp07281.execute-api.us-east-1.amazonaws.com/getBrandData?isLoggedIn=true&id=${id}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
        secondApiUrl
      )}`;

      fetch(proxyUrl)
        .then((response) => {
          if (response.status === 403) {
            throw new Error("Access Forbidden: CORS or server restriction.");
          }
          return response.json();
        })
        .then((result) => {
          const parsedData = result.contents
            ? JSON.parse(result.contents)
            : null;
          setData(parsedData); // Save the result of the second API
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="result-container">
      {/* Remove this h1 if you don't want the "API Result for ID" text */}
      {/* <h1>Brand Assessment Result for: {websiteUrl}</h1> */}

      {data && data.body && data.body.newQuestions ? (
        <div className="questions-list">
          {data.body.newQuestions.map((item, index) => (
            <div key={index} className="question-answer">
              {/* Numbered questions */}
              <h3>
                {index + 1}. Question: {item.question}
              </h3>
              <p>Answer: {item.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No data found.</div>
      )}
    </div>
  );
};

export default ResultPage;
