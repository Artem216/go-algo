// import { Route, Routes } from "react-router-dom";
// import Test from "./pages/Test.tsx";

// import SignUp from "./components/SignUp.tsx";
// import SignIn from "./components/SignIn.tsx";
// import Main from "./pages/Main.tsx";
// import RequireAuth from "./components/RequireAuth.tsx";
// import Profile from "./pages/Profile.tsx";
// import News from "./pages/News.tsx";
// import Stats from "./pages/Stats.tsx";

import { BrowserRouter, RouterProvider } from "react-router-dom";

import { router } from "./routes";

function App() {
  return (
    <>
      <style>
        {`
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
            `}
      </style>
      <RouterProvider router={router} />
      {/* <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/news" element={<News />} />
        <Route path="/stats" element={<Stats />} />
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes> */}
    </>
  );
}

export default App;
