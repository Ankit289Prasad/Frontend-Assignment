import React, { useState, useEffect } from 'react';
import './App.css'; // Import the custom CSS file for styling

const App = () => {
    const [symbol, setSymbol] = useState('');
    const [date, setDate] = useState('');
    const [tradeData, setTradeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [prevSymbol, setPrevSymbol] = useState('');
    const [prevDate, setPrevDate] = useState('');

    // Get tomorrow's date in YYYY-MM-DD format
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];

    // Function to get the key for local storage based on symbol and date
    const getLocalStorageKey = (symbol, date) => `tradeData_${symbol}_${date}`;

    // Function to fetch trade data from API
    const fetchTradeData = async (symbol, date) => {
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
                // Save the data to local storage
                localStorage.setItem(getLocalStorageKey(symbol, date), JSON.stringify(data));
            }
        } catch (error) {
            setError('Something went wrong.');
            setTradeData(null);
        } finally {
            setLoading(false);
        }
    };

    // Function to check if data for a given symbol and date is available in local storage
    const checkLocalStorage = (symbol, date) => {
        const tradeDataFromLocalStorage = localStorage.getItem(getLocalStorageKey(symbol, date));
        if (tradeDataFromLocalStorage) {
            setTradeData(JSON.parse(tradeDataFromLocalStorage));
        }
    };

    useEffect(() => {
        // Check local storage on initial render
        checkLocalStorage(symbol, date);
    }, [symbol, date]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (symbol !== prevSymbol || date !== prevDate) {
            // Only update trade data if either the stock symbol or date has changed
            setPrevSymbol(symbol);
            setPrevDate(date);
            fetchTradeData(symbol, date);
        }
    };

    const handleSymbolChange = (e) => {
        setSymbol(e.target.value);
        setTradeData(null); // Clear previous result
        setError(null); // Clear any errors
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
        setTradeData(null); // Clear previous result
        setError(null); // Clear any errors
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
                        onChange={handleSymbolChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Date:</label>
                    <input
                        className="input"
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        max={tomorrowDate} // Set the maximum date
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
                    <h3>Trade Data for {symbol} on {date}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Open</th>
                                <td>{tradeData.open}</td>
                            </tr>
                            <tr>
                                <th>High</th>
                                <td>{tradeData.high}</td>
                            </tr>
                            <tr>
                                <th>Low</th>
                                <td>{tradeData.low}</td>
                            </tr>
                            <tr>
                                <th>Close</th>
                                <td>{tradeData.close}</td>
                            </tr>
                            <tr>
                                <th>Volume</th>
                                <td>{tradeData.volume}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default App;
