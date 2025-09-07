import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import { toast } from "react-toastify";

const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setproduct] = useState({
    title: "",
    image: "",
    price: "",
    category: "",
    description: "",
  });

  const ChangeHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      String(product.price).trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert(
        "Please check again, each and every field must be correct and not be empty."
      );
      return;
    }
    const pi = products.findIndex((p) => p.id == id);

    const copyData = [...products];
    copyData[pi] = { ...products[pi], ...product };

    setproducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    toast.success("Product Edited Successfully!");
    navigate(-1);
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-5 sm:p-[5%] w-full min-h-screen"
    >
      <h1 className="mb-5 w-full sm:w-1/2 text-2xl sm:text-3xl text-center sm:text-left">
        Edit Product
      </h1>

      <input
        type="url"
        placeholder="Product Image Link..."
        className="text-base bg-zinc-100 rounded p-3 w-full sm:w-1/2 mb-3"
        name="image"
        onChange={ChangeHandler}
        value={product && product.image}
      />

      <input
        type="text"
        placeholder="Product Title..."
        className="text-base bg-zinc-100 rounded p-3 w-full sm:w-1/2 mb-3"
        name="title"
        onChange={ChangeHandler}
        value={product && product.title}
      />

      <div className="w-full sm:w-1/2 flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
        <input
          type="text"
          placeholder="Category Of Product..."
          className="text-base bg-zinc-100 rounded p-3 w-full sm:w-[48%] mb-3 sm:mb-0"
          name="category"
          onChange={ChangeHandler}
          value={product && product.category}
        />

        <input
          type="number"
          placeholder="Product Price..."
          className="text-base bg-zinc-100 rounded p-3 w-full sm:w-[48%] mb-3 sm:mb-0"
          name="price"
          onChange={ChangeHandler}
          value={product && product.price}
        />
      </div>

      <textarea
        placeholder="Product Description..."
        className="text-base bg-zinc-100 rounded p-3 w-full sm:w-1/2 mb-3"
        name="description"
        onChange={ChangeHandler}
        value={product && product.description}
        rows="10"
      ></textarea>

      <div className="w-full sm:w-1/2">
        <button className="w-full sm:w-auto py-2 px-5 border rounded border-blue-500 text-blue-500">
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
