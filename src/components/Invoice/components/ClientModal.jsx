import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const ClientModal = ({onSave}) =>  {

  const [show, setShow] = useState(false);

  const [clientData, setClientData] = useState({
    name: '',
    lastName: '',
    city: '',
    address: '',
    contact: '',
    email: '',
  });

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleSave = () => {
    onSave(clientData);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Ingresa tus datos!!
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Datos del cliente: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre: </Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre de quien recibe el pedido"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Apellido: </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Apellido de quien recibe el pedido"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ciudad: </Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Ciudad"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Direccion: </Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Dirección completa"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contacto: </Form.Label>
              <Form.Control
                type="tel"
                name="contact"
                placeholder="Número de contacto"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Correo: </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Información 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

