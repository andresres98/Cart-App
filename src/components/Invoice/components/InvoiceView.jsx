
export const InvoiceView = ({isbn, company}) => {
    return (
        <>
            <ul className="list-group">
              <li className="list-group-item">ISBN: {isbn}</li>
              <li className="list-group-item">Empresa: {company}</li>
            </ul>
        </>
    )
}

