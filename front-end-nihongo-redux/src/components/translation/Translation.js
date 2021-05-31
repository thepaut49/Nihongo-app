import React, { useState, useEffect } from "react";
import "./Translation.css";
import ListObject from "./ListObject";
import ListOfParts from "./ListOfParts";
import CustomSelect from "../common/CustomSelect";
import CustomIntegerSelect from "../common/CustomIntegerSelect";
import TranslationArea from "./TranslationArea";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import translationConstants from "../common/translationConstants";
import { loadKanjis } from "../../redux/actions/kanjiActions";
import { loadVerbs } from "../../redux/actions/verbActions";
import { loadNaAdjectives } from "../../redux/actions/naAdjectiveActions";
import { loadIAdjectives } from "../../redux/actions/iAdjectiveActions";
import { loadNames } from "../../redux/actions/nameActions";
import { loadWords } from "../../redux/actions/wordActions";
import { loadParticules } from "../../redux/actions/particuleActions";
import { loadCounters } from "../../redux/actions/counterActions";
import { loadSuffixs } from "../../redux/actions/suffixActions";
import * as translationActions from "../../redux/actions/translationActions";
import { extractParts, findListOfCandidates } from "./translationUtils";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

const typeSelectListOfValue = [
  translationConstants.TYPE_KANJI,
  translationConstants.TYPE_VERB,
  translationConstants.TYPE_NA_ADJECTIVE,
  translationConstants.TYPE_I_ADJECTIVE,
  translationConstants.TYPE_NAME,
  translationConstants.TYPE_WORD,
];

const quantityListOfValue = translationConstants.quantityListOfValue;

const getListObjectStyle = (typeSelect) => {
  let style = {};
  if (!typeSelect || typeSelect === translationConstants.TYPE_KANJI) {
    style = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,3em)",
      margin: "0.2em",
      gap: "0.2em",
    };
  } else {
    style = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,10em)",
      margin: "0.2em",
      gap: "0.2em",
    };
  }
  return style;
};

const Translation = (props) => {
  // variables locales
  let typeSelectField = document.querySelectorAll("typeSelect");
  typeSelectField.value = props.translation.typeSelect;
  const [listObjectsStyle, setListObjectsStyle] = useState(
    getListObjectStyle(props.translation.typeSelect)
  );

  useEffect(() => {
    if (props.kanjis.length === 0) loadKanjis();
    if (props.verbs.length === 0) loadVerbs();
    if (props.naAdjectives.length === 0) loadNaAdjectives();
    if (props.iAdjectives.length === 0) loadIAdjectives();
    if (props.names.length === 0) loadNames();
    if (props.words.length === 0) loadWords();
    if (props.particules.length === 0) loadParticules();
    if (props.counters.length === 0) loadCounters();
    if (props.suffixs.length === 0) loadSuffixs();
    if (props.translation.listObjects.length === 0) {
      debugger;
      props.actions.loadListObjects(
        props.translation.typeSelect,
        props.translation.quantity
      );
    }
  }, []);

  const handleListClick = (event) => {
    props.actions.updateSentence(
      props.translation.sentence + event.target.innerText
    );
    props.actions.updateNumberOfUse(
      props.translation.typeSelect,
      event.target.id
    );
  };

  const handleSelectChange = (event) => {
    let _typeSelect = "";
    let _quantity = 0;
    if (event.target.name === "typeSelect") {
      props.actions.updateTypeSelect(event.target.value);
      _typeSelect = event.target.value;
      _quantity = props.translation.quantity;
    } else {
      props.actions.updateQuantity(event.target.value);
      _typeSelect = props.translation.typeSelect;
      _quantity = event.target.value;
    }
    setListObjectsStyle(getListObjectStyle(_typeSelect));
    props.actions.loadListObjects(_typeSelect, _quantity);
  };

  const handleTranslateClick = (event) => {
    event.preventDefault();
    props.actions.extractListOfKanji(props.translation.sentence, props.kanjis);
    const _listOfParts = extractParts(
      props.translation.sentence,
      props.verbs,
      props.naAdjectives,
      props.iAdjectives,
      props.names,
      props.words,
      props.particules,
      props.counters,
      props.suffixs
    );
    props.actions.loadParts(_listOfParts);
  };

  const handleClearClick = (event) => {
    event.preventDefault();
    props.actions.clearTranslation();
  };

  const handleQuickSearchClick = (event, result) => {
    if (!result.typeWord) {
      props.actions.updateSentence(props.translation.sentence + result.kanji);
    } else if (result.typeWord === translationConstants.TYPE_VERB) {
      props.actions.updateSentence(
        props.translation.sentence + result.neutralForm
      );
    } else {
      props.actions.updateSentence(props.translation.sentence + result.kanjis);
    }
    props.actions.updateNumberOfUse(props.translation.typeSelect, result.id);
  };

  const handleSentenceChange = (event) => {
    event.preventDefault();
    debugger;
    let newValue = event.target.value;
    newValue = translateRomajiToKana(newValue);
    let textArea = document.getElementById("textToTranslate");
    textArea.value = newValue;
    props.actions.updateSentence(newValue);
  };

  const handleKanaClick = (event) => {
    event.preventDefault();
    let textArea = document.getElementById("textToTranslate");
    textArea.value = textArea.value + event.target.innerHTML;
    props.actions.updateSentence(textArea.value);
  };

  const handleSplitPart = (newList) => {
    let newPartsList = [];
    newList.forEach((part) => {
      if (part.type === translationConstants.TYPE_UNKNOWN) {
        let partWithCandidates = {
          ...part,
          listOfValues: findListOfCandidates(
            part.kanjis,
            part.currentIndex,
            props.verbs,
            props.naAdjectives,
            props.iAdjectives,
            props.names,
            props.words,
            props.particules,
            props.counters,
            props.suffixs
          ),
        };
        newPartsList.push(partWithCandidates);
      } else {
        newPartsList.push(part);
      }
    });
    props.actions.loadParts(newPartsList);
  };

  const handleUnknownTransform = (event, part) => {
    event.preventDefault();
    debugger;
    let indexToTransform = 0;
    for (let i = 0; i < props.translation.listParts.length; i++) {
      if (props.translation.listParts[i] === part) indexToTransform = i;
    }
    let newPartsList = [];
    const partToTransform = props.translation.listParts[indexToTransform];
    const beforePart =
      indexToTransform > 0
        ? props.translation.listParts[indexToTransform - 1]
        : null;
    const afterPart =
      indexToTransform < props.translation.listParts.length - 1
        ? props.translation.listParts[indexToTransform + 1]
        : null;
    const fusionBeforeAndAfterPart =
      beforePart &&
      afterPart &&
      beforePart.type === translationConstants.TYPE_UNKNOWN &&
      afterPart.type === translationConstants.TYPE_UNKNOWN;
    const fusionBeforePart =
      beforePart && beforePart.type === translationConstants.TYPE_UNKNOWN;
    const fusionAfterPart =
      afterPart && afterPart.type === translationConstants.TYPE_UNKNOWN;
    let newFusionPart = {};

    if (fusionBeforeAndAfterPart) {
      newFusionPart = {
        type: translationConstants.TYPE_UNKNOWN,
        kanjis: beforePart.kanjis + partToTransform.kanjis + afterPart.kanjis,
        selectedPronunciation: "?",
        selectedMeaning: "?",
        pronunciations: ["?"],
        meanings: ["?"],
        unknown: true,
        length: beforePart.length + partToTransform.length + afterPart.length,
        currentIndex: beforePart.currentIndex,
        listOfValues: [],
      };
      props.translation.listParts.forEach((item, index) => {
        if (index === indexToTransform - 1) {
          newPartsList.push(newFusionPart);
        } else if (
          index < indexToTransform - 1 ||
          index > indexToTransform + 1
        ) {
          newPartsList.push(item);
        }
      });
    } else if (fusionBeforePart) {
      newFusionPart = {
        type: translationConstants.TYPE_UNKNOWN,
        kanjis: beforePart.kanjis + partToTransform.kanjis,
        selectedPronunciation: "?",
        selectedMeaning: "?",
        pronunciations: ["?"],
        meanings: ["?"],
        unknown: true,
        length: beforePart.length + partToTransform.length,
        currentIndex: beforePart.currentIndex,
        listOfValues: [],
      };
      props.translation.listParts.forEach((item, index) => {
        if (index === indexToTransform - 1) {
          newPartsList.push(newFusionPart);
        } else if (index < indexToTransform - 1 || index > indexToTransform) {
          newPartsList.push(item);
        }
      });
    } else if (fusionAfterPart) {
      newFusionPart = {
        type: translationConstants.TYPE_UNKNOWN,
        kanjis: partToTransform.kanjis + afterPart.kanjis,
        selectedPronunciation: "?",
        selectedMeaning: "?",
        pronunciations: ["?"],
        meanings: ["?"],
        unknown: true,
        length: partToTransform.length + afterPart.length,
        currentIndex: partToTransform.currentIndex,
        listOfValues: [],
      };
      props.translation.listParts.forEach((item, index) => {
        if (index === indexToTransform) {
          newPartsList.push(newFusionPart);
        } else if (index < indexToTransform || index > indexToTransform + 1) {
          newPartsList.push(item);
        }
      });
    } else {
      newFusionPart = {
        type: translationConstants.TYPE_UNKNOWN,
        kanjis: partToTransform.kanjis,
        selectedPronunciation: "?",
        selectedMeaning: "?",
        pronunciations: ["?"],
        meanings: ["?"],
        unknown: true,
        length: partToTransform.length,
        currentIndex: partToTransform.currentIndex,
        listOfValues: [],
      };
      props.translation.listParts.forEach((item, index) => {
        if (index < indexToTransform || index > indexToTransform) {
          newPartsList.push(item);
        } else {
          newPartsList.push(newFusionPart);
        }
      });
    }
    props.actions.loadParts(newPartsList);
  };

  return (
    <>
      <h2>Translation</h2>
      <div id="translation">
        <div id="ListOfObjects">
          <div id="select-group">
            <CustomSelect
              id="typeSelect"
              label="Type"
              onChange={handleSelectChange}
              name="typeSelect"
              value={props.translation.typeSelect}
              listOfValues={typeSelectListOfValue}
            />
            <CustomIntegerSelect
              id="quantity"
              label="Quantity"
              onChange={handleSelectChange}
              name="quantity"
              value={props.translation.quantity}
              listOfValues={quantityListOfValue}
            />
          </div>

          <ListObject
            list={props.translation.listObjects}
            onClick={handleListClick}
            style={listObjectsStyle}
          />
        </div>
        <TranslationArea
          sentence={props.translation.sentence}
          onSentenceChange={handleSentenceChange}
          onTranslateClick={handleTranslateClick}
          onClearClick={handleClearClick}
          onKanaClick={handleKanaClick}
          onQuickSearchClick={handleQuickSearchClick}
        />
        <ListOfParts
          list={props.translation.listParts}
          listOfKanjis={props.translation.listOfKanjis}
          onSplitPart={handleSplitPart}
          onUnknownTransform={handleUnknownTransform}
        />
      </div>
    </>
  );
};

Translation.propTypes = {
  counters: PropTypes.array.isRequired,
  iAdjectives: PropTypes.array.isRequired,
  kanjis: PropTypes.array.isRequired,
  naAdjectives: PropTypes.array.isRequired,
  names: PropTypes.array.isRequired,
  particules: PropTypes.array.isRequired,
  suffixs: PropTypes.array.isRequired,
  verbs: PropTypes.array.isRequired,
  words: PropTypes.array.isRequired,
  translation: PropTypes.object.isRequired,
  loadCounters: PropTypes.func.isRequired,
  loadIAdjectives: PropTypes.func.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  loadNaAdjectives: PropTypes.func.isRequired,
  loadNames: PropTypes.func.isRequired,
  loadParticules: PropTypes.func.isRequired,
  loadSuffixs: PropTypes.func.isRequired,
  loadVerbs: PropTypes.func.isRequired,
  loadWords: PropTypes.func.isRequired,
  extractListOfKanji: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    counters: state.counters,
    iAdjectives: state.iAdjectives,
    kanjis: state.kanjis,
    naAdjectives: state.naAdjectives,
    names: state.names,
    particules: state.particules,
    suffixs: state.suffixs,
    verbs: state.verbs,
    words: state.words,
    translation: state.translation,
    apiCallsInProgress: state.apiCallsInProgress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCounters: bindActionCreators(loadCounters, dispatch),
      loadIAdjectives: bindActionCreators(loadIAdjectives, dispatch),
      loadKanjis: bindActionCreators(loadKanjis, dispatch),
      loadNaAdjectives: bindActionCreators(loadNaAdjectives, dispatch),
      loadNames: bindActionCreators(loadNames, dispatch),
      loadParticules: bindActionCreators(loadParticules, dispatch),
      loadSuffixs: bindActionCreators(loadSuffixs, dispatch),
      loadVerbs: bindActionCreators(loadVerbs, dispatch),
      loadWords: bindActionCreators(loadWords, dispatch),
      updateSentence: bindActionCreators(
        translationActions.updateSentence,
        dispatch
      ),
      updateQuantity: bindActionCreators(
        translationActions.updateQuantity,
        dispatch
      ),
      updateTypeSelect: bindActionCreators(
        translationActions.updateTypeSelect,
        dispatch
      ),
      updateNumberOfUse: bindActionCreators(
        translationActions.updateNumberOfUse,
        dispatch
      ),
      clearTranslation: bindActionCreators(
        translationActions.clearTranslation,
        dispatch
      ),
      loadParts: bindActionCreators(translationActions.loadParts, dispatch),
      extractListOfKanji: bindActionCreators(
        translationActions.extractListOfKanji,
        dispatch
      ),
      loadListObjects: bindActionCreators(
        translationActions.loadListObjects,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Translation);
