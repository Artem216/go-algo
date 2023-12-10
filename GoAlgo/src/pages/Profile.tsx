import { Box, Button, Grid, TextField, Autocomplete } from "@mui/material";
import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import { User } from "../types";
import BuySellBlock from "../components/BuySellBlock";

import { UserApiServiceInstance } from "../app/UserApiService";

import TabPanel from "../components/TabPanel";

import axios from "axios";
import authHeader from "../utils/authHeaders";
import { botSession } from "../components/TabPanel/Sessions";
import { API_URL } from "../config";

export function UserCard() {
  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [pageUser, setPageUser] = useState<User>();

  const [userBotSessions, setUserBotSessions] = useState<botSession[]>([]);
  const [activeStates, setActiveStates] = useState<boolean[]>([]);

  const fetchBotSessions = async () => {
    try {
      const response = await axios.get(
        API_URL + "/api/v1/trader/get_all_user_bots",
        {
          headers: authHeader(),
        }
      );
      console.log(response.data);
      setUserBotSessions(response.data);
      setActiveStates(response.data.map(() => false));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBotSessions();
  }, []);

  const totalBalance = userBotSessions.reduce((total, session) => {
    const balance = parseFloat(session.current_balance);
    return total + balance;
  }, 0);

  useEffect(() => {
    const fetchActivityData = async () => {
      const data = await UserApiServiceInstance.getUserData();
      setPageUser(data);
      setLoading(false);
    };
    fetchActivityData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (pageUser) {
    return (
      <div
        style={{
          marginTop: 3,
          marginLeft: 3,
          marginRight: 4,
          marginBottom: 3,
          width: "1300px",
          background: "#F3F4F6",
          borderRadius: "10px",
        }}
      >
        <div>
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#ffffff14",
              textAlign: "start",
              width: "100%",
              borderRadius: 4,
            }}
          >
            <p
              style={{
                borderBottom: "2px solid #FF0508",
                paddingBottom: "2px",
                fontSize: "30px",
                fontWeight: "200",
                lineHeight: "normal",
                fontFamily: "Roboto, sans-serif",
                color: "black",
              }}
            >
              {pageUser.first_name + " " + pageUser.last_name}
            </p>
            <Grid container>
              <Grid item xs={6} sx={{ minWidth: "150" }}>
                <Box>
                  <p
                    style={{
                      fontSize: "40px",
                      fontWeight: "200",
                      lineHeight: "normal",
                      fontFamily: "Roboto, sans-serif",
                      color: "black",
                    }}
                  >
                    Баланс: {totalBalance} ₽
                  </p>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box></Box>
        </div>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
}

export default function Profile() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          className="profile"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <UserCard />
          <TabPanel />
        </Box>
        <BuySellBlock />
      </div>
    </>
  );
}
