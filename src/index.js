import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Trade from './Trade';
import reportWebVitals from './reportWebVitals';
import Main from './Main'
import Announcement from './Announcement';
import Newsletter from './Newsletter';
import Soon from './Soon';
import Launchpad from './Launchpad';
import TradeOffer from './TradeOffer';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "trade",
        element: <Trade />,
      },
      {
        path: "announcement/:slug",
        element: <Announcement />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
      },
      {
        path: "/dao",
        element: <Soon />,
      },
      {
        path: "/launchpad",
        element: <Launchpad />,
      },
      {
        path: "/stake",
        element: <Soon />,
      },
      {
        path: "/createoffer",
        element: <TradeOffer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    fallbackElement={<Main />}
  />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
