import { useEffect} from "react";
import { AddProductCart, DeleteProductCart, UpdateQuantityProductCart } from "../reducer/itemsActions";
import { useCart } from "../context/CartContext";

export const useItemsCart = () => {
    const {cartItems, addToCart: dispatchAddToCart, deleteFromCart: dispatchDeleteFromCart} = useCart();

    useEffect(() =>{
      return () => {
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
      };
    }, [cartItems]);

    const handlerAddProductCart =(product)=> {

        const hasItem = cartItems.find((i)=> i.product.id === product.id);
        if(hasItem){
            dispatchAddToCart(
              {
                type: UpdateQuantityProductCart,
                payload: product,
              }
            )
        } else {
            dispatchAddToCart(
              {
                type: AddProductCart,
                payload: product,
              }
            ) 
        }    
    }
    const handlerDeleteProductCart = (id) => {
        dispatchDeleteFromCart(
          {
            type: DeleteProductCart,
            payload: id,
          }
        )
    }
    return {
        cartItems, 
        handlerAddProductCart,
        handlerDeleteProductCart
    }
}