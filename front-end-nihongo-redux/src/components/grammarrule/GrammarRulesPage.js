import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../common/spinner/Spinner";
import PropTypes from "prop-types";
import GrammarRuleList from "./GrammarRuleList";
import * as grammarRuleActions from "../../redux/actions/grammarRuleActions";
import { bindActionCreators } from "redux";
import { isConnected } from "../../utils/userUtils";

const GrammarRulesPage = (props) => {
  useEffect(() => {
    const { grammarRules, actions } = props;
    if (grammarRules.length === 0) {
      actions.loadGrammarRules().catch((error) => {
        alert("Loading grammar rules failed" + error);
      });
    }
  }, []);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  const handleDeleteGrammarRule = async (grammarRule) => {
    toast.success("Grammar rule deleted");
    try {
      await props.actions.deleteGrammarRule(grammarRule);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <section className="pageSection">
      <h2>GrammarRules</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          {isConnected() && (
            <Link className="btn btn-primary" to="/grammarRule/create">
              Add Grammar rule
            </Link>
          )}

          <GrammarRuleList
            grammarRules={props.grammarRules}
            deleteGrammarRule={handleDeleteGrammarRule}
          />
        </>
      )}
    </section>
  );
};

GrammarRulesPage.propTypes = {
  grammarRules: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    grammarRules: state.grammarRules.map((grammarRule) => {
      return {
        ...grammarRule,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadGrammarRules: bindActionCreators(
        grammarRuleActions.loadGrammarRules,
        dispatch
      ),
      deleteGrammarRule: bindActionCreators(
        grammarRuleActions.deleteGrammarRule,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GrammarRulesPage);
