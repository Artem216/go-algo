import React from "react";

interface StockCard {
  id: number;
  name: string;
  logo: any;
  price: number;
  profit: number;
  risc: string;
}

function RecSys() {
  const stocs: StockCard[] = [
    {
      id: 1,
      name: "RKKE",
      logo: " ",
      price: 22890,
      profit: 115,
      risc: "средний",
    },
    {
      id: 2,
      name: "CIAN",
      logo: " ",
      price: 556.8,
      profit: 110,
      risc: "средний",
    },
    {
      id: 3,
      name: "WUSH",
      logo: " ",
      price: 209,
      profit: 107,
      risc: "средний",
    },
    {
      id: 4,
      name: "LIFE",
      logo: " ",
      price: 4.91,
      profit: 105,
      risc: "средний",
    },
    {
      id: 5,
      name: "MISBP",
      logo: " ",
      price: 49.6,
      profit: 135,
      risc: "средний",
    },
    {
      id: 6,
      name: "LSRG",
      logo: " ",
      price: 622,
      profit: 108,
      risc: "средний",
    },
  ];
  return (
    <div
      style={{
        paddingLeft: "205px",
        paddingRight: "205px",
        paddingTop: "45px",
      }}
    >
      <div
        style={{
          fontSize: "40px",
          fontWeight: "200",
          lineHeight: "normal",
          fontFamily: "Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        АКЦИИ КОТОРЫЕ МЫ РЕКОМЕНДУЕМ ПОКУПАТЬ
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "35px",
        }}
      >
        {stocs.map((stock) => {
          return (
            <div
              style={{
                fontSize: "20px",
                fontWeight: "400",
                lineHeight: "normal",
                fontFamily: "Roboto, sans-serif",
                background: "#f3f4f6",
                width: "350px",
                height: "150px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginRight: "50px",
                marginBottom: "45px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: "25px",
                  paddingLeft: "25px",
                  fontWeight: "800",
                }}
              >
                <div>{stock.name}</div>
                <div>{stock.logo}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: "25px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
              >
                <div>Цена: {stock.price} ₽</div>
                <div> Профит: {stock.profit} %</div>
                <div>Риск: {stock.risc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecSys;
