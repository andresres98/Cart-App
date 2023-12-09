import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../../src/styles/appestilos.css";

export const ProductCardView = ({id, name, description, price}) => {

  const navigate = useNavigate();

  const {addToCart} = useCart();

  const onAddProduct = (product) => {
    console.log(product);
    addToCart(product);
    navigate('/cart');
  };

  return (
    <>
        <div className="card custom-card">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">{price}</p>
                <button className="btn btn-link" 
                  onClick={()=> onAddProduct({id, name, description, price})}>Agregar 
                </button>
             </div>                    
        </div>
    </>
  )
}
