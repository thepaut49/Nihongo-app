import React from "react";
import CustomInput from "../common/CustomInput";
import CustomTextArea from "../common/CustomTextArea";
import PropTypes from "prop-types";
import Japanesekeyboard from "../common/japaneseKeyboard/JapaneseKeyboard";

const formStyle = {
  margin: "1em",
  display: "grid",
  gap: "0.5em",
};

function GrammarRuleForm({
  grammarRule,
  onSubmit,
  onChange,
  saving = false,
  errors = {},
}) {
  return (
    <>
      <form onSubmit={onSubmit} style={formStyle}>
        <h2>{grammarRule.id ? "Edit" : "Add"} Grammar rule</h2>
        {errors.onSubmit && (
          <div className="alert-modif alert-danger-modif" role="alert">
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

        <button type="submit" disabled={saving} className="validFormButton">
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
      <Japanesekeyboard />
    </>
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
