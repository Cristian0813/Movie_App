import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PeliculasTv from './views/peliculastv/PeliculasTv.jsx';
import Peliculas from './views/peliculas/Peliculas.jsx';
import Series from './views/series/Series.jsx';
import SearchSeriesPeliculas from './components/searchseriespeliculas/SearchSeriesPeliculas.jsx';
import NavBar from './components/navbar/Navbar.jsx';



const router = createBrowserRouter([
  
  {
    path: "/",
    element: <PeliculasTv />
  },
  {
    path: "/Películas",
    element: <Peliculas />,
  },
  {
    path:"/Series-de-Televisión",
    element: <Series />
  },
  {
    path:"/Información",
    element: <SearchSeriesPeliculas />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
) 