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

function ParticuleForm({
  particule,
  onSubmit,
  onChange,
  saving = false,
  errors = {},
}) {
  return (
    <form onSubmit={onSubmit} style={formStyle}>
      <h2>{particule.id ? "Edit" : "Add"} Particle</h2>
      {errors.onSubmit && (
        <div className="alert alert-danger" role="alert">
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
        id="function"
        label="Function of the particle"
        name="function"
        cols={70}
        rows={5}
        value={particule.function}
        onChange={onChange}
        error={errors.function}
      />

      <CustomTextArea
        id="howToUse"
        label="How to use the particle"
        name="howToUse"
        cols={70}
        rows={5}
        value={particule.howToUse}
        onChange={onChange}
        error={errors.howToUse}
      />

      <CustomTextArea
        id="examples"
        label="Examples sentence for the particle "
        name="examples"
        cols={70}
        rows={20}
        value={particule.examples}
        onChange={onChange}
        error={errors.examples}
      />

      <button type="submit" disabled={saving} className="btn btn-success">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
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
