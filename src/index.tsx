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

const theme = createTheme({
    /** Put your mantine theme override here */
});

const router = createBrowserRouter([
    {
        path: "/",
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
