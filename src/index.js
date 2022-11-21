import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Wrap from "./component/wrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/home/home";
import Login from "./component/login/login";
import UserContextProvider from "./context/context";
import SignUp from "./component/sign-up/sign-up";
import Profile from "./component/profile/profile";
import Search from "./component/search/search";
import LocationArticlePage from "./component/profile/location";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path=""
            element={
              <Wrap>
                <Home />
              </Wrap>
            }
          ></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route
            path="profile"
            element={
              <Wrap>
                <Profile />
              </Wrap>
            }
          ></Route>
          <Route
            path="search"
            element={
              <Wrap>
                <Search />
              </Wrap>
            }
          ></Route>
          <Route
            path="location"
            element={
              <Wrap>
                <LocationArticlePage />
              </Wrap>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
