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
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
