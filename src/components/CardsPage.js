import React, { useState } from 'react';
import { Button, Modal, Form, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './CardsPage.css'; // Asegúrate de importar el archivo CSS

const MyButtonWithModal = () => {
  const [show, setShow] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const newCard = {
      images: [image1, image2, image3],
      title,
      description
    };

    if (currentCardIndex !== null) {
      const updatedCards = [...cards];
      updatedCards[currentCardIndex] = newCard;
      setCards(updatedCards);
      setCurrentCardIndex(null);
    } else {
      setCards([...cards, newCard]);
    }

    handleClose();
  };

  const handleEdit = (index) => {
    const card = cards[index];
    setImage1(card.images[0]);
    setImage2(card.images[1]);
    setImage3(card.images[2]);
    setTitle(card.title);
    setDescription(card.description);
    setCurrentCardIndex(index);
    handleShow();
  };

  const handleDelete = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  return (
    <div>
      <div className="button-container">
        <Button variant="primary" className="create-card-button" onClick={handleShow}>
          Crear Tarjeta
        </Button>

        <Link to="/inicio">
          <Button variant="secondary" className="navigate-inicio-button">
            Ir a Inicio
          </Button>
        </Link>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentCardIndex !== null ? 'Editar Tarjeta' : 'Crear Nueva Tarjeta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImage1">
              <Form.Label>Imagen 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el link de la imagen 1"
                value={image1}
                onChange={(e) => setImage1(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formImage2">
              <Form.Label>Imagen 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el link de la imagen 2"
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formImage3">
              <Form.Label>Imagen 3</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el link de la imagen 3"
                value={image3}
                onChange={(e) => setImage3(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="cards-container mt-4">
        {cards.map((card, index) => (
          <Card key={index} className="mb-4 custom-card">
            <Carousel>
              {card.images.map((image, imgIndex) => (
                <Carousel.Item key={imgIndex}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Slide ${imgIndex}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
              <Button variant="warning" onClick={() => handleEdit(index)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(index)}>
                Eliminar
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyButtonWithModal;
