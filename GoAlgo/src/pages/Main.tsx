import React from "react";

import ResponsiveAppBar from "../components/Navbar";
import Hello from "../components/main/Hello";
import RecSys from "../components/main/RecSys";

function Main() {
  return (
    <div style={{}}>
      <ResponsiveAppBar />
      <Hello />
      <RecSys />
    </div>
  );
}

export default Main;
