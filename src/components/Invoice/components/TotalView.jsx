import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { calculateTotal } from "../../../services/productsServices";

export const TotalView = () => {

    const {cartItems} = useCart();

    const [total, setTotal]= useState(0);
    
    useEffect(() => {
      const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setTotal(calculateTotal(savedItems));
    }, []);
  
    useEffect(() =>{
      setTotal(calculateTotal(cartItems));
    }, [cartItems]);
  
  
    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setTotal(calculateTotal(cartItems));
    }, [cartItems]);
    return (
        <>
            <div className="text-center">
                <span className="badge bg-success fs-6 p-3"> Total: <span> {total} </span> </span>
            </div>
        </>
    )
}