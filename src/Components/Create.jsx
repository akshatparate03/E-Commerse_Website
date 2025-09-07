import { useContext, useState } from "react";
import { ProductContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [image, setimage] = useState("");
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert(
        "Please check again, each and every field must be correct and not be empty."
      );
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    toast.success("Product Added Successfully!");
    navigate("/");
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-5 sm:p-[5%] w-screen min-h-screen"
    >
      <h1 className="mb-5 w-full sm:w-1/2 text-2xl sm:text-3xl text-center sm:text-left">
        Add New Product
      </h1>

      <input
        id="image"
        name="image"
        type="url"
        placeholder="Product Image Link..."
        className="text-base sm:text-lg bg-zinc-100 rounded p-3 w-full sm:w-1/2 mb-3"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />

      <input
        id="title"
        name="title"
        type="text"
        placeholder="Product Title..."
        className="text-base sm:text-lg bg-zinc-100 rounded p-3 w-full sm:w-1/2 mb-3"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />

      {/* Category + Price row */}
      <div className="w-full sm:w-1/2 flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
        <input
          id="category"
          name="category"
          type="text"
          placeholder="Category Of Product..."
          className="text-base sm:text-lg bg-zinc-100 rounded p-3 w-full sm:w-[48%]"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />

        <input
          id="price"
          name="price"
          type="number"
          placeholder="Product Price..."
          className="text-base sm:text-lg bg-zinc-100 rounded p-3 w-full sm:w-[48%]"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>

      <textarea
        id="description"
        name="description"
        placeholder="Product Description..."
        className="text-base sm:text-lg bg-zinc-100 rounded p-3 w-full sm:w-1/2 mb-3"
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        rows="10"
      ></textarea>

      <div className="w-full sm:w-1/2">
        <button
          type="submit"
          className="w-full sm:w-auto py-2 px-5 border rounded border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
