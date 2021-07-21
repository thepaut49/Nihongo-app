import React, { useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../common/spinner/Spinner";
import PropTypes from "prop-types";
import MessageList from "./MessageList";
import * as messageActions from "../../redux/actions/messageActions";
import { bindActionCreators } from "redux";
import { isConnected } from "../../utils/userUtils";

const MessagesPage = (props) => {
  useEffect(() => {
    const { messages, actions } = props;
    if (messages.length === 0) {
      actions.loadMessages().catch((error) => {
        alert("Loading messages failed" + error);
      });
    }
  }, []);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  const handleDeleteMessage = async (message) => {
    toast.success("Message deleted");
    try {
      await props.actions.deleteMessage(message);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      <h2>Messages</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          {isConnected() && (
            <MessageList
              messages={props.messages}
              deleteMessage={handleDeleteMessage}
            />
          )}
        </>
      )}
    </>
  );
};

MessagesPage.propTypes = {
  messages: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    messages: state.messages.map((message) => {
      return {
        ...message,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadMessages: bindActionCreators(messageActions.loadMessages, dispatch),
      deleteMessage: bindActionCreators(messageActions.deleteMessage, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
