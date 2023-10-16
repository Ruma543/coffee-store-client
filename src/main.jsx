import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddCoffee from './Component/AddCoffee.jsx';
import UpdateCoffee from './Component/UpdateCoffee.jsx';
import Layout from './Layout/Layout.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Login from './Component/Login/Login.jsx';
import Registration from './Component/Registration/Registration.jsx';
import User from './Component/User/User.jsx';
import UpdateUser from './Component/User/UpdateUser.jsx';
import ViewCoffee from './Component/ViewCoffee.jsx';
import ErrorPage from './Component/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <App></App>,
        loader: () =>
          fetch(
            'https://coffee-store-server-bnor88gbc-ruma1.vercel.app/coffee'
          ),
      },
      {
        path: '/addCoffee',
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: '/updateCoffee/:id',
        element: <UpdateCoffee></UpdateCoffee>,
        loader: ({ params }) =>
          fetch(
            `https://coffee-store-server-bnor88gbc-ruma1.vercel.app/coffee/${params.id}`
          ),
      },
      {
        path: '/viewCoffee/:id',
        element: <ViewCoffee></ViewCoffee>,
        loader: ({ params }) =>
          fetch(
            `https://coffee-store-server-bnor88gbc-ruma1.vercel.app/coffee/${params.id}`
          ),
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: 'registration',
        element: <Registration></Registration>,
      },
      {
        path: '/user',
        element: <User></User>,
        loader: () =>
          fetch('https://coffee-store-server-bnor88gbc-ruma1.vercel.app/user'),
      },
      {
        path: '/update/:id',
        element: <UpdateUser></UpdateUser>,
        loader: ({ params }) =>
          fetch(
            `https://coffee-store-server-bnor88gbc-ruma1.vercel.app/user/${params.id}`
          ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
