import React from "react";
import PropTypes from "prop-types";

class ButtonScrollToTop extends React.Component {
  constructor() {
    super();

    this.state = {
      intervalId: 0,
    };
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    );
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <button
        title="Back to top"
        className="scroll"
        onClick={() => {
          this.scrollToTop();
        }}
      >
        <span className="arrow-up">Top</span>
      </button>
    );
  }
}

ButtonScrollToTop.propTypes = {
  scrollStepInPx: PropTypes.number,
  delayInMs: PropTypes.number.isRequired,
};

export default ButtonScrollToTop;
