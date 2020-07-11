import React from "react";
import classnames from "classnames";
import { useField } from "formik";
import "./style.scss";

const TextField = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);
  const id = props.id || props.name;
  const error = meta.touched && meta.error;

  return (
    <div className={classnames("text-field", { "text-field_error": error })}>
      <input
        className="text-field__input"
        placeholder={label}
        id={id}
        type="text"
        {...field}
        {...props}
      />
      <label className="text-field__label" htmlFor={id}>
        {label}
      </label>
      {error ? <span className="text-field__error">{error}</span> : null}
      {children}
    </div>
  );
};

export default TextField;
