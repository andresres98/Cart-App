import { useCart } from "../../../context/CartContext";
import PropTypes from 'prop-types';

export const ListItemsView = ({title}) => {
  
  const {cartItems} = useCart();
  
    return (
        <>
            <h4>{title}</h4>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total producto</th>
                </tr>
              </thead>
              <tbody>
              {cartItems.map(item => (
              <tr key={item.product.id}>
                <td>{item.product.name}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{item.quantity *item.product.price}</td>
              </tr>
            ))}
              </tbody>
            </table>
        </>
    )
}
ListItemsView.propTypes = {
    title: PropTypes.string.isRequired,
}