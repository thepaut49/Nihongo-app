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
import { filterKanjis } from "./filterKanjis";

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
  const [kanjisList, setKanjisList] = useState([]);

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
      actions
        .loadKanjis()
        .then(setKanjisList(filterKanjis(kanjis, kanjiCriteria)))
        .catch((error) => {
          alert("Loading kanjis failed" + error);
        });
    } else {
      setKanjisList(filterKanjis(kanjis, kanjiCriteria));
    }
  }, [props.kanjis.length, kanjisList.length]);
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

  function handleReset(event) {
    event.preventDefault();
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
    setKanjisList(filterKanjis(props.kanjis, null));
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

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setKanjisList(filterKanjis(props.kanjis, kanjiCriteria));
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
          <KanjiList kanjis={kanjisList} deleteKanji={handleDeleteKanji} />
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KanjisPage);
