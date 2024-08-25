import React, { useState, useEffect } from 'react';

function Quote() {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [error, setError] = useState(null);

  const handleQuote = () => {
    const api = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

    fetch(api)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((results) => {
        if (results.quotes && results.quotes.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.quotes.length);
          setQuote(results.quotes[randomIndex]);
        } else {
          setError('No quotes found in the response.');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    handleQuote();
  }, []);

  return (
    <div className="container" id="quote-box">
      <h1>Quote of the Day</h1>
      {error ? (
        <p className="error">
          Error: 
          {error}
        </p>
      ) : (
              <>
                  <i className="fa-solid fa-quote-left" />
                  <p className="quote-content" id="text">{quote.quote}</p>
                  <p className="author" id="author">
                    ---
                    {quote.author}
                  </p>
                </>
      )}
      <div className="button-position">
              <button onClick={handleQuote} id="new-quote">New Quote</button>
      </div>
      <div>
          <a href="twitter.com/intent/tweet" target="_blank _top" id="tweet-quote">twitter</a>
      </div>
    </div>
  );
}

export default Quote;
