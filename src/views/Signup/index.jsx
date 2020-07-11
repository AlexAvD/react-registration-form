import React from "react";
import TextField from "../../components/TextField";
import Form from "../../components/Form";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import PasswordField from "../../components/PasswordField";
import FormErrorMsg from "../../components/FormErrorMsg";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setSuccessMsg, showSuccessMsg } from "../../redux/actions";
import "./style.scss";
import axios from "axios";

import { validateSignupForm } from "../../helpers/validation";

const Signup = ({ setSuccessMsg, showSuccessMsg }) => {
  const history = useHistory();
  const initialValues = {
    name: "",
    nickname: "",
    email: "",
    phone: "",
    password: "",
    consent: false,
  };

  const registrate = async (data) => {
    return axios.post("/api/signup", data);
    // return fetch("/api/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  };

  let error;

  const onSubmit = (values, actions) => {
    actions.setSubmitting(false);

    registrate(values)
      .then((res) => {
        if (res.status === 201) {
          error = "";
          setSuccessMsg("Вы зарегистрированы");
          showSuccessMsg();
          history.push("/login");
        }
      })
      .catch((err) => {
        error = "Не удалось зарегистрироваться, попробуйте снова";
      })
      .finally(() => {
        actions.setSubmitting(true);
      });
  };

  return (
    <Form
      title="Регистрация"
      subtitle="Введите свои данные"
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateSignupForm}
      className="signup-form"
      footer={() => (
        <p>
          <span className="mr-1">Есть аккаунт?</span>
          <Link to="/login" className="link">
            Войти
          </Link>
        </p>
      )}
    >
      <TextField name="name" label="Имя" />
      <TextField name="nickname" label="Никнейм" />
      <TextField name="email" label="Email" />
      {/* <PhoneField name="phone" label="Телефон" />  */}
      <TextField name="phone" label="Телефон" />
      <PasswordField name="password" label="Пароль" />
      <Checkbox
        name="consent"
        className="signup-form__checkbox"
        label="Я даю свое согласие на обработку персональных данных"
      />
      {error ? <FormErrorMsg msg={error} /> : null}
      <Button type="submit" size="wide" variant="solid">
        Зарегистрироваться
      </Button>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSuccessMsg: (msg) => dispatch(setSuccessMsg(msg)),
  showSuccessMsg: () => dispatch(showSuccessMsg()),
});

export default connect(null, mapDispatchToProps)(Signup);
