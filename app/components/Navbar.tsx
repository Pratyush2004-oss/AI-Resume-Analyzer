import { Link } from "react-router";
import React from "react";
import { usePuterStore } from "~/lib/puter";
const Navbar: () => React.JSX.Element = () => {
  const { auth } = usePuterStore();
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <p className="text-xl sm:text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
      <div className="flex gap-2 items-center">
      <Link to={"/upload"} className="primary-button w-fit">
        Upload <span className="hidden md:inline">Resume</span>
      </Link>
      <button className="primary-button w-fit" onClick={auth.signOut}>
        <img src="/icons/logout.svg" alt="logout" className="size-5" />
      </button>
      </div>
    </nav>
  );
};

export default Navbar;
