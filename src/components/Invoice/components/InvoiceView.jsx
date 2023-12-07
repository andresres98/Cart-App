
export const InvoiceView = ({id, company}) => {
    return (
        <>
            <ul className="list-group">
              <li className="list-group-item">Id: {id}</li>
              <li className="list-group-item">Empresa: {company}</li>
            </ul>
        </>
    )
}

