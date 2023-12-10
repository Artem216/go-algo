import React from "react";
import { Button } from "@mui/material";

import StockCards from "../StockCards";

function Hello() {
  return (
    <>
      <div
        style={{
          background: "#f3f4f6",
          paddingLeft: "205px",
          paddingRight: "205px",
          paddingTop: "25px",
        }}
      >
        <StockCards />
        <div
          style={{
            fontSize: "80px",
            fontWeight: "200",
            lineHeight: "normal",
            fontFamily: "Roboto, sans-serif",
            textAlign: "center",
            paddingBottom: "60px",
            paddingTop: "45px",
          }}
        >
          НАЧНИТЕ СВОЙ ПУТЬ В АЛГОТРЕЙДИНГЕ ВМЕСТЕ С НАМИ!
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ width: "216px", height: "56px" }}
            href="/login"
          >
            <p
              style={{
                fontSize: "20px",
                fontWeight: "300",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Вход
            </p>
          </Button>
          <Button
            variant="contained"
            sx={{ ml: "24px", mb: "25px", width: "216px", height: "56px" }}
            href="/register"
          >
            <p
              style={{
                fontSize: "20px",
                fontWeight: "300",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Регистрация
            </p>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Hello;
