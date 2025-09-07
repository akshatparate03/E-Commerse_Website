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
    <nav className="w-[60%] sm:w-[40%] md:w-[30%] lg:w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-3 sm:pt-5 p-3">
      <a
        className="text-xs sm:text-sm py-2 px-4 sm:px-5 border rounded border-blue-500 text-blue-500 text-center w-full"
        href="/create"
      >
        Add New Product
      </a>

      <hr className="my-3 w-[90%]" />

      {/* Category Filter */}
      <h1 className="text-base sm:text-lg lg:text-2xl font-semibold mb-3 w-full text-center lg:text-left px-2">
        Category Filter
      </h1>

      {/* Categories */}
      <div className="w-full flex flex-col items-start px-2">
        {distict_category.map((c, i) => (
          <Link
            key={i}
            to={`/?category=${c}`}
            className="flex items-center mb-2 text-sm sm:text-base"
          >
            <span
              style={{ backgroundColor: color() }}
              className="rounded-full mr-2 w-[14px] h-[14px]"
            ></span>
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
