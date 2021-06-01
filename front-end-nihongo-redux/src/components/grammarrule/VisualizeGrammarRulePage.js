import React, { useState, useEffect } from "react";
import GrammarRule from "./GrammarRule";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import { loadGrammarRules } from "../../redux/actions/grammarRuleActions";

const newGrammarRule = {
  id: 0,
  title: "",
  htmlDescription: "",
  firstKeyWord: "",
  secondKeyWord: "",
  thirdKeyWord: "",
  fourthKeyWord: "",
  version: 0,
};

const VisualizeGrammarRulePage = ({
  grammarRules,
  loadGrammarRules,
  ...props
}) => {
  const [grammarRule, setGrammarRule] = useState({ ...props.grammarRule });

  useEffect(() => {
    if (grammarRules.length === 0) {
      loadGrammarRules().catch((error) => {
        alert("Loading grammar rules failed" + error);
      });
    } else {
      setGrammarRule({ ...props.grammarRule });
    }
  }, [props.grammarRule]);

  return (
    <>
      {grammarRules.length === 0 ? (
        <Spinner />
      ) : (
        <>{grammarRule && <GrammarRule grammarRule={grammarRule} />}</>
      )}
    </>
  );
};

VisualizeGrammarRulePage.propTypes = {
  grammarRule: PropTypes.object.isRequired,
  grammarRules: PropTypes.array.isRequired,
  loadGrammarRules: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getGrammarRuleByTitle(grammarRules, title) {
  return (
    grammarRules.find((grammarRule) => grammarRule.title === title) || null
  );
}

function mapStateToProps(state, ownProps) {
  const title = ownProps.match.params.title;
  const grammarRule =
    title && state.grammarRules.length > 0
      ? getGrammarRuleByTitle(state.grammarRules, title)
      : newGrammarRule;
  return {
    grammarRule,
    grammarRules: state.grammarRules,
  };
}

const mapDispatchToProps = {
  loadGrammarRules,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizeGrammarRulePage);
