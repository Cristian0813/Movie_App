import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Peliculas.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import SearchSeriesPeliculas from '../../components/searchseriespeliculas/SearchSeriesPeliculas';

const API_KEY = import.meta.env.VITE_API_KEY;

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  

  const getGenreName = (id) => {
    const genre = genres.find((genre) => genre.id === id);
    return genre?.name || "";
  };
  
const handleShowDetails = (pelicula) => {
    setSelectedMovie(pelicula);
    setShowDetails(true);
  };

  const handleHideDetails = () => {
    setSelectedMovie(null);
    setShowDetails(false);
  };
  
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&query=`;

    const getGenreName = (id) => {
      const genre = genres.find((genre) => genre.id === id);
      return genre?.name || "";
  };

    fetch(`${url}Peliculas`)
      .then(response => response.json())
      .then(data => {
        const peliculas = data.results.map(pelicula => ({
          id: pelicula.id,
          tipo: pelicula.media_type,
          titulo: pelicula.title || pelicula.name,
          fecha: moment(pelicula.release_date || pelicula.first_air_date)
            .format('L'),
          lenguaje: pelicula.original_language,
          imagen: `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`,
          descripcion: pelicula.overview,
          generos: getGenreName(pelicula.genre_ids[0])
        }));
        setPeliculas(peliculas);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {peliculas.map(pelicula => (
          <Col key={pelicula.id}>
            <Card className="cardHeight">
              <Card.Img className='cardImg' variant="top" src={pelicula.imagen} />
              <Card.Body>
                <Card.Title className="cardTitle text-start">{pelicula.titulo}</Card.Title>
                <Card.Text className="cardText">{pelicula.fecha}</Card.Text>
                <Card.Text className="cardText">{pelicula.lenguaje}</Card.Text>
                <Button variant="primary" onClick={() => handleShowDetails(pelicula)}>
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedMovie && (
        <div className="overlay" onClick={handleHideDetails}>
          <SearchSeriesPeliculas
            title={selectedMovie.titulo}
            image={selectedMovie.imagen}
            genre={selectedMovie.generos}
            releaseDate={selectedMovie.fecha}
            description={selectedMovie.descripcion}
          />
        </div>
      )}
    </div>
  );
};

export default Peliculas;
