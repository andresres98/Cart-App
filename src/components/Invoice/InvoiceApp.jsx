import { InvoiceView } from "./components/InvoiceView";
import {ClientView} from './components/ClientView';
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { ClientModal } from "./components/ClientModal";
import { useEffect, useState } from "react";
import { OrderModal } from "./components/OrderModal";
import { OrderView } from "./components/OrderView";
import { useCart } from "../../context/CartContext";
import { calculateTotal } from "../../services/productsServices";
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from "sweetalert2";
import "../../../src/styles/appestilos.css"

export const InvoiceApp = () => {
  
  const[client, setClient] = useState(null);

  const [order, setOrder] = useState(null);

  const {cartItems} = useCart(); 

  const [total, setTotal]= useState(0);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    
    useEffect(() => {
      const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setTotal(calculateTotal(savedItems));
    }, []);
  
    useEffect(() =>{
      setTotal(calculateTotal(cartItems));
    }, [cartItems]);
  
  
    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setTotal(calculateTotal(cartItems));
    }, [cartItems]);

    useEffect(() => {
      const button = document.getElementById('boton-finalizar-pedido');
      if (button) {
        button.addEventListener('click', finalizarPedido);
      }
  
      return () => {
        if (button) {
          button.removeEventListener('click', finalizarPedido);
        }
      };
    }, []); 


    const finalizarPedido = () => {
      
      Swal.fire({
        title: '¿Quieres finalizar el pedido?',
        text: 'Una vez finalizado, no podrás realizar cambios.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, finalizar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire('¡Pedido finalizado!', '', 'success');
          generateAndDownloadPDF(); 
        } else {
          Swal.fire('Pedido cancelado.', '', 'info');
        }
      });
    };


  const handelFinishOrder = async() => {

    const currentDate = new Date();
    console.log(currentDate);
    const formattedDate = currentDate.toISOString().split('T')[0];
    try {
      console.log(client);
      const response = await axios.post('http://localhost:8080/api/cliente', client, {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const clienteCreado = response.data;

      const orderWithClientId = {
        ...order,
        idCliente: clienteCreado.id,
        fechaPedido: formattedDate,
      };
      console.log(orderWithClientId);
      /* await axios.post('http://localhost:8080/api/pedido',orderWithClientId, {
        headers: {
          'Content-Type': 'application/json',
        }
      }); */

      console.log('Datos enviados con éxito');
  } catch (error) {
      console.error('Error al enviar los datos', error);
  }
  }


  const generateAndDownloadPDF = async () => {
    const content = document.getElementById('invoice-content');
    const buttonsToHide = document.querySelectorAll('#boton-finalizar-pedido, #client-modal-button, #order-modal-button');
    console.log(buttonsToHide); 
  
    try {
      setIsGeneratingPDF(true);
  
      for (let i = 0; i < buttonsToHide.length; i++) {
        buttonsToHide[i].style.display = 'none';
      }
  
      const htmlContent = content.innerHTML;
      const canvas = await html2canvas(content);
  
      const pdf = new jsPDF({
        format: 'a4',
        orientation: 'portrait',
        unit: 'mm',
        compressPdf: true,
      });
  
      pdf.text(htmlContent, 10, 10);
  
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        40,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight() - 40,
        '',
        'FAST'
      );
  
      pdf.save('factura.pdf');
    } catch (error) {
      console.error('Error al generar el PDF', error);
    } finally {
      setIsGeneratingPDF(false);
  
      for (let i = 0; i < buttonsToHide.length; i++) {
        buttonsToHide[i].style.display = 'block';
      }
    }
  };


  return (
    
    <>
    
      <div className={`container ${isGeneratingPDF ? 'generating-pdf' : ''}`} id="invoice-content">
        <div className="card my-3">
          <div className="card-header"><h2 className="fst-italic">Factura</h2></div>
          <div className="card-body" >
            <InvoiceView isbn="65422986" company="Brownies y Galletas"/>

            <div className="row my-3">
              <div className="col">

                <ClientView title="Datos del cliente:" client={client}  />
                <ClientModal onSave={(clientData) => setClient(clientData)} isGeneratingPDF={isGeneratingPDF}/>

              </div>
              <div className="col">
                <OrderView title="Datos del pedido:" order={order}/>
                <OrderModal onSave={(orderData) => setOrder(orderData)} isGeneratingPDF={isGeneratingPDF}/>
              </div>
            </div>
              <ListItemsView title="Productos de la factura:"/>
              <TotalView total = "total"/>
              <button type="submit" className={`btn btn-danger ${isGeneratingPDF ? 'pdf-hidden' : ''}`} id="boton-finalizar-pedido" onClick={handelFinishOrder}> Finalizar Pedido </button>
          </div>
        </div>
      </div>
    </>
  );
};
