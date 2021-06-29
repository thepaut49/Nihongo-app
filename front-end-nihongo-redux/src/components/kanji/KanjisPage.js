import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as kanjiActions from "../../redux/actions/kanjiActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import "./KanjisPage.css";
import KanjiList from "./KanjiList";
import { Link } from "react-router-dom";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import KanjiCriteriaForm from "./KanjiCriteriaForm";
import { radicals as radicalsList } from "../common/Radicals";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import { isConnected } from "../../utils/userUtils";

function KanjisPage(props) {
  const [kanjiCriteria, setKanjiCriteria] = useState({
    kanjiCriteria: "",
    pronunciationCriteria: "",
    meaningCriteria: "",
    strokeNumberCriteria: null,
    minStrokeNumber: null,
    maxStrokeNumber: null,
    radicalsCriteria: "",
    numberOfUse: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { kanjis, actions } = props;

    if (
      kanjis.length === 0 &&
      !kanjiCriteria.kanjiCriteria &&
      !kanjiCriteria.pronunciationCriteria &&
      !kanjiCriteria.meaningCriteria &&
      !kanjiCriteria.strokeNumberCriteria &&
      !kanjiCriteria.minStrokeNumber &&
      !kanjiCriteria.maxStrokeNumber &&
      !kanjiCriteria.radicalsCriteria
    ) {
      actions.loadKanjis().catch((error) => {
        alert("Loading kanjis failed" + error);
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
    setKanjiCriteria({
      ...kanjiCriteria,
      [event.target.name]: newValue,
    });
  }

  function formIsValid() {
    const _errors = {};
    if (kanjiCriteria.radicalsCriteria.length > 0) {
      for (let i = 0; i < kanjiCriteria.radicalsCriteria.length; i++) {
        if (radicalsList.indexOf(kanjiCriteria.radicalsCriteria[i]) === -1) {
          _errors.radicals = "Some of the characters are not radicals.";
          break;
        }
      }
    }

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    const _kanji = {
      kanji: kanjiCriteria.kanjiCriteria,
      pronunciation: kanjiCriteria.pronunciationCriteria,
      meaning: kanjiCriteria.meaningCriteria,
      strokeNumber: kanjiCriteria.strokeNumberCriteria,
      minStrokeNumber: kanjiCriteria.minStrokeNumber,
      maxStrokeNumber: kanjiCriteria.maxStrokeNumber,
      radicals: kanjiCriteria.radicalsCriteria,
    };
    props.actions.filterKanjis(_kanji).catch((error) => {
      alert("Filtering kanji failed" + error);
    });
  }

  function handleClick(event) {
    event.preventDefault();
    if (kanjiCriteria.radicalsCriteria.indexOf(event.target.innerText) > -1)
      setKanjiCriteria({
        ...kanjiCriteria,
        radicalsCriteria: kanjiCriteria.radicalsCriteria.replace(
          event.target.innerText,
          ""
        ),
      });
    else {
      setKanjiCriteria({
        ...kanjiCriteria,
        radicalsCriteria:
          kanjiCriteria.radicalsCriteria + event.target.innerText,
      });
    }
  }

  function handleReset() {
    // ne marche pas
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setKanjiCriteria({
      kanjiCriteria: "",
      pronunciationCriteria: "",
      meaningCriteria: "",
      strokeNumberCriteria: null,
      minStrokeNumber: null,
      maxStrokeNumber: null,
      radicalsCriteria: "",
      numberOfUse: null,
    });
  }

  const handleDeleteKanji = async (kanji) => {
    toast.success("Kanji deleted");
    try {
      await props.actions.deleteKanji(kanji);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <div className="kanjisPage">
      <h2>Kanjis</h2>
      <KanjiCriteriaForm
        kanjiCriteria={kanjiCriteria}
        errors={errors}
        onChange={handleChange}
        onClick={handleClick}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          {isConnected() && (
            <Link className="btn btn-primary" to="/kanji/create">
              Add Kanji
            </Link>
          )}
          <KanjiList kanjis={props.kanjis} deleteKanji={handleDeleteKanji} />
        </>
      )}
    </div>
  );
}

KanjisPage.propTypes = {
  kanjis: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    kanjis: state.kanjis.map((kanji) => {
      return {
        ...kanji,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadKanjis: bindActionCreators(kanjiActions.loadKanjis, dispatch),
      deleteKanji: bindActionCreators(kanjiActions.deleteKanji, dispatch),
      filterKanjis: bindActionCreators(kanjiActions.filterKanjis, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KanjisPage);
