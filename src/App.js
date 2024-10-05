import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import ResultPage from "./ResultPage";

function HomePage() {
  const [website, setWebsite] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the ResultPage with the entered website URL
    navigate(`/result?url=${encodeURIComponent(website)}`);
  };

  return (
    <div className="container">
      <h1>
        Build <span className="highlight">authentic relationships</span> with
        your clients
      </h1>
      <p className="description">
        Today, companies spend at least 30 mins on a brand assessment before
        social media and marketing agencies can produce content. At{" "}
        <span className="highlight">ZVOICE</span>, we're looking to give this
        time back to you while striving for brand consistency.
      </p>
      <h2>Curious how your brand is perceived by the public?</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="url"
          placeholder="Enter your company site"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="button">
          Get Access
        </button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
