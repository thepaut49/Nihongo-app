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

function ParticuleForm({
  particule,
  onSubmit,
  onChange,
  saving = false,
  errors = {},
}) {
  return (
    <>
      <form onSubmit={onSubmit} style={formStyle}>
        <h2>{particule.id ? "Edit" : "Add"} Particle</h2>
        {errors.onSubmit && (
          <div className="alert-modif alert-danger-modif" role="alert">
            {errors.onSubmit}
          </div>
        )}

        <CustomInput
          id="kanjis"
          label="Particle"
          onChange={onChange}
          name="kanjis"
          value={particule.kanjis}
          error={errors.kanjis}
        />

        <CustomInput
          id="summary"
          label="Summary"
          onChange={onChange}
          name="summary"
          value={particule.summary}
          error={errors.summary}
        />

        <CustomTextArea
          id="htmlPage"
          label="Uses of the particle "
          name="htmlPage"
          cols={70}
          rows={50}
          value={particule.htmlPage}
          onChange={onChange}
          error={errors.htmlPage}
        />

        <button type="submit" disabled={saving} className="validFormButton">
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
      <Japanesekeyboard />
    </>
  );
}

ParticuleForm.propTypes = {
  particule: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  saving: PropTypes.bool,
};

export default ParticuleForm;
