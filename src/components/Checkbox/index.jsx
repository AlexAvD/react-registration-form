import React from "react";
import { useField } from "formik";
import classnames from "classnames";
import "./style.scss";

const Checkbox = ({ label, className, ...props }) => {
  const [field, meta] = useField(props);
  const id = props.id || props.name;

  return (
    <div className={classnames("checkbox", className)}>
      <input
        className="checkbox__input"
        id={id}
        {...field}
        {...props}
        type="checkbox"
      />
      <label className="checkbox__label" htmlFor={id}>
        <span className="checkbox__checkmark"></span>
        {label}
      </label>
      {meta.touched && meta.error ? (
        <span className="checkbox__error">{meta.error}</span>
      ) : null}
    </div>
  );
};

export default Checkbox;
