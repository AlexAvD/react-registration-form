import React, { useState } from "react";
import Field from "../components/Field";
import Button from "../components/Button";

const filedTypes = {
  password: "password",
  text: "text",
};

const withPassword = (wrapped) => {
  return (props) => {
    const [type, setType] = useState("password");
    const onClick = () => {
      const nextType =
        type === filedTypes.password ? filedTypes.text : filedTypes.password;
      setType(nextType);
    };

    return (
      <Field {...props} type={type}>
        <Button onClick={onClick}>change</Button>
      </Field>
    );
  };
};

export default withPassword;
