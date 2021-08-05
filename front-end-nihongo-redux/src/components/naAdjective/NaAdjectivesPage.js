import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as naAdjectiveActions from "../../redux/actions/naAdjectiveActions";
import "./NaAdjectivesPage.css";
import NaAdjectiveList from "./NaAdjectiveList";
import { Link } from "react-router-dom";
import NaAdjectiveCriteriaForm from "./NaAdjectiveCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import { isConnected } from "../../utils/userUtils";
import { filterNaAdjectives } from "./filterNaAdjectives";

function NaAdjectivesPage(props) {
  const [naAdjectiveCriteria, setNaAdjectiveCriteria] = useState({
    kanjisCriteria: "",
    pronunciationCriteria: "",
    meaningCriteria: "",
  });
  const [naAdjectivesList, setNaAdjectivesList] = useState([]);

  useEffect(() => {
    const { naAdjectives, actions } = props;
    if (naAdjectives.length === 0) {
      actions
        .loadNaAdjectives()
        .then(
          setNaAdjectivesList(
            filterNaAdjectives(naAdjectives, naAdjectiveCriteria)
          )
        )
        .catch((error) => {
          alert("Loading na-adjectives failed" + error);
        });
    } else {
      setNaAdjectivesList(
        filterNaAdjectives(naAdjectives, naAdjectiveCriteria)
      );
    }
  }, [props.naAdjectives.length, naAdjectivesList.length]);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  // fonction for criteria form

  function handleChange(event) {
    let newValue = event.target.value;
    if (event.target.name === "pronunciationCriteria") {
      newValue = translateRomajiToKana(newValue);
      let input = document.getElementById("pronunciationCriteria");
      input.value = newValue;
    }
    setNaAdjectiveCriteria({
      ...naAdjectiveCriteria,
      [event.target.name]: newValue,
    });
  }

  function handleReset(event) {
    event.preventDefault();
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setNaAdjectiveCriteria({
      kanjisCriteria: "",
      pronunciationCriteria: "",
      meaningCriteria: "",
    });
    setNaAdjectivesList(filterNaAdjectives(props.naAdjectives, null));
  }

  function handleClick(event) {
    let input = document.getElementById("pronunciationCriteria");
    input.value = input.value + event.target.innerText;
    setNaAdjectiveCriteria({
      ...naAdjectiveCriteria,
      pronunciationCriteria:
        naAdjectiveCriteria.pronunciationCriteria + event.target.innerText,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNaAdjectivesList(
      filterNaAdjectives(props.naAdjectives, naAdjectiveCriteria)
    );
  }

  const handleDeleteNaAdjective = async (naAdjective) => {
    toast.success("NaAdjective deleted");
    try {
      await props.actions.deleteNaAdjective(naAdjective);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <div className="naAdjectivesPage">
      <h2>Na-Adjectives</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <NaAdjectiveCriteriaForm
            naAdjectiveCriteria={naAdjectiveCriteria}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleClick}
            onReset={handleReset}
          />

          {isConnected() && (
            <Link className="btn btn-primary" to="/naAdjective/create">
              Add NaAdjective
            </Link>
          )}

          <NaAdjectiveList
            naAdjectives={naAdjectivesList}
            deleteNaAdjective={handleDeleteNaAdjective}
          />
        </>
      )}
    </div>
  );
}

NaAdjectivesPage.propTypes = {
  naAdjectives: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    naAdjectives: state.naAdjectives.map((naAdjective) => {
      return {
        ...naAdjective,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadNaAdjectives: bindActionCreators(
        naAdjectiveActions.loadNaAdjectives,
        dispatch
      ),
      deleteNaAdjective: bindActionCreators(
        naAdjectiveActions.deleteNaAdjective,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NaAdjectivesPage);
