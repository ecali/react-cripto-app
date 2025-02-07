import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Error } from "../components/Error";

import "./coin.css";
import { Loader } from "../components/Loader";
import { CoinsTokenResponse } from "../components/shared/interfaces";

export const Coin = () => {
  const params = useParams();

  const [coin, setCoin] = useState<CoinsTokenResponse>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const url = "https://api.coingecko.com/api/v3/coins/" + params.coinId;
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        if (response.data) {
          setCoin(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [url]);
  return (
    <div>
      <div className="coin-container">
        {!error && coin && (
          coin.market_cap_rank && (
            <>
              <div className="content">
                <div className="rank-content">
                  <div className="rank">
                    <span className="rank-btn">
                      Rank # {coin.market_cap_rank}
                    </span>
                  </div>
                </div>

                <h1 className="title">{coin.name}</h1>
              </div>
              <div className="content">
                <div className="info">
                  <div className="coin-heading">
                    {coin.image ? (
                      <img src={coin.image.small} alt={coin.name} />
                    ) : null}
                    <p>{coin.name}</p>
                    {coin.symbol ? (
                      <p>{coin.symbol.toUpperCase()}/EUR</p>
                    ) : null}
                  </div>
                  <div className="coin-price">
                    {coin.market_data?.current_price ? (
                      <h1>
                        {coin.market_data.current_price.eur.toLocaleString()} €
                      </h1>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="content">
                <table>
                  <thead>
                    <tr>
                      <th>1h</th>
                      <th>24h</th>
                      <th>7d</th>
                      <th>14d</th>
                      <th>30d</th>
                      <th>1yr</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {coin.market_data
                          ?.price_change_percentage_1h_in_currency ? (
                          <p>
                            {coin.market_data.price_change_percentage_1h_in_currency?.eur.toFixed(
                              1
                            )}
                            %
                          </p>
                        ) : null}
                      </td>
                      <td>
                        {coin.market_data
                          ?.price_change_percentage_24h_in_currency ? (
                          <p>
                            {coin.market_data.price_change_percentage_24h_in_currency?.eur.toFixed(
                              1
                            )}
                            %
                          </p>
                        ) : null}
                      </td>
                      <td>
                        {coin.market_data
                          ?.price_change_percentage_7d_in_currency ? (
                          <p>
                            {coin.market_data.price_change_percentage_7d_in_currency?.eur.toFixed(
                              1
                            )}
                            %
                          </p>
                        ) : null}
                      </td>
                      <td>
                        {coin.market_data
                          ?.price_change_percentage_14d_in_currency ? (
                          <p>
                            {coin.market_data.price_change_percentage_14d_in_currency?.eur.toFixed(
                              1
                            )}
                            %
                          </p>
                        ) : null}
                      </td>
                      <td>
                        {coin.market_data
                          ?.price_change_percentage_30d_in_currency ? (
                          <p>
                            {coin.market_data.price_change_percentage_30d_in_currency?.eur.toFixed(
                              1
                            )}
                            %
                          </p>
                        ) : null}
                      </td>
                      <td>
                        {coin.market_data
                          ?.price_change_percentage_1y_in_currency ? (
                          <p>
                            {coin.market_data.price_change_percentage_1y_in_currency?.eur.toFixed(
                              1
                            )}
                            %
                          </p>
                        ) : null}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="content">
                <div className="stats">
                  <div className="left">
                    <div className="row">
                      <h4>24 Hour Low</h4>
                      {coin.market_data?.low_24h ? (
                        <p>{coin.market_data.low_24h.eur.toLocaleString()}€</p>
                      ) : null}
                    </div>
                    <div className="row">
                      <h4>24 Hour High</h4>
                      {coin.market_data?.high_24h ? (
                        <p>{coin.market_data.high_24h.eur.toLocaleString()}€</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="right">
                    <div className="row">
                      <h4>Market Cap</h4>
                      {coin.market_data?.market_cap ? (
                        <p>
                          {coin.market_data.market_cap.eur.toLocaleString()}€
                        </p>
                      ) : null}
                    </div>
                    <div className="row">
                      <h4>Circulating Supply</h4>
                      <p>
                        {coin.market_data
                          ? coin.market_data.circulating_supply
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="about">
                  <h3>About</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        coin.description ? coin.description.en : ""
                      ),
                    }}
                  ></p>
                </div>
              </div>
            </>
          ) 
        ) }
        {error && (
          <Error home={true} />
        )}
        {loading &&  (
            <Loader />
          )}
      </div>
    </div>
  );
};
