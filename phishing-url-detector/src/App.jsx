
import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const checkURL = () => {
    if (!url.trim()) {
      setResult("Please enter a URL first.");
      return;
    }

    setLoading(true);
    setResult("");

    setTimeout(() => {
      try {
        const parsedURL = new URL(
          /^https?:\/\//i.test(url) ? url : `https://${url}`
        );

        const suspiciousPatterns = [
          /@/,
          /login.*verify/i,
          /secure.*account/i,
          /free.*gift/i,
          /password.*reset/i,
        ];

        const suspicious =
          parsedURL.protocol !== "https:" ||
          parsedURL.hostname.split(".").length > 3 ||
          suspiciousPatterns.some((pattern) => pattern.test(url)) ||
          /^(https?:\/\/)?\d{1,3}(\.\d{1,3}){3}/i.test(url);

        setResult(
          suspicious
            ? "Warning: This URL has suspicious indicators. Verify it before opening."
            : "No obvious suspicious patterns detected. This does not guarantee the URL is safe."
        );
      } catch {
        setResult("Invalid URL. Please enter a valid web address.");
      }

      setLoading(false);
    }, 700);
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">🛡️</span>
          <span>PhishGuard</span>
        </div>

        <span className="status">
          <span className="status-dot"></span>
          URL Security Checker
        </span>
      </header>

      <main className="main-content">
        <div className="hero-badge">YOUR FIRST LINE OF DEFENSE</div>

        <h1>
          Detect threats.
          <br />
          <span>Browse smarter.</span>
        </h1>

        <p className="description">
          Check suspicious links for common phishing indicators before
          you decide whether to visit them.
        </p>

        <section className="scanner">
          <label htmlFor="url-input">Enter website URL</label>

          <div className="input-wrapper">
            <span className="link-icon">🔗</span>

            <input
              id="url-input"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                setResult("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") checkURL();
              }}
            />

            <button onClick={checkURL} disabled={loading}>
              {loading ? "Checking..." : "Scan URL →"}
            </button>
          </div>

          <p className="privacy-note">
            🔒 Basic local checks only. Your URL is not sent to a security
            service.
          </p>

          {result && (
            <div className="result-box" role="status">
              <strong>Scan result</strong>
              <p>{result}</p>
            </div>
          )}
        </section>

        <section className="features">
          <article className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Pattern Detection</h3>
            <p>Check URLs for selected suspicious patterns.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Analysis</h3>
            <p>Get instant feedback from local checks.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Privacy First</h3>
            <p>Analysis runs in your browser without an external API.</p>
          </article>
        </section>

        <p className="disclaimer">
          Educational project only. These checks cannot reliably identify
          all phishing URLs or guarantee that a website is safe.
        </p>
      </main>

      <footer>
        <p>© 2026 PhishGuard | Built with React</p>
      </footer>
    </div>
  );
}

export default App;