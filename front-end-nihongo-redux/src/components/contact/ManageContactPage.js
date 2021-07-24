import React, { useState } from "react";
import { connect } from "react-redux";
import { saveMessage } from "../../redux/actions/messageActions";
import PropTypes from "prop-types";
import ContactForm from "./ContactForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";

const newMessage = {
  id: 0,
  email: "",
  title: "",
  content: "",
  dateCreation: "",
  version: 0,
};

const ManageContactPage = ({ saveMessage, history, ...props }) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ ...props.message });
  const [sending, setSending] = useState(false);

  function validateEmail(email) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return true;
    }
    return false;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }));
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!message.title) _errors.title = "The title is required";
    if (!message.email) _errors.email = "The email is required";
    if (message.email && !validateEmail(message.email))
      _errors.email = "The email is incorrect";
    if (!message.content) _errors.content = "The content is required";

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSending(true);
    saveMessage(message)
      .then(() => {
        toast.success("Message sended.");
        history.push("/");
      })
      .catch((error) => {
        setSending(false);
        setErrors({ onSubmit: error.message });
      });
  }

  return (
    <>
      <Prompt when={modified} message="Are you sure you want to leave ?" />
      <ContactForm
        errors={errors}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
        sending={sending}
      />
    </>
  );
};

ManageContactPage.propTypes = {
  message: PropTypes.object.isRequired,
  saveMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps() {
  const message = newMessage;
  return {
    message,
  };
}

const mapDispatchToProps = {
  saveMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageContactPage);
