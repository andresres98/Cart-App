
export const OrderView = ({title,order}) => {
    return (
      <div>
        <h5>{title}</h5>
          {order ? (
            <ul className="list-unstyled">
              <li className="mb-2">Ciudad: {order.ciudad}</li>
              <li className="mb-2">Dirección: {order.direccionEnvio}</li>
              <li className="mb-2">Fecha de envío: {order.fechaEnvio}</li>
            </ul>
          ) : (
            <p>No se han llenado los datos del pedido...</p>
          )}
        </div>
      );
    };