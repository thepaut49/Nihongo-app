import React, { useState, useEffect } from "react";
import "./Translation.css";
import ListObject from "./ListObject";
import ListOfParts from "./ListOfParts";
import CustomSelect from "../common/CustomSelect";
import CustomIntegerSelect from "../common/CustomIntegerSelect";
import TranslationArea from "./TranslationArea";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import translationConstants from "../common/translationConstants";
import * as kanjiActions from "../../redux/actions/kanjiActions";
import * as verbActions from "../../redux/actions/verbActions";
import * as naAdjectiveActions from "../../redux/actions/naAdjectiveActions";
import * as iAdjectiveActions from "../../redux/actions/iAdjectiveActions";
import * as nameActions from "../../redux/actions/nameActions";
import * as wordActions from "../../redux/actions/wordActions";
import * as particuleActions from "../../redux/actions/particuleActions";
import * as counterActions from "../../redux/actions/counterActions";
import * as suffixActions from "../../redux/actions/suffixActions";
import * as grammarRuleActions from "../../redux/actions/grammarRuleActions";
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
    const {
      translation,
      counters,
      kanjis,
      iAdjectives,
      naAdjectives,
      names,
      particules,
      suffixs,
      words,
      verbs,
      grammarRules,
      actions,
    } = props;
    if (kanjis.length === 0) actions.loadKanjis();
    if (verbs.length === 0) actions.loadVerbs();
    if (naAdjectives.length === 0) actions.loadNaAdjectives();
    if (iAdjectives.length === 0) actions.loadIAdjectives();
    if (names.length === 0) actions.loadNames();
    if (words.length === 0) actions.loadWords();
    if (particules.length === 0) actions.loadParticules();
    if (counters.length === 0) actions.loadCounters();
    if (suffixs.length === 0) actions.loadSuffixs();
    if (grammarRules.length === 0) actions.loadGrammarRules();
    if (translation.listObjects.length === 0) {
      actions.loadListObjects(translation.typeSelect, translation.quantity);
    }
  }, []);

  const handleListClick = (event, id) => {
    props.actions.updateSentence(
      props.translation.sentence + event.target.innerText
    );
    props.actions.updateNumberOfUse(props.translation.typeSelect, id);
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
    props.actions.extractListOfGrammarRules(_listOfParts, props.grammarRules);
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
    // reacalculer les gramamr rules
    props.actions.extractListOfGrammarRules(newPartsList, props.grammarRules);
  };

  const handleUnknownTransform = (event, part) => {
    event.preventDefault();
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
    // reacalculer les gramamr rules
    props.actions.extractListOfGrammarRules(newPartsList, props.grammarRules);
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
            typeSelect={props.translation.typeSelect}
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
          listOfGrammarRules={props.translation.listOfGrammarRules}
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
  loading: PropTypes.bool,
  actions: PropTypes.object.isRequired,
  grammarRules: PropTypes.array.isRequired,
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
    grammarRules: state.grammarRules,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCounters: bindActionCreators(counterActions.loadCounters, dispatch),
      loadIAdjectives: bindActionCreators(
        iAdjectiveActions.loadIAdjectives,
        dispatch
      ),
      loadKanjis: bindActionCreators(kanjiActions.loadKanjis, dispatch),
      loadNaAdjectives: bindActionCreators(
        naAdjectiveActions.loadNaAdjectives,
        dispatch
      ),
      loadNames: bindActionCreators(nameActions.loadNames, dispatch),
      loadParticules: bindActionCreators(
        particuleActions.loadParticules,
        dispatch
      ),
      loadSuffixs: bindActionCreators(suffixActions.loadSuffixs, dispatch),
      loadVerbs: bindActionCreators(verbActions.loadVerbs, dispatch),
      loadWords: bindActionCreators(wordActions.loadWords, dispatch),
      loadGrammarRules: bindActionCreators(
        grammarRuleActions.loadGrammarRules,
        dispatch
      ),
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
      extractListOfGrammarRules: bindActionCreators(
        translationActions.extractListOfGrammarRules,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Translation);
