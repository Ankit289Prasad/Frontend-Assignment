import React, { useState } from 'react';
import './App.css'; // Import the custom CSS file for styling

const App = () => {
  const [symbol, setSymbol] = useState('');
  const [date, setDate] = useState('');
  const [tradeData, setTradeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/fetchStockData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol, date }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.error || 'Something went wrong.');
        setTradeData(null);
      } else {
        const data = await response.json();
        setTradeData(data);
        setError(null);
      }
    } catch (error) {
      setError('Something went wrong.');
      setTradeData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Trade Statistics</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label">Stock Symbol:</label>
          <input
            className="input"
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className="label">Date:</label>
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {tradeData && (
        <div className="trade-data">
          <h2>Trade Data for {symbol} on {date}</h2>
          <p>Open: {tradeData.open}</p>
          <p>High: {tradeData.high}</p>
          <p>Low: {tradeData.low}</p>
          <p>Close: {tradeData.close}</p>
          <p>Volume: {tradeData.volume}</p>
        </div>
      )}
    </div>
  );
};

export default App;
