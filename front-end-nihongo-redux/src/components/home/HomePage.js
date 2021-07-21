import React from "react";
import "./HomePage.css";
import PropTypes from "prop-types";
import * as visitStatActions from "../../redux/actions/visitStatActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function HomePage(props) {
  async function getIpClient() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      debugger;
      const data = await response.json();
      return data.ip;
    } catch (error) {
      alert(error);
    }
  }

  const { actions } = props;
  const dateVisit = new Date().toLocaleDateString();
  const newVisitStat = {
    ip: getIpClient(),
    dateVisit: dateVisit,
  };
  actions.saveVisitStat(newVisitStat);

  return (
    <div className="styleHomePage">
      <h1>Nihongo tools</h1>
      <div className="introductionText">
        <p>This tool will help you to </p>
        <ul>
          <li>translate a little text in Japanese in english word by word.</li>
          <li>search kanjis,names, adjectives, verbs, and others words.</li>
          <li>
            read informations about grammar rules, particles, counters for
            things, and name&apos;s suffix.
          </li>
          <li>find examples of sentences grouped by topic.</li>
        </ul>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveVisitStat: bindActionCreators(
        visitStatActions.saveVisitStat,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
