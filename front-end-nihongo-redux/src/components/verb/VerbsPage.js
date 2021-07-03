import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as verbActions from "../../redux/actions/verbActions";
import "./VerbsPage.css";
import VerbList from "./VerbList";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import VerbCriteriaForm from "./VerbCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import { isConnected } from "../../utils/userUtils";
import * as verbListActions from "../../redux/actions/verbListActions";

function VerbsPage(props) {
  const [verbCriteria, setVerbCriteria] = useState({
    neutralFormCriteria: "",
    pronunciationCriteria: "",
    meaningCriteria: "",
    groupeCriteria: "",
  });

  useEffect(() => {
    const { verbs, actions } = props;
    if (verbs.length === 0) {
      actions.loadVerbs().catch((error) => {
        alert("Loading iadjectives failed" + error);
      });
    }
  }, []);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  // fonction for criteria form
  function handleChange(event) {
    let newValue = event.target.value;
    if (event.target.name === "pronunciationCriteria") {
      newValue = translateRomajiToKana(newValue);
      let input = document.getElementById("pronunciationCriteria");
      input.value = newValue;
    }
    setVerbCriteria({
      ...verbCriteria,
      [event.target.name]: newValue,
    });
  }

  // reset of search criteria
  function handleReset(event) {
    event.preventDefault();
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      (select) => (select.value = "")
    );
    setVerbCriteria({
      neutralFormCriteria: "",
      pronunciationCriteria: "",
      meaningCriteria: "",
      groupeCriteria: "",
    });
    props.actions.loadVerbs().catch((error) => {
      alert("Loading verbs failed" + error);
    });
  }

  // onclick function near pronunciation criteria
  function handleClick(event) {
    let input = document.getElementById("pronunciationCriteria");
    input.value = input.value + event.target.innerText;
    setVerbCriteria({
      ...verbCriteria,
      pronunciationCriteria:
        verbCriteria.pronunciationCriteria + event.target.innerText,
    });
  }

  // submit function of criteria form
  function handleSubmit(event) {
    event.preventDefault();
    const _verb = {
      neutralForm: verbCriteria.neutralFormCriteria,
      pronunciation: verbCriteria.pronunciationCriteria,
      meaning: verbCriteria.meaningCriteria,
      groupe: verbCriteria.groupeCriteria,
    };
    props.actions.filterVerbs(_verb).catch((error) => {
      alert("Filtering verbs failed" + error);
    });
  }

  const handleDeleteVerb = async (verb) => {
    toast.success("Verb deleted");
    try {
      await props.actions.deleteVerb(verb);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <div className="verbsPage">
      <h2>Verbs</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <VerbCriteriaForm
            verbCriteria={verbCriteria}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleClick}
            onReset={handleReset}
          />
          {isConnected() && (
            <Link className="btn btn-primary" to="/verb/create">
              Add Verb
            </Link>
          )}

          <VerbList verbs={props.verbsList} deleteVerb={handleDeleteVerb} />
        </>
      )}
    </div>
  );
}

VerbsPage.propTypes = {
  verbs: PropTypes.array.isRequired,
  verbsList: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    verbs: state.verbs.map((verb) => {
      return {
        ...verb,
      };
    }),
    verbsList: state.verbsList.map((verb) => {
      return {
        ...verb,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadVerbs: bindActionCreators(verbActions.loadVerbs, dispatch),
      deleteVerb: bindActionCreators(verbActions.deleteVerb, dispatch),
      filterVerbs: bindActionCreators(verbListActions.filterVerbs, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerbsPage);
