import React from "react";
import classnames from "classnames";
import { useField, Field } from "formik";
import MaskedInput from "react-text-mask";

import "./style.scss";

const phoneMask = [
  "+7",
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
];

const PhoneField = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);
  const id = props.id || props.name;
  const error = meta.touched && meta.error;

  return (
    <div className={classnames("field", { field_error: error })}>
      <MaskedInput
        mask={phoneMask}
        guide={true}
        className="field__input"
        placeholder={label}
        id={id}
        {...field}
        {...props}
        type="text"
      />

      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {error ? <span className="field__error">{error}</span> : null}
      {children}
    </div>
  );
};

export default PhoneField;
