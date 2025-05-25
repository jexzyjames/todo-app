import React, { useState, useEffect } from "react";
import bg from "../assets/images/bg-desktop-light.jpg";
import mobilebg from "../assets/images/bg-mobile-light.jpg";
import mobiledarkbg from "../assets/images/bg-mobile-dark.jpg";
import darkbg from "../assets/images/bg-desktop-dark.jpg";
import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
const Header = ({ theme, setTheme }) => {
  return (
    <div className="header  relative mx-auto  ml-auto w-full ">
      {theme === "light" ? (
        <>
          <img className="hidden md:block w-full h-50" src={bg} alt="" />
          <img className="md:hidden w-full h-50 " src={mobilebg} alt="" />
        </>
      ) : (
        <>
          <img className="hidden w-full h-50 md:block" src={darkbg} alt="" />
          <img className="md:hidden w-full h-50" src={mobiledarkbg} alt="" />
        </>
      )}
      <div className="absolute flex justify-between md:justify-center  left-0 right-0 max-w-sm md:max-w-xs mx-auto md:gap-70 items-center md:top-10 w-full  top-10 text-white text-2xl font-extrabold">
        <h1 className="text-3xl tracking-widest ">TODO</h1>
        {theme === "light" ? (
          <img
            src={moon}
            alt="moon"
            className="ml-4 cursor-pointer"
            onClick={() => setTheme("dark")}
          />
        ) : (
          <img
            src={sun}
            alt="sun"
            className="ml-4 cursor-pointer"
            onClick={() => setTheme("light")}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
