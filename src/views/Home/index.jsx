import React from "react";
import Button from "../../components/Button";
import { connect } from "react-redux";
import "./style.scss";
import { resetUserNickname, resetUserAuthToken } from "../../redux/actions";

const Home = ({ nickname, resetNickname, resetAuthToken }) => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");

    resetAuthToken();
    resetNickname();
  };

  return (
    <div className="home">
      <h1>{nickname}</h1>
      <Button onClick={logout} variant="solid">
        Выйти
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  nickname: state.user.nickname,
});

const mapDispatchToProps = (dispatch) => ({
  resetNickname: () => dispatch(resetUserNickname()),
  resetAuthToken: () => dispatch(resetUserAuthToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
