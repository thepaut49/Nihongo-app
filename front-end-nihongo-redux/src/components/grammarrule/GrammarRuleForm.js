import React from "react";
import CustomInput from "../common/CustomInput";
import CustomTextArea from "../common/CustomTextArea";
import PropTypes from "prop-types";

const formStyle = {
  backgroundColor: "#4682B4",
  margin: "1em",
  padding: "0.5em",
  borderRadius: "10px",
};

function GrammarRuleForm({
  grammarRule,
  onSubmit,
  onChange,
  saving = false,
  errors = {},
}) {
  return (
    <form onSubmit={onSubmit} style={formStyle}>
      <h2>{grammarRule.id ? "Edit" : "Add"} Grammar rule</h2>
      {errors.onSubmit && (
        <div className="alert alert-danger" role="alert">
          {errors.onSubmit}
        </div>
      )}
      <CustomInput
        id="title"
        label="Title"
        onChange={onChange}
        name="title"
        value={grammarRule.title}
        error={errors.title}
      />

      <CustomTextArea
        id="htmlDescription"
        label="Html description"
        name="htmlDescription"
        cols={70}
        rows={15}
        value={grammarRule.htmlDescription}
        onChange={onChange}
        error={errors.htmlDescription}
      />

      <CustomInput
        id="firstKeyWord"
        label="First keyword"
        onChange={onChange}
        name="firstKeyWord"
        value={grammarRule.firstKeyWord}
        error={errors.firstKeyWord}
      />

      <CustomInput
        id="secondKeyWord"
        label="Second keyword"
        onChange={onChange}
        name="secondKeyWord"
        value={grammarRule.secondKeyWord}
        error={errors.secondKeyWord}
      />

      <CustomInput
        id="thirdKeyWord"
        label="Third keyword"
        onChange={onChange}
        name="thirdKeyWord"
        value={grammarRule.thirdKeyWord}
        error={errors.thirdKeyWord}
      />

      <CustomInput
        id="FourthKeyWord"
        label="Fourth keyword"
        onChange={onChange}
        name="FourthKeyWord"
        value={grammarRule.FourthKeyWord}
        error={errors.FourthKeyWord}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

GrammarRuleForm.propTypes = {
  grammarRule: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  saving: PropTypes.bool,
};

export default GrammarRuleForm;
