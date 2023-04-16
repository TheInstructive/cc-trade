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
import Affiliate from './Affiliate';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';


const router = createBrowserRouter([
  {
    element: <Soon />,
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
        path: "dao",
        element: <Soon />,
      },
      {
        path: "launchpad",
        element: <Launchpad />,
      },
      {
        path: "stake",
        element: <Soon />,
      },
      {
        path: "createoffer",
        element: <TradeOffer />,
      },
      {
        path: "affiliate",
        element: <Affiliate />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18n}>
    <RouterProvider
      router={router}
      fallbackElement={<Main />}
    />
  </I18nextProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
