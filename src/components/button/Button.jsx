import { SpinnerIcon } from "components/icons";
import React from "react";

const background = {
  primary: "bg-white text-black",
  secondary: "bg-black text-white",
};
const Button = ({
  children,
  className,
  loading,
  disabled,
  variant = "primary",
  ...rest
}) => {
  return (
    <button
      type="button"
      {...rest}
      disabled={loading || disabled}
      className={[
        "py-2 px-6 rounded-md text-lg font-bold",
        background[variant],
        className,
      ]
        .join(" ")
        .trim()}
    >
      {loading ? (
        <SpinnerIcon className="h-[1.5rem] w-[1.5rem] mx-auto" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
