import { retry } from "@reduxjs/toolkit/query";
import React from "react";

import { useState, useEffect } from "react";
import { API_URL } from "../config";
import axios from "axios";
import authHeader from "../utils/authHeaders";

interface Transaction {
  price: string;
  quantity: number;
  deal_type: string;
  user: string;
  instrument: string;
  balance: number;
  id: number;
  datetime: Date;
}

const BuySellBlock: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const botSessionsResponse = await axios.get(
        API_URL + "/api/v1/trader/get_all_user_bots",
        {
          headers: authHeader(),
        }
      );

      const transactionsResponse = await Promise.all(
        botSessionsResponse.data.map(async (bot: any) => {
          const dealsResponse = await axios.post(
            API_URL + "/api/v1/trader/user_deals_by_instrument",
            {
              instrument_code: bot.instrument_code,
            },
            {
              headers: authHeader(),
            }
          );
          return dealsResponse.data;
        })
      );

      const mergedTransactions = transactionsResponse.flat();

      setTransactions(mergedTransactions);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (transactions.length > 0) {
    return (
      <div
        style={{
          width: "40%",
          background: "#F3F4F6",
          borderRadius: 4,
          paddingBottom: "20px",
          minHeight: "700px",
          border: "1px solid red",
        }}
      >
        <p
          style={{
            margin: "10px 20px",
            paddingTop: "10px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Совершённые сделки:
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "10px 20px",
            backgroundColor: "#F3F4F6",
            marginLeft: "20px",
          }}
        >
          <div style={{ flex: 1 }}>Акция</div>
          <div style={{ flex: 1 }}>Дата</div>
          <div style={{ flex: 1 }}>Цена</div>
          <div style={{ flex: 1 }}>Количество</div>
        </div>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px 20px",
              backgroundColor:
                transaction.deal_type == "buy" ? "#21D329" : "#D32121",
              borderRadius: "8px",
              marginTop: "5px",
              marginRight: "20px",
              marginLeft: "20px",
            }}
          >
            <div style={{ flex: 1 }}>{transaction.instrument}</div>
            <div style={{ flex: 1 }}>
              {transaction.datetime
                .toLocaleString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                .slice(0, 10)}
            </div>
            <div style={{ flex: 1 }}>{transaction.price}</div>
            <div style={{ flex: 1 }}>{transaction.quantity}</div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: "40%",
          background: "#F3F4F6",
          borderRadius: 4,
          paddingBottom: "20px",
          minHeight: "700px",
          border: "1px solid red",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontWeight: "200",
            fontFamily: "Roboto, sans-serif",
            marginLeft: "25px",
            marginTop: "25px",
          }}
        >
          У вас нет совершённых сделок.
        </div>
      </div>
    );
  }
};

export default BuySellBlock;
