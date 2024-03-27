import Cookies from "js-cookie";
import { useState} from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };
  const isConnect = Cookies.get("token") ? true : false;

  const userId = Cookies.get("token")
    ? jwtDecode(Cookies.get("token")).Id
    : "Error";

  const connectButton = (
    <Link
      to={"/login"}
      className="flex items-center px-6 py-2 border-2 border-main-purple font-semibold text-main-purple rounded hover:bg-main-purple hover:text-white duration-300"
    >
      S&apos;inscrire/Se connecter
    </Link>
  );

  const profileButton = (
    <Link to={"/u/" + JSON.stringify(userId)} className="overflow-hidden">
      <img src="/default_pp.png" className="md:hidden" width={40}></img>
      <p className="hidden md:flex items-center px-6 py-2 border-2 border-main-purple font-semibold text-main-purple rounded hover:bg-main-purple hover:text-white duration-300">
        My Profile
      </p>
    </Link>
  );

  const rightButton = isConnect === true ? profileButton : connectButton;

  return (
    <header className="flex h-20 items-center justify-between px-4 py-3 bg-white shadow-md w-full">
      <Link to={"/"} className="flex items-center">
        <img src="/logoname.png" alt="Logo" className="w-20 mr-2" />
      </Link>
      <form
        onSubmit={handleSearchSubmit}
        className="flex border border-gray-300 rounded-full focus:outline-none focus:ring-1 hover:border-purple-600 focus:border-transparent"
      >
        <input
          type="text"
          placeholder="Chercher un cours..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-2 md:px-6 py-2 rounded-full focus:outline-none "
        />
        <button type="submit" className="pr-2 md:px-6 py-2 text-white">
          <img
            src="/search.svg"
            className="opacity-30 hover:opacity-60"
            width={25}
            height={25}
          />
        </button>
      </form>
      {rightButton}
    </header>
  );
};

export default Header;
