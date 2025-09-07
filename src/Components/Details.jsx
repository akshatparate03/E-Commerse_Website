import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../Utils/Context";
import { toast } from "react-toastify";

const Details = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!product) {
      setproduct(products.filter((p) => p.id == id)[0]);
    }
  }, []);

  const ProductDeleteHandler = (id) => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setproducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    toast.success("Product Deleted Successfully!");
    navigate("/");
  };

  return product ? (
    <div className="w-full lg:w-[70%] flex flex-col lg:flex-row items-center lg:justify-between m-auto p-5 sm:p-10 lg:p-[10%] gap-6">
      <img
        className="object-contain w-full sm:w-[70%] lg:w-[40%] max-h-[300px] sm:max-h-[400px] lg:h-[80%]"
        src={product.image}
        alt={product.title}
      />

      <div className="content w-full lg:w-[50%] text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {product.title}
        </h1>
        <h3 className="text-zinc-400 my-3 sm:my-5">{product.category}</h3>
        <h2 className="text-red-800 text-xl sm:text-2xl mb-3">
          $ {product.price}
        </h2>
        <p className="mb-5 text-sm sm:text-base">{product.description}</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center lg:justify-start">
          <Link
            to={`/edit/${product.id}`}
            className="py-2 px-5 border rounded border-blue-500 text-blue-500 text-center"
          >
            Edit
          </Link>
          <button
            onClick={() => ProductDeleteHandler(product.id)}
            className="py-2 px-5 border rounded border-red-500 text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
