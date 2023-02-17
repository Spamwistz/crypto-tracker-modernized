import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://api.coinmarketcap.com/data-api/v3/topsearch/rank"
      );
      setData(result.data.data);
    };
    fetchData();
  }, []);

  const renderTableData = () => {
    return data.map((coin, index) => {
      const { name, symbol, price } = coin;
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
              alt=""
              width="30"
            />{" "}
            {name}
          </td>
          <td>{symbol}</td>
          <td>${price}</td>
        </tr>
      );
    });
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};

export default App;
