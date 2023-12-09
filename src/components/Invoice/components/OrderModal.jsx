import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import "../../../styles/appestilos.css"; 

export const OrderModal = ({onSave, isGeneratingPDF}) =>  {

  const [show, setShow] = useState(false);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [orderData, setOrderData] = useState({
    ciudad: '',
    direccionEnvio: '',
    fechaEnvio: '',
  });

  const [selectedDate, setSelectedDate] = useState('');

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleSave = () => {
    setIsFormSubmitted(true);
    const validationErrors = validateFields();
    if(Object.values(validationErrors).some((error)=> error !== '')){
      return; 
    }
    onSave(orderData);
    handleClose();
  };

  const handleDateSelection = async () => {
    const { value: selectedDate } = await Swal.fire({
        title: "Selecciona la fecha de entrega",
        input: "date",
        didOpen: () => {
          const today = (new Date()).toISOString();
          Swal.getInput().min = today.split("T")[0];
        }
      });
      if (selectedDate) {
        if (selectedDate) {
            Swal.fire("Fecha de entrega", selectedDate);
            setOrderData((prevData) => ({
              ...prevData,
              fechaEnvio: selectedDate,
            }));
            setSelectedDate(selectedDate); 
          }
      }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    let errors = {
      ciudad: '',
      direccionEnvio: '',
      fechaEnvio: '',
    };

    if (!orderData.ciudad) {
      errors.ciudad = 'Seleccione una ciudad';
    }

    if (!orderData.direccionEnvio.trim()) {
      errors.direccionEnvio = 'La dirección es requerida';
    }

    if (!orderData.fechaEnvio) {
      errors.fechaEnvio = 'Seleccione una fecha de entrega';
    }

    return errors;
  };

  return (
    <>
      <div id="order-modal-button"
      className={`pdf-hidden-button ${isGeneratingPDF ? "pdf-hidden" : ""}`}>
        <Button variant="primary" onClick={handleShow}>
        ¿Dónde y cuándo enviamos tu pedido?
      </Button>
      </div>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Datos del Pedido: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ciudad: </Form.Label>
              <Form.Select
                name="ciudad"
                autoFocus
                onChange={handleChange}
                aria-label="Seleccione la ciudad"
                isInvalid={isFormSubmitted && !!validateFields().ciudad}
                >
                    <option value="" disabled>Seleecione una ciudad</option>
                    <option value="medellin" >Medellín</option>
                    <option value="envigado" >Envigado</option>
                    <option value="bello" >Bello</option>
                    <option value="itagui" >Itagui</option>
                    <option value="sabaneta" >Sabaneta</option>
                </Form.Select> 
                <Form.Control.Feedback type="invalid">
                  {validateFields().ciudad}
              </Form.Control.Feedback>
            </Form.Group>

           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Direccion: </Form.Label>
              <Form.Control
                type="text"
                name="direccionEnvio"
                placeholder="Dirección completa"
                autoFocus
                onChange={handleChange}
                isInvalid={isFormSubmitted && !!validateFields().direccionEnvio}
              />
              <Form.Control.Feedback type="invalid">
                  {validateFields().direccionEnvio}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
    <Form.Group as={Col} controlId="exampleForm.ControlInput1">
      <Form.Label>Fecha de Entrega del Pedido: </Form.Label>
      <p className="mt-2 mb-0 text-success font-weight-bold"> {selectedDate} </p>
    </Form.Group>
  </Row>
  <Row className="mb-3">
    <Form.Group as={Col}>
      <Button variant="danger" onClick={handleDateSelection}>
        Seleccionar Fecha
      </Button>
    </Form.Group>
  </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary"  onClick={handleSave}>
            Guardar Información 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

