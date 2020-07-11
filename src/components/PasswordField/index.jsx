import React, { useState } from "react";
import TextField from "../TextField";
import Button from "../Button";
import Icon from "../Icon";
import classnames from "classnames";
import "./style.scss";

const filedTypes = {
  password: "password",
  text: "text",
};

const PasswordField = (props) => {
  const [type, setType] = useState("password");

  const toggleType = (e) => {
    const nextType =
      type === filedTypes.password ? filedTypes.text : filedTypes.password;
    setType(nextType);
  };

  const buttonClass = classnames(`show-password`, {
    button_disabled: type === filedTypes.password,
  });

  return (
    <TextField {...props} type={type}>
      <Button className={buttonClass} variant="icon" onClick={toggleType}>
        <Icon type="eye" />
      </Button>
    </TextField>
  );
};

export default PasswordField;
