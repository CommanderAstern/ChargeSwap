import { useState } from "react";
import { close, logo, menu, profile } from "../assets";
import { navLinks } from "../constants";
import Button from "./Button";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center navbar">
      {/* Logo */}
      <a href="/home">
        <img src={logo} alt="ChargeSwap" className="w-[120px] h-[80px] mt-2" />
      </a>

      {/* List of links */}
      <div>
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins
                font-normal
                cursor-pointer
                text-[16px]
                ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}
                text-white hover:text-teal-200`}
            >
              <a href={`/${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <a href="/home">
        <img
          src={profile}
          alt="Profile"
          className="w-[40px] h-[40px] mt-2 mr-2 rounded-full hidden md:block"
        />
      </a>

      {/* only for mobile devices, created separately */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        {/* shows toggle icon based on its state */}
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          // correct way to change state using the prev
          // version of the same state using a callback function
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${toggle ? "flex" : "hidden"} p-6 bg-black-gradient
        absolute top-20 right-0 mx-4 my-2
        min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            <a href="/home">
              <img
                src={profile}
                alt="Profile"
                className="w-[40px] h-[40px] my-2 rounded-full"
              />
            </a>
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins
                font-normal
                cursor-pointer
                text-[16px]
                ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}
                text-white`}
              >
                <a href={`/${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
