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
import Affiliate from './Affiliate';
import BotPage from './BotPage';
import Privacy from './Privacy';
import NotFound from './NotFound';
import CreateOffer from './CreateOffer';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AlertProvider } from './components/Alert';
import { WalletProvider } from './web3/WalletConnect';
import RevokePage from './Revoke';
import OpenBox from './components/OpenBox';


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
        path: "dao",
        element: <Soon />,
      },
      {
        path: "launchpad",
        element: <Soon title = "ABOUT LAUNCHPAD" desc = "Our launchpad system includes an affiliate program where every user is provided with a unique affiliate URL that can be shared with their community. When NFTs are minted from this URL, the affiliate owner earns a percentage of the profit. This system allows users to earn passive income by promoting NFT collections on our platform." />,
      },
      {
        path: "stake",
        element: <Soon />,
      },
      {
        path: "affiliate",
        element: <Soon />,
      },
      {
        path: "bot",
        element: <BotPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "offer/:walletadrs",
        element: <CreateOffer />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "revoke",
        element: <RevokePage />,
      },
      {
        path: "openbox",
        element: <OpenBox />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18n}>
    <WalletProvider>
      <AlertProvider>
        <RouterProvider
          router={router}
          fallbackElement={<Main />}
        />
      </AlertProvider>
    </WalletProvider>
  </I18nextProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
