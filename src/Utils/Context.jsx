import { createContext, useEffect, useState } from "react";
import axios from "../Utils/Axios";

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setproducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  const getproducts = async () => {
    try {
      const { data } = await axios("/products");
      setproducts(data);
      localStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (products.length === 0) {
      getproducts();
    }
  }, []);

  return (
    <ProductContext.Provider value={[products, setproducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
