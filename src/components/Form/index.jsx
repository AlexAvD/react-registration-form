import React from "react";
import { Formik, Form as FormikForm } from "formik";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./style.scss";

const Form = ({ children, title, subtitle, footer, className, ...props }) => {
  return (
    <div className={classnames("form", className)}>
      <div className="form__header">
        <h1 className="form__title">{title}</h1>
        <p className="form__subtitle">{subtitle}</p>
      </div>
      <Formik {...props}>
        <FormikForm autoComplete="off" className="form__body">
          {children}
        </FormikForm>
      </Formik>
      {footer && <div className="form__footer">{footer()}</div>}
    </div>
  );
};

Form.propTypes = {
  footer: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Form;
