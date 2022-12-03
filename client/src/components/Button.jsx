import React from "react";

const Button = ({ styles, text, icon }) => {
  return (
    <button
      type="button"
      className={`py-3 px-4 bg-blue-gradient font-poppins font-medium text-[12px] text-primary outline-none ${styles} rounded`}
    >
    <span className="flex justify-center ">
      {React.createElement(icon)}&nbsp;
      {text}
    </span>
    </button>
  );
};

export default Button;
