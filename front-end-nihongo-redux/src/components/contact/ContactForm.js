import React from "react";
import CustomInput from "../common/CustomInput";
import CustomTextArea from "../common/CustomTextArea";
import PropTypes from "prop-types";

const ContactForm = (
  message,
  onSubmit,
  onChange,
  sending = false,
  errors = {}
) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>For any questions or requests</h2>
      {errors.onSubmit && (
        <div className="alert alert-danger" role="alert">
          {errors.onSubmit}
        </div>
      )}

      <CustomInput
        id="email"
        label="Email"
        onChange={onChange}
        name="email"
        value={message.email}
        error={errors.email}
      />

      <CustomInput
        id="title"
        label="Title"
        onChange={onChange}
        name="title"
        value={message.title}
        error={errors.title}
      />

      <CustomTextArea
        id="content"
        label="Content"
        name="content"
        cols={70}
        rows={15}
        value={message.content}
        onChange={onChange}
        error={errors.content}
      />

      <button type="submit" disabled={sending} className="btn btn-primary">
        {sending ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  message: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  sending: PropTypes.bool,
};

export default ContactForm;
