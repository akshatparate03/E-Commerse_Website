import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Utils/Context";
import Loading from "./Loading";
import axios from "../Utils/Axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setfilteredProducts] = useState(null);

  const getproductscategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filteredProducts || category === "undefined") {
      setfilteredProducts(products);
    }
    if (category !== "undefined") {
      // getproductscategory();
      setfilteredProducts(products.filter((p) => p.category === category));
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="w-[95%] mx-auto p-5 lg:pt-[5%] pt-[18%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 overflow-x-hidden overflow-y-auto min-h-screen">
        {filteredProducts &&
          filteredProducts.map((p) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`}
              className="card p-3 border shadow rounded flex flex-col justify-between items-center h-[300px] bg-white"
            >
              <div
                className="hover:scale-110 transition-transform duration-300 mb-3 w-full h-[200px] sm:h-[180px] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>

              <h1 className="text-center text-sm sm:text-base hover:text-blue-500 mt-2 break-words line-clamp-2">
                {p.title}
              </h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
