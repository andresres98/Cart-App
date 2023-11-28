import PropTypes from 'prop-types';
export const CompanyView = ({title, company}) => {
    const { name: nameCompany, fiscalNumber } = company;
    return (
        <>
            <h3>{title}</h3>
                <ul className="list-group">
                  <li className="list-group-item active">{nameCompany}</li>
                  <li className="list-group-item">{fiscalNumber}</li>
                </ul>
        </>
    )
}
CompanyView.propTypes = {
    title: PropTypes.string.isRequired,
    company: PropTypes.object.isRequired
}