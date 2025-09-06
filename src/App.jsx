import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Details from "./Components/Details";
import Create from "./Components/Create";
import Edit from "./Components/Edit";

const App = () => {
  const { search, pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, search]);

  return (
    <div className="h-screen w-screen flex">
      {!loading && (pathname != "/" || search.length > 0) && (
        <Link
          to="/"
          className="px-2 text-red-500 absolute left-[17%] top-[3%] border rounded border-red-500"
        >
          Home
        </Link>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};
export default App;
