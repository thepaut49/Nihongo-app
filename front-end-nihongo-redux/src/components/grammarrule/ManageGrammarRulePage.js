import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  loadGrammarRules,
  saveGrammarRule,
} from "../../redux/actions/grammarRuleActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import GrammarRuleForm from "./GrammarRuleForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";

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

const ManageGrammarRulePage = ({
  grammarRules,
  loadGrammarRules,
  saveGrammarRule,
  history,
  ...props
}) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [grammarRule, setGrammarRule] = useState({ ...props.grammarRule });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (grammarRules.length === 0) {
      loadGrammarRules().catch((error) => {
        alert("Loading grammar rules failed" + error);
      });
    } else {
      setGrammarRule({ ...props.grammarRule });
    }
  }, [props.grammarRule]);

  function handleChange(event) {
    const { name, value } = event.target;
    setGrammarRule((prevGrammarRule) => ({
      ...prevGrammarRule,
      [name]: value,
    }));
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!grammarRule.title)
      _errors.title = "Title of the grammar rule is required";
    if (!grammarRule.htmlDescription)
      _errors.summary = "Html description of the grammar rule is required";
    if (!grammarRule.firstKeyWord)
      _errors.firstKeyWord = "First keyword of the grammar rule is required";

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSaving(true);
    saveGrammarRule(grammarRule)
      .then(() => {
        toast.success("Grammar rule saved.");
        history.push("/grammarRules");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  return (
    <>
      {grammarRules.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt when={modified} message="Are you sure you want to leave ?" />
          <GrammarRuleForm
            errors={errors}
            grammarRule={grammarRule}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saving={saving}
          />
        </>
      )}
    </>
  );
};

ManageGrammarRulePage.propTypes = {
  grammarRule: PropTypes.object.isRequired,
  grammarRules: PropTypes.array.isRequired,
  loadGrammarRules: PropTypes.func.isRequired,
  saveGrammarRule: PropTypes.func.isRequired,
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
  saveGrammarRule,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageGrammarRulePage);
