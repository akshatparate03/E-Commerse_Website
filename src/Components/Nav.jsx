import { useContext } from "react";
import { ProductContext } from "../Utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);
  let distict_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distict_category = [...new Set(distict_category)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()},0.4)`;
  };

  return (
    <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
      <a
        className="py-2 px-5 border rounded border-blue-500 text-blue-500"
        href="/create"
      >
        Add New Product
      </a>
      <hr className="my-3 w-[80%]" />
      <h1 className="text-2xl mb-3 w-[80%]">Category Filter</h1>
      <div className="w-[80%]">
        {distict_category.map((c, i) => (
          <Link
            key={i}
            to={`/?category=${c}`}
            className="flex items-center mb-3"
          >
            <span
              style={{ backgroundColor: color() }}
              className="rounded-full mr-2 w-[15px] h-[15px]"
            ></span>{" "}
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
