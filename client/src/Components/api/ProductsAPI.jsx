import { useEffect, useState } from "react";
import axios from "axios";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        if (!res) {
          console.log("No Products Found");
          return;
        }

        setProducts(res.data.products);
      } catch (err) {
        console.log("products API: ", err.response.data.error);
        // alert(err.response.data.error);
      }
    };
    getProducts();
  }, [callback]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
  };
};

export default ProductsAPI;
