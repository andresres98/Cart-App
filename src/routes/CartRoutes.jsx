import { Navigate, Route, Routes } from "react-router-dom"
import { CatalogView } from "../components/CatalogView"
import { CartView } from "../components/CartView"
import { InvoiceApp } from "../components/Invoice/InvoiceApp"
import { CartProvider } from "../context/CartContext"


export const CartRoutes = ({handlerAddProductCart, cartItems, handlerDeleteProductCart}) => {
    return (
        <>
          <CartProvider>
            <Routes>
              <Route path="catalog" 
              element={<CatalogView handler={handlerAddProductCart} />} 
              />
              <Route path="cart" element={(

                cartItems?.length <= 0 ?
                <div className="alert alert-warning">
                  No se han agregado todavía Productos!
                </div>
                :
                (
                  <div className="my-4 w-50">
                    <CartView
                      handlerDelete={handlerDeleteProductCart}
                      items={cartItems}
                    />
                  </div>
                )
              )} />
              <Route path="/" element={<Navigate to={'/catalog'}/> } /> 
              <Route path="/invoice" element={<InvoiceApp/> } />
            </Routes>
          </CartProvider>
        </>
    )
}