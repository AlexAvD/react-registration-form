import React, { useRef } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { hideSuccessMsg } from "../../redux/actions";
import { CSSTransition } from "react-transition-group";

const Success = ({ msg, show, hideMsg }) => {
  const nodeRef = useRef(null);

  if (show) {
    setTimeout(() => {
      hideMsg();
    }, 3000);
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      classNames="success-show"
      timeout={1000}
      unmountOnExit
    >
      <div ref={nodeRef} className="success">
        <div className="success__icon">
          <svg
            width="186"
            height="186"
            viewBox="0 0 186 186"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="success__icon-svg"
          >
            <path
              d="M93 0.25C41.7805 0.25 0.25 41.7805 0.25 93C0.25 144.22 41.7805 185.75 93 185.75C144.22 185.75 185.75 144.22 185.75 93C185.75 41.7805 144.22 0.25 93 0.25ZM133.061 62.7113L89.4598 123.164C88.8504 124.015 88.047 124.708 87.1163 125.186C86.1856 125.664 85.1543 125.914 84.108 125.914C83.0617 125.914 82.0304 125.664 81.0997 125.186C80.169 124.708 79.3656 124.015 78.7563 123.164L52.9395 87.3895C52.1527 86.2922 52.9395 84.7602 54.2852 84.7602H63.9949C66.1066 84.7602 68.1148 85.7746 69.357 87.5137L84.0977 107.968L116.643 62.8355C117.885 61.1172 119.873 60.082 122.005 60.082H131.715C133.061 60.082 133.847 61.6141 133.061 62.7113Z"
              fill="black"
            />
          </svg>
        </div>
        <h2 className="success__msg">{msg}</h2>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  msg: state.successMsg.msg,
  show: state.successMsg.show,
});

const mapDispatchToProps = (dispatch) => ({
  hideMsg: () => dispatch(hideSuccessMsg()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Success);
