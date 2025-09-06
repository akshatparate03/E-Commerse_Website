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
    <div className="w-[70%] flex h-full justify-between items-center m-auto p-[10%]">
      <img
        className="object-contain h-[80%] w-[40%]"
        src={`${product.image}`}
        alt="Bag"
      />
      <div className="content w-[50%]">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-red-800">$ {product.price}</h2>
        <p className="mb-[5%]">{product.description}</p>
        <Link
          to={`/edit/${product.id}`}
          className="mr-5 py-2 px-5 border rounded border-blue-500 text-blue-500"
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
  ) : (
    <Loading />
  );
};

export default Details;
