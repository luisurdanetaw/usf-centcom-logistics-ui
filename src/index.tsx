import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@mantine/core/styles.css';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { MantineProvider, createTheme } from '@mantine/core';
import LoginPage from "./components/login-signup-page/LoginPage";
import SignUpPage from "./components/login-signup-page/SignUpPage";

const theme = createTheme({
    /** Put your mantine theme override here */
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <SignUpPage/>,
    },
    {
        path: "/home",
        element: <App/>,
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
