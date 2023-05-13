import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

import React from 'react'

const MensajeError = () => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oooppps error!</Alert.Heading>
            <p>
            Lo siento, no se pudo encontrar la película o serie que estás buscando. Por favor, asegúrate de haber escrito correctamente el título y comprueba si hay algún error de ortografía. También es posible que la película o serie no esté disponible en nuestra base de datos en este momento. Por favor, inténtalo de nuevo más tarde o busca otra película o serie.
            </p>
        </Alert>
        );
    }
}

export default MensajeError;