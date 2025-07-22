import { Link } from "react-router";
import React from "react";
import { usePuterStore } from "~/lib/puter";
const Navbar: () => React.JSX.Element = () => {
  const { auth } = usePuterStore();
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
      <div className="flex gap-4 items-center">
      <Link to={"/upload"} className="primary-button w-fit">
        Upload Resume
      </Link>
      <button className="primary-button w-fit" onClick={auth.signOut}>
        <p>Log Out</p>
      </button>
      </div>
    </nav>
  );
};

export default Navbar;
