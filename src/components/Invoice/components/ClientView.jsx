
export const ClientView = ({title,client}) => {
  return (
    <div>
      <h5>{title}</h5>
        {client ? (
          <ul>
            <li>Nombre: {client.name}</li>
            <li>Apellido: {client.lastName}</li>
            <li>Ciudad: {client.city}</li>
            <li>Dirección: {client.address}</li>
            <li>Contacto: {client.contact}</li>
            <li>Correo: {client.email}</li>
          </ul>
        ) : (
          <p>No hay datos de cliente</p>
        )}
      </div>
    );
  };
