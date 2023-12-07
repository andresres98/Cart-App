
export const ClientView = ({title,client}) => {
  return (
    <div>
      <h5>{title}</h5>
        {client ? (
          <ul className="list-unstyled">
            <li className="mb-2">Nombre: {client.nombre}</li>
            <li className="mb-2">Apellido: {client.apellido}</li>
            <li className="mb-2">Contacto: {client.contacto}</li>
            <li className="mb-2">Correo: {client.correo}</li>
          </ul>
        ) : (
          <p>No hay datos de cliente</p>
        )}
      </div>
    );
  };
