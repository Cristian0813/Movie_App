import Card from 'react-bootstrap/Card';

function SearchSeriesPeliculas(props) {
    return (
        <Card>
            <Card.Header className="h2">{props.title}</Card.Header>
            <Card.Body className="d-flex" style={{ width: '500px'}}>
                <Card.Img className="align-self-start" variant="top" src={props.image} style={{ width: '200px' }} />
                <div>
                    <Card.Text className='Geners text-start ms-5'>
                        Género: {props.genre}
                    </Card.Text>
                    <Card.Text className='Years text-start  ms-5'>
                        Año de lanzamiento: {props.releaseDate}
                    </Card.Text>
                    <Card.Text className='Description text-start  ms-5'>
                        Descripción: {props.description}
                    </Card.Text>
                    {/* <Card.Text className='productionCompanies text-start  ms-5'>
                        Productores y compañías: {props.productionCompanies}
                    </Card.Text> */}
                </div>
            </Card.Body>
        </Card>
    );
}

export default SearchSeriesPeliculas;
