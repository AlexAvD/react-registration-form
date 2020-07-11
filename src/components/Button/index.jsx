import React from "react";
import classnames from "classnames";
import "./style.scss";

const Button = ({ variant, children, size, className, ...props }) => {
  return (
    <button
      className={classnames(
        "button",
        {
          [`button_${variant}`]: variant,
          [`button_${size}`]: size,
        },
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
