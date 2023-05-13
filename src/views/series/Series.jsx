import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import 'moment/locale/es';
import './Series.css';

const API_KEY = import.meta.env.VITE_API_KEY;

const Series = () => {
    const [SerieTv, setSeries] = useState([]);

    useEffect(() => {
        
        const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-ES&query=`;

        fetch(`${url}Series`)
        .then(response => response.json())
        .then(data => {
            const series = data.results.map(serie => ({
            id: serie.id,
            tipo: serie.media_type,
            titulo: serie.title || serie.name,
            fecha: moment(serie.release_date || serie.first_air_date).format('DD[-]MMMM[-]YYYY'),
            lenguaje: serie.original_language,
            imagen: `https://image.tmdb.org/t/p/w500/${serie.poster_path}`
            }));
            setSeries(series);
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {SerieTv.map(SerieTv => (
            <Col key={SerieTv.id}>
            <Card className="cardHeight">
            <Card.Img className='cardImg' variant="top" src={SerieTv.imagen} />
                <Card.Body>
                <Card.Title className="cardTitle text-start">{SerieTv.titulo}</Card.Title>
                <Card.Text className="cardText">Fecha {SerieTv.fecha}</Card.Text>
                <Card.Text className="cardText">Idioma {SerieTv.lenguaje}</Card.Text>
                <Button variant="primary">Ver más</Button>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    );
}

export default Series;