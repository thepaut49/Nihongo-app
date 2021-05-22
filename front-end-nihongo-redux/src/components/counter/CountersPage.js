import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as counterActions from "../../redux/actions/counterActions";
import "./CountersPage.css";
import CounterList from "./CounterList";
import { Redirect } from "react-router-dom";
import CounterCriteriaForm from "./CounterCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";

function CountersPage(props) {
  const [counterCriteria, setCounterCriteria] = useState({
    kanjisCriteria: "",
    pronunciationCriteria: "",
    useCriteria: "",
  });
  const [redirectToAddCounterPage, setRedirectToAddCounterPage] =
    useState(false);

  useEffect(() => {
    const { counters, actions } = props;
    debugger;
    if (counters.length === 0) {
      actions.loadCounters().catch((error) => {
        alert("Loading counters failed" + error);
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
    setCounterCriteria({
      ...counterCriteria,
      [event.target.name]: newValue,
    });
  }

  function handleReset(event) {
    // ne marche pas
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("textarea")).forEach(
      (textarea) => (textarea.value = "")
    );
    setCounterCriteria({
      kanjisCriteria: "",
      pronunciationCriteria: "",
      useCriteria: "",
    });
  }

  function handleClick(event) {
    let input = document.getElementById("pronunciationCriteria");
    input.value = input.value + event.target.innerText;
    setCounterCriteria({
      ...counterCriteria,
      pronunciationCriteria:
        counterCriteria.pronunciationCriteria + event.target.innerText,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const _counter = {
      kanjis: counterCriteria.kanjisCriteria,
      pronunciation: counterCriteria.pronunciationCriteria,
      use: counterCriteria.useCriteria,
    };
    props.actions.filterCounters(_counter);
  }

  const handleDeleteCounter = async (counter) => {
    toast.success("Counter deleted");
    try {
      await this.props.actions.deleteCounter(counter);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      {redirectToAddCounterPage && <Redirect to="/counter/create" />}
      <div className="countersPage">
        <h2>Counters</h2>
        {props.loading ? (
          <Spinner />
        ) : (
          <>
            <CounterCriteriaForm
              counterCriteria={counterCriteria}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onClick={handleClick}
              onReset={handleReset}
            />
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary"
              onClick={() => setRedirectToAddCounterPage(true)}
            >
              Add Counter
            </button>
            <CounterList
              counters={props.counters}
              deleteCounter={handleDeleteCounter}
            />
          </>
        )}
      </div>
    </>
  );
}

CountersPage.propTypes = {
  counters: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    counters: state.counters.map((counter) => {
      return {
        ...counter,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCounters: bindActionCreators(counterActions.loadCounters, dispatch),
      deleteCounter: bindActionCreators(counterActions.deleteCounter, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountersPage);
