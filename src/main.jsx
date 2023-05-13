import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PeliculasTv from './views/peliculastv/PeliculasTv.jsx';
import Peliculas from './views/peliculas/Peliculas.jsx';
import Series from './views/series/Series.jsx';
import SearchSeriesPeliculas from './components/searchseriespeliculas/SearchSeriesPeliculas.jsx';



const router = createBrowserRouter([
  {
    path: "/Inicio",
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
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>,
) 