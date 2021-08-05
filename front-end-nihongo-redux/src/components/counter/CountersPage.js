import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as counterActions from "../../redux/actions/counterActions";
import "./CountersPage.css";
import CounterList from "./CounterList";
import { Link } from "react-router-dom";
import CounterCriteriaForm from "./CounterCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import { isConnected } from "../../utils/userUtils";
import { filterCounters } from "./filterCounters";

function CountersPage(props) {
  const [counterCriteria, setCounterCriteria] = useState({
    kanjisCriteria: "",
    pronunciationCriteria: "",
    useCriteria: "",
  });
  const [countersList, setCountersList] = useState([]);

  useEffect(() => {
    const { counters, actions } = props;
    if (counters.length === 0) {
      actions
        .loadCounters()
        .then(setCountersList(filterCounters(counters, counterCriteria)))
        .catch((error) => {
          alert("Loading counters failed" + error);
        });
    } else {
      setCountersList(filterCounters(counters, counterCriteria));
    }
  }, [props.counters.length, countersList.length]);
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
    event.preventDefault();
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
    setCountersList(filterCounters(props.counters, null));
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
    setCountersList(filterCounters(props.counters, counterCriteria));
  }

  const handleDeleteCounter = async (counter) => {
    toast.success("Counter deleted");
    try {
      await props.actions.deleteCounter(counter);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
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

          {isConnected() && (
            <Link className="btn btn-primary" to="/counter/create">
              Add Kanji
            </Link>
          )}

          <CounterList
            counters={countersList}
            deleteCounter={handleDeleteCounter}
          />
        </>
      )}
    </div>
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
