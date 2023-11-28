import { InvoiceView } from "./components/InvoiceView";
import {ClientView} from './components/ClientView';
import {CompanyView} from './components/CompanyView';
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { ClientModal } from "./components/ClientModal";
import { useState } from "react";

export const InvoiceApp = () => {

  const[client, setClient ] = useState(null);

  const company = {
    name: 'Brownies y galletas', 
    fiscalNumber: '123456'
  }

  return (
    <>
      <div className="container">
        <div className="card my-3">
          <div className="card-header">Ejemplo Factura</div>
          <div className="card-body">
            <InvoiceView id={10} name="Ejemplo Factura"/>

            <div className="row my-3">
              <div className="col">
                <ClientView title="Datos del cliente:" client={client}  />
                <ClientModal onSave={(clientData) => setClient(clientData)} />
              </div>

              <div className="col">
                  <CompanyView title="Datos de la empresa:" company={company}/>
              </div>
            </div>
              <ListItemsView title="Productos de la factura:"/>
              <TotalView total = "total"/>
              
              <button type="submit" className="btn btn-danger"> Finalizar Pedido </button>
          </div>
        </div>
      </div>
    </>
  );
};
