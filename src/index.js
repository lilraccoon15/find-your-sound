import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import Recommendations from './components/Recommendations';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path:"/",
    element : <App />,
    children : [
      {
        path:"/",
        element: <Homepage />,
      },
      {
        path:"/profile",
        element: <Profile />
      },
      {
        path:"/recommendations",
        element: <Recommendations />
      },
      {
        path:"/login",
        element: <Login />
      }
    ]

  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
