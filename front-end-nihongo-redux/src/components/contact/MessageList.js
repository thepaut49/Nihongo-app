import React from "react";
import PropTypes from "prop-types";
import "./Message.css";

function MessageList(props) {
  const messages = props.messages;
  return (
    <div>
      {messages.map((message) => {
        return (
          <div key={message.id} className="messageListStyle">
            <div className="messageEmailStyle">Email : {message.email}</div>

            <div className="messageTitleStyle">Title : {message.title}</div>

            <div className="messageContentStyle">
              <label>Content : </label>
              <br />
              <p>{message.title}</p>
            </div>

            <div className="messageDateCreationStyle">
              <p>Date creation : : {message.dateCreation}</p>
            </div>
            <div>
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  props.deleteMessage(message);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

MessageList.propTypes = {
  deleteMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      dateCreation: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default MessageList;
