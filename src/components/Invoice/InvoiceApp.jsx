import { InvoiceView } from "./components/InvoiceView";
import {ClientView} from './components/ClientView';
import {CompanyView} from './components/CompanyView';
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";

export const InvoiceApp = () => {

  const client = {
    name: 'Taylor',
    lastname: 'Swift',
    cellphone: '322456798',
    address: {
      city: 'Envigado', 
      location: 'Calle 46B 98-23'
    }
  }
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
                <ClientView title="Datos del cliente:" client={client} />
              </div>

              <div className="col">
                  <CompanyView title="Datos de la empresa:" company={company}/>
              </div>
            </div>
              <ListItemsView title="Productos de la factura:"/>
              <TotalView total = "total"/>
              <form>
                <input type="text" name=""/>
              </form>
          </div>
        </div>
      </div>
    </>
  );
};
