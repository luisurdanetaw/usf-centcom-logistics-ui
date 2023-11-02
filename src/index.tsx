import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@mantine/core/styles.css';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import {createTheme, MantineProvider} from '@mantine/core';
import LoginPage from "./components/login-signup-page/LoginPage";
import SignUpPage from "./components/login-signup-page/SignUpPage";
import InventoryPage from "./components/inventory-page/InventoryPage";
import TmrPage from "./components/tmr-page/TmrPage";
import HomePage from "./components/home-page/HomePage";
import SupplySearchPage from "./components/supply-search-page/SupplySearchPage";

const theme = createTheme({
    /** Put your mantine theme override here */
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>,
    },
    {
        path: "/mcb/home",
        element: <HomePage/>,
    },
    {
        path: "/register",
        element: <SignUpPage/>,
    },
    {
        path: "/mcb/trends",
        element: <App/>,
    },
    {
        path: "/mcb/supplies",
        element: <SupplySearchPage props={''}/>,
    },
    {
        path: "/mcb/inventory",
        element: <InventoryPage name={"test"}/>,
    },
    {
        path: "/mcb/tmr",
        element: <TmrPage name={"test"}/>,
    },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <MantineProvider theme={theme}>
          <RouterProvider router={router} />
      </MantineProvider>
  </React.StrictMode>
);
