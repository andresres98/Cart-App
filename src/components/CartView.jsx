import { useEffect, useState } from "react";
import { calculateTotal } from "../services/productsServices";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const CartView = ({handlerDelete, items}) => {

  const [total, setTotal]= useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setTotal(calculateTotal(savedItems));
  }, []);

  useEffect(() =>{
    setTotal(calculateTotal(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    setTotal(calculateTotal(items));
  }, [items]);

  const onDeleteProduct = (id)=>{
    handlerDelete(id);
  }
  
  const onCatalog = () => {
    navigate('/catalog');
  }

  const onCheckout = () => {
    Swal.fire({
      title: "Quieres finalizar la compra?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Finalizar Compra",
      denyButtonText: `Seguir Comprando`,
      cancelButtonText:`Revisar Carrito`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Compra finalizada", "", "success");
        console.log('Productos comprados:', items);
      } else if (result.isDenied) {
        Swal.fire("No se finalizo la compra", "", "info");
        navigate('/catalog');
      }
    });
  }

  return (
    <>
      <h3>Carro de compras</h3>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
              <tr key={item.product.id}>
                <td>{item.product.name}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{item.quantity *item.product.price}</td>
                <td><button 
                className="btn btn-danger"
                onClick={() => onDeleteProduct(item.product.id)}> Eliminar </button></td>
              </tr>
            ))}
          
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">
              Total
            </td>
            <td colSpan="2" className="text-start fw-bold">{total}</td>
          </tr>
        </tfoot>
      </table>
      <div className="d-flex justify-content-between">
        <button className="btn btn-success " onClick={onCatalog}> Seguir comprando </button>
        <button className="btn btn-primary " onClick={onCheckout}> Finalizar Compra </button>
      </div>
      
    </>
  );
}
