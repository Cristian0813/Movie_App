import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchSeriesPeliculas from '../searchseriespeliculas/SearchSeriesPeliculas';
import MensajeError from '../mensajedeerror/MensajeError';


const API_KEY = import.meta.env.VITE_API_KEY;

const NavBar = () => {
    const [ResultSearch, setResultSearch] = useState([]);
    const [genres, setGenres] = useState([]);
    const [productionCompanies, setProductionCompanies] = useState([]);
    const [searchError, setSearchError] = useState(false);

    const SearchSerieMovie = async (event) => {
        event.preventDefault();
        const query = event.target.elements.query.value.toLowerCase();
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=es-ES&query=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        setResultSearch(data.results);
    
        if (data.results.length === 0) {
            setSearchError(true);
        } 
        else {
            setSearchError(false);
        }
    };

    const getGenreName = (id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre?.name || "";
    };
    /* const GetProductionName = (id) => {
        const productionCompany = productionCompanies.find((productionCompany) => productionCompany.id === id );
        return productionCompany?.name || "";
    }; */

    useEffect(() => {
        const fetchGenres = async () => {
            const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-ES`;
            const response = await fetch(url);
            const data = await response.json();
            setGenres(data.genres);
        };
        fetchGenres();
        /* const fetchProductionCompanies = async () => {
            const url = `https://api.themoviedb.org/3/company/list?api_key=${API_KEY}&language=es-ES`;
            const response = await fetch(url);
            const data = await response.json();
            setProductionCompanies(data.results);
        }; */
        //fetchProductionCompanies();
    }, []);
    

    return (
        <div>
            {searchError && (
                <div className="container my-4">
                    <MensajeError />
                </div>
            )}
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <a href="/">
                            <img
                                src="./src/assets/movie.svg"
                                alt="Imdb peliculas y series"
                                height="40"
                                className="d-inline-block align-top"
                            />
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 "
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link className="d-flex justify-content-end" href={'/Películas'}>Películas</Nav.Link>
                            <Nav.Link className="d-flex justify-content-end" href={'/Series-de-Televisión'}>Series</Nav.Link>
                        </Nav>
                        <Form className="d-flex justify-content-end" onSubmit={SearchSerieMovie}>
                            <Form.Control
                                type="search"
                                placeholder="Busca por películas o por series ..."
                                style={{ width: '17rem' }}
                                className="me-3 fst-italic"
                                aria-label="Search"
                                name="query"
                            />
                                <Button variant="outline-danger" type="submit">
                                    Búsqueda
                                </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {ResultSearch.length > 0 && (
                <div className="d-flex flex-wrap justify-content-around">
                    {ResultSearch.map((result) => (
                        <SearchSeriesPeliculas 
                            key={result.id}
                            title={result.title || result.name}
                            image={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                            genre={getGenreName(result.genre_ids[0])}
                            releaseDate={result.release_date || result.first_air_date}
                            description={result.overview}
                            // productionCompanies={GetProductionName(result.production_companies[0]?.name, result.production_companies)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NavBar;