import React from "react";
import CustomInput from "../common/CustomInput";
import CustomTextArea from "../common/CustomTextArea";
import CustomInputPronunciation from "../common/CustomInputPronunciation";

import PropTypes from "prop-types";

function CounterForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="modificationForm">
      <CustomInput
        id="kanjis"
        label="Kanjis"
        onChange={props.onChange}
        name="kanjis"
        value={props.counter.kanjis}
        error={props.errors.kanjis}
      />

      <CustomInputPronunciation
        id="pronunciation"
        label="Pronunciation"
        onChange={props.onChange}
        name="pronunciation"
        value={props.counter.pronunciation}
        error={props.errors.pronunciation}
        onMiddlePointClick={props.onMiddlePointClick}
        onTranslateClick={props.onTranslateClick}
      />

      <CustomTextArea
        id="use"
        label="Use"
        name="use"
        cols={70}
        rows={15}
        value={props.counter.use}
        onChange={props.onChange}
        error={props.errors.use}
      />

      <CustomTextArea
        id="summary"
        label="Summary"
        name="summary"
        cols={70}
        rows={5}
        value={props.counter.summary}
        onChange={props.onChange}
        error={props.errors.summary}
      />

      <input type="submit" value="Save" className="btn btn-success" />
    </form>
  );
}

CounterForm.propTypes = {
  counter: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CounterForm;
