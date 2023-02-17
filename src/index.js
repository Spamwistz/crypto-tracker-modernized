import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const API_URL = 'https://api.coincap.io/v2/assets';

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

function renderTable(data) {
  const table = (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Change (24h)</th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin, index) => (
          <tr key={coin.id}>
            <td>{index + 1}</td>
            <td>{coin.name}</td>
            <td>${(+coin.priceUsd).toFixed(2)}</td>
            <td style={{ color: coin.changePercent24Hr < 0 ? 'red' : 'green' }}>
              {coin.changePercent24Hr}%
            </td>
            <td>${(+coin.marketCapUsd).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

async function main() {
  try {
    const data = await fetchData(API_URL);
    renderTable(data);
  } catch (error) {
    console.error(error);
  }
}

main();
