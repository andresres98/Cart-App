export const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/products');
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error; 
    }
  };

export const calculateTotal = (items) => {
    return items.reduce(
        (accumulator, item) => accumulator + item.product.price*item.quantity
        , 0);
}