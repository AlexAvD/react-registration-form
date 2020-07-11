import React from "react";
import TextField from "../../components/TextField";
import Form from "../../components/Form";
import Button from "../../components/Button";
import PasswordField from "../../components/PasswordField";
import FormErrorMsg from "../../components/FormErrorMsg";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { validateLoginForm } from "../../helpers/validation";

import {
  setSuccessMsg,
  showSuccessMsg,
  setUserAuthToken,
  setUserNickname,
} from "../../redux/actions";

import "./style.scss";

const Login = ({ setMsg, showMsg, setAuthToken, setNickname }) => {
  const history = useHistory();

  const initialValues = {
    emailOrPhone: "",
    password: "",
  };

  const login = (data) => {
    return fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  let error;

  const onSubmit = (values, actions) => {
    actions.setSubmitting(false);

    login(values)
      .then((res) => res.json())
      .then((data) => {
        const { token, nickname } = data;

        error = "";

        localStorage.setItem("token", token);
        localStorage.setItem("nickname", nickname);

        setMsg("Вы авторизованы");
        showMsg();

        setTimeout(() => {
          setNickname(nickname);
          setAuthToken(token);
        }, 400);
      })
      .catch((err) => {
        error = "Не удалось залогиниться, попробуйте снова";
      })
      .finally(() => {
        actions.setSubmitting(true);
      });
  };

  return (
    <Form
      title="Вход"
      subtitle="Введите свои данные"
      initialValues={initialValues}
      onSubmit={onSubmit}
      className="login-form"
      validate={validateLoginForm}
      footer={() => (
        <p>
          <span className="mr-1">Нет аккаунта?</span>
          <Link to="/signup" className="link">
            Зарегистрироваться
          </Link>
        </p>
      )}
    >
      <TextField name="emailOrPhone" label="Email или номер телефона" />
      <PasswordField name="password" label="Пароль" />
      {error ? <FormErrorMsg msg={error} /> : null}
      <Button
        type="submit"
        className="login-form__submit"
        size="wide"
        variant="solid"
      >
        войти
      </Button>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setMsg: (msg) => dispatch(setSuccessMsg(msg)),
  showMsg: () => dispatch(showSuccessMsg()),
  setAuthToken: (authToken) => dispatch(setUserAuthToken(authToken)),
  setNickname: (nickname) => dispatch(setUserNickname(nickname)),
});

export default connect(null, mapDispatchToProps)(Login);
