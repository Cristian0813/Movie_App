import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import 'moment/locale/es';
import './PeliculasTv.css';

const API_KEY = import.meta.env.VITE_API_KEY;

const PeliculasTv = () => {
    const [peliculasTV, setPeliculastv] = useState([]);

    useEffect(() => {

        const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=es-ES&query=`;

        fetch(`${url}Peliculas`)
        .then(response => response.json())
        .then(data => {
            const peliculastv = data.results.map(PeliculaTv => ({
            id: PeliculaTv.id,
            tipo: PeliculaTv.media_type,
            titulo: PeliculaTv.title || PeliculaTv.name,
            fecha: moment(PeliculaTv.release_date || PeliculaTv.first_air_date)
            .locale('es')
            .format('DD[-]MMMM[-]YYYY','es'),
            imagen: `https://image.tmdb.org/t/p/w500/${PeliculaTv.poster_path}`
            }));
            setPeliculastv(peliculastv);
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {/* <Link to={'/photoToday'}> Ver foto del día</Link> */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {peliculasTV.map(peliculatv => (
                    <Col key={peliculatv.id}>
                        <Card className="cardHeight">
                            <Card.Img className='cardImg' variant="top" src={peliculatv.imagen} />
                            <Card.Body>
                                <Card.Title className="cardTitle text-start">{peliculatv.titulo}</Card.Title>
                                <Card.Text className="cardText">{peliculatv.fecha}</Card.Text>
                                <Card.Text className="cardText">{peliculatv.tipo}</Card.Text>
                                <Button variant="primary">Ver más</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default PeliculasTv