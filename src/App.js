import { React, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';



function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response => {
        setCoins(response.data);
      }).catch(error => console.log(error));

  },[]);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  // Search Area
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="coin-app">
      <div className="coin-search">
        <div className="coin-text">Search a coin</div>
        <form>
          <input type="text" onChange={handleChange} placeholder="Search" className="coin-input" />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id}
          name={coin.name}
          price={coin.current_price}
          symbol={coin.symbol}
          image={coin.image}
          marketCap={coin.market_cap}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
        )
      })}
    </div>

  );
}

export default App;
