import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { NotificationProvider } from "./context/NotificationContext";
import { CartProvider } from "./context/CartContext";
import { WishProvider } from "./context/WishContext";
import { DrawerProvider } from "./context/DrawerContext";
import AuthProvider from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <CartProvider>
            <DrawerProvider>
              <SearchProvider>
                <WishProvider>
                  <NotificationProvider>
                    <App />
                  </NotificationProvider>
                </WishProvider>
              </SearchProvider>
            </DrawerProvider>
          </CartProvider>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
