import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let assessmentId = null; // Declare a variable to store the id

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const websiteUrl = params.get("url");

  useEffect(() => {
    if (websiteUrl) {
      const encodedUrl = encodeURIComponent(websiteUrl);
      const proxyUrl = "https://api.allorigins.win/get?url=";
      const targetUrl = `https://kcvjp07281.execute-api.us-east-1.amazonaws.com/getBrandData?url=${encodedUrl}`;

      fetch(proxyUrl + targetUrl)
        .then((response) => response.json())
        .then((result) => {
          // Parse the 'contents' field into JSON
          const parsedData = JSON.parse(result.contents).body;
          setData(parsedData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [websiteUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="result-container">
      <h1>Brand Assessment Result for: {websiteUrl}</h1>
      {data && data.newQuestions ? (
        <div className="questions-list">
          {data.newQuestions.map((item, index) => (
            <div key={index} className="question-answer">
              <h3>Question: {item.question}</h3>
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
