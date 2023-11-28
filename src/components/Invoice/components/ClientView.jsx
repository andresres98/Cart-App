import PropTypes from 'prop-types';

export const ClientView = ({title, client}) => {

    const { name: nameClient, lastName, address:{city, location}, cellphone } = client;
    return (
        <>
            <h2>{title}</h2>
                <ul className="list-group">
                  <li className="list-group-item active">
                    Información del cliente: {nameClient} {lastName}
                  </li>
                  <li className="list-group-item">
                    Direeción de entrega : {city} / {location}
                  </li>
                  <li className='list-group-item'>
                    Contacto: {cellphone}
                  </li>
                </ul>
        </>
    )
}
ClientView.propTypes = {
  title: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
}