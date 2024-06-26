import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginScreen from "./screens/LoginScreen";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
);