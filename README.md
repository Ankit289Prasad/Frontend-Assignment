# Trade Statistics Web App

A web application to display trade statistics (Open, High, Low, Close, Volume) of a particular stock for a particular day using the Polygon free tier API.

## Features

- User-friendly form to input the stock symbol and select a date to fetch trade statistics.
- Real-time API calls to Polygon API to fetch the trade statistics for the given stock and date.
- Display of trade statistics (Open, High, Low, Close, Volume) in a table format for easy readability.
- Validation to prevent fetching the same data again if the stock symbol and date are the same as the previous query.
- Use of local storage to store the fetched trade data for faster retrieval in case the same data is requested again.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the "server" folder and install the required dependencies using `npm install`.
3. Create a .env file in the "server" folder and add your Polygon API key as `POLYGON_API_KEY=YOUR_POLYGON_API_KEY`.
4. Run the server using `npm start`. The server will be accessible at http://localhost:5000.
5. Navigate to the "client" folder and install the required dependencies using `npm install`.
6. Run the React app using `npm start`. The app will be accessible at http://localhost:3000.

   ![image](https://github.com/Ankit289Prasad/Frontend-Assignment/assets/41874710/be0af2a5-295f-4ae0-95c7-6a18f1335910)


## Usage

1. Enter the stock symbol (e.g., AAPL, GOOGL) in the "Stock Symbol" input field.
2. Select the date for which you want to fetch the trade statistics in the "Date" input field. Note that the date cannot be set to a future date.
3. Click the "Fetch Data" button to retrieve the trade statistics for the specified stock and date.
4. If you try to fetch the same data (same stock symbol and date) again, a notification message will appear indicating that the data is already fetched.
5. The fetched trade statistics will be displayed in a table format below the form, showing the Open, High, Low, Close, and Volume values.

## Project Structure

- The "server" folder contains the backend code written in Node.js using Express.
- The "client" folder contains the frontend code written in React.
- The "App.js" file in the "client" folder contains the main logic and UI components for the web app.
- The "App.css" file in the "client" folder contains the custom CSS for styling the UI.
- The backend server listens on port 5000, and the frontend app runs on port 3000 by default.

## Edge Cases Handled

- Proper error handling for API calls and displaying error messages to the user when necessary.
- Prevents API calls when the date is set to today or a future date using the `max` attribute on the date input field.
- Validation to avoid fetching the same data again if the stock symbol and date are the same as the previous query.
- Handling CORS by allowing requests from "http://localhost:3000" in the backend.

## Improvements and Future Enhancements

- Implement user authentication to provide personalized trade statistics for registered users.
- Add pagination or infinite scrolling for displaying trade statistics for multiple days.
- Include more advanced technical indicators and charts to visualize the stock performance.
- Add a date range picker to fetch trade statistics for a specific range of dates.
- Implement caching mechanisms to reduce API calls and improve app performance.
- Optimize the UI design for better user experience on various devices (responsive design).
- Integrate real-time stock price updates using web sockets to show live data to users.
- Provide an option to export trade data to CSV or PDF for further analysis.

---
