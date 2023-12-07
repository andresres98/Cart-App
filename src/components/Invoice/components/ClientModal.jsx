import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const ClientModal = ({onSave}) =>  {

  const [show, setShow] = useState(false);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [clientData, setClientData] = useState({
    nombre: '',
    apellido: '',
    contacto: '',
    correo: '',
  });

  const [validationError, setValidationError] = useState({
    nombre: '',
    apellido: '',
    contacto: '',
    correo: '',
  });

  const handleClose = () => {
    setShow(false);
    setValidationError({
      nombre: '',
      apellido: '',
      contacto: '',
      correo: '',
    });
  };

  const handleShow = () => setShow(true);

  const handleSave = () => {
    const validationErrors = validateFields();
    setValidationError(validationErrors);
    setIsFormSubmitted(true);

    if(Object.values(validationErrors).some((error)=> error !== '')){
      return; 
    }
    onSave(clientData);
    console.log(clientData);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'contacto') {
      const isValid = isValidContact(value);
      setValidationError((prevErrors) => ({
        ...prevErrors,
        [name]: isValid ? '' : 'Contacto no es válido',
      }));
    }
  };

  const validateFields = () => {
    let errors = {
      nombre: '',
      apellido: '',
      contacto: '',
      correo: '',
    };

    if (!clientData.nombre.trim()) {
      errors.nombre = 'Nombre es requerido';
    }

    if (!clientData.apellido.trim()) {
      errors.apellido = 'Apellido es requerido';
    }

    if (!clientData.contacto.trim()) {
      errors.contacto = 'Contacto es requerido';
    } else if (!isValidContact(clientData.contacto)) {  
      errors.contacto = 'Contacto no es válido';
    }
    
    if (!clientData.correo.trim()) {
      errors.correo = 'Correo es requerido';
    } else if (!isValidEmail(clientData.correo)) {
      errors.correo = 'Correo no es válido';
    }

    return errors;
  };


  const isValidContact = (contact) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
                name="nombre"
                placeholder="Nombre de quien recibe el pedido"
                autoFocus
                onChange={handleChange}
                isInvalid={isFormSubmitted && !!validationError.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {validationError.nombre} 
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Apellido: </Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                placeholder="Apellido de quien recibe el pedido"
                autoFocus
                onChange={handleChange}
                isInvalid={isFormSubmitted && !!validationError.apellido}
              />
              <Form.Control.Feedback type="invalid">
                {validationError.apellido} 
              </Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contacto: </Form.Label>
              <Form.Control
                type="tel"
                name="contacto"
                placeholder="Número de contacto"
                autoFocus
                onChange={handleChange}
                isInvalid={isFormSubmitted && !!validationError.contacto}
              />
              <Form.Control.Feedback type="invalid">
                {validationError.contacto}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Correo: </Form.Label>
              <Form.Control
                type="email"
                name="correo"
                placeholder="name@example.com"
                autoFocus
                onChange={handleChange}
                isInvalid={isFormSubmitted && !!validationError.correo}
              />
              <Form.Control.Feedback type="invalid">
                {validationError.correo}
              </Form.Control.Feedback>
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

