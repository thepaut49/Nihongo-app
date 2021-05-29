import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as nameActions from "../../redux/actions/nameActions";
import "./NamesPage.css";
import NameList from "./NameList";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import NameCriteriaForm from "./NameCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";

function NamesPage(props) {
  const [nameCriteria, setNameCriteria] = useState({
    kanjisCriteria: "",
    pronunciationCriteria: "",
    meaningCriteria: "",
  });

  useEffect(() => {
    const { names, actions } = props;
    if (names.length === 0) {
      actions.loadNames().catch((error) => {
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
    setNameCriteria({
      ...nameCriteria,
      [event.target.name]: newValue,
    });
  }

  function handleReset(event) {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setNameCriteria({
      kanjisCriteria: "",
      pronunciationCriteria: "",
      meaningCriteria: "",
    });
  }

  function handleClick(event) {
    let input = document.getElementById("pronunciationCriteria");
    input.value = input.value + event.target.innerText;
    setNameCriteria({
      ...nameCriteria,
      pronunciationCriteria:
        nameCriteria.pronunciationCriteria + event.target.innerText,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const _name = {
      kanjis: nameCriteria.kanjisCriteria,
      pronunciation: nameCriteria.pronunciationCriteria,
      meaning: nameCriteria.meaningCriteria,
    };
    props.actions.filterNames(_name).catch((error) => {
      alert("Filtering iadjective failed" + error);
    });
  }

  const handleDeleteName = async (name) => {
    toast.success("Name deleted");
    try {
      await this.props.actions.deleteName(name);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <div className="namesPage">
      <h2>Names</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <NameCriteriaForm
            nameCriteria={nameCriteria}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleClick}
            onReset={handleReset}
          />
          <Link className="btn btn-primary" to="/name/create">
            Add Name
          </Link>
          <NameList names={props.names} deleteName={handleDeleteName} />
        </>
      )}
    </div>
  );
}

NamesPage.propTypes = {
  names: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    names: state.names.map((name) => {
      return {
        ...name,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadNames: bindActionCreators(nameActions.loadNames, dispatch),
      deleteName: bindActionCreators(nameActions.deleteName, dispatch),
      filterNames: bindActionCreators(nameActions.filterNames, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NamesPage);
