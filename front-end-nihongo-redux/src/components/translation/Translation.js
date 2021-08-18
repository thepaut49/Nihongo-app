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
  translationConstants.TYPE_ALL,
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
  const [sentence, setSentence] = useState(
    sessionStorage.getItem("sentence") ? sessionStorage.getItem("sentence") : ""
  );
  const [quantity, setQuantity] = useState(
    sessionStorage.getItem("quantity") ? sessionStorage.getItem("quantity") : 50
  );
  const [typeSelect, setTypeSelect] = useState(
    sessionStorage.getItem("typeSelect")
      ? sessionStorage.getItem("typeSelect")
      : translationConstants.DEFAULT_TYPE
  );
  const [listObjects, setListObjects] = useState(
    sessionStorage.getItem("listObjects")
      ? JSON.parse(sessionStorage.getItem("listObjects"))
      : []
  );
  const [listParts, setListParts] = useState(
    sessionStorage.getItem("listParts")
      ? JSON.parse(sessionStorage.getItem("listParts"))
      : []
  );
  const [listOfKanjis, setListOfKanjis] = useState(
    sessionStorage.getItem("listOfKanjis")
      ? JSON.parse(sessionStorage.getItem("listOfKanjis"))
      : []
  );
  const [listOfGrammarRules, setListOfGrammarRules] = useState(
    sessionStorage.getItem("listOfGrammarRules")
      ? JSON.parse(sessionStorage.getItem("listOfGrammarRules"))
      : []
  );

  let typeSelectField = document.querySelectorAll("typeSelect");
  typeSelectField.value = typeSelect;
  const [listObjectsStyle, setListObjectsStyle] = useState(
    getListObjectStyle(typeSelect)
  );

  const doLoadObjects = (
    typeSelect,
    kanjis,
    iAdjectives,
    naAdjectives,
    names,
    words,
    verbs
  ) => {
    switch (typeSelect) {
      case translationConstants.TYPE_KANJI:
        return kanjis.length !== 0;
      case translationConstants.TYPE_I_ADJECTIVE:
        return iAdjectives.length !== 0;
      case translationConstants.TYPE_NA_ADJECTIVE:
        return naAdjectives.length !== 0;
      case translationConstants.TYPE_NAME:
        return names.length !== 0;
      case translationConstants.TYPE_WORD:
        return words.length !== 0;
      case translationConstants.TYPE_VERB:
        return verbs.length !== 0;
      default:
        return (
          kanjis.length !== 0 &&
          verbs.length !== 0 &&
          naAdjectives.length !== 0 &&
          iAdjectives.length !== 0 &&
          names.length !== 0 &&
          words.length !== 0
        );
    }
  };

  useEffect(() => {
    const {
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

    if (
      doLoadObjects(
        typeSelect,
        kanjis,
        iAdjectives,
        naAdjectives,
        names,
        words,
        verbs
      )
    ) {
      translationActions.loadListOfObjects(
        typeSelect,
        quantity,
        kanjis,
        iAdjectives,
        naAdjectives,
        names,
        words,
        verbs,
        setListObjects
      );
    }
  }, [
    typeSelect,
    quantity,
    props.kanjis.length,
    props.iAdjectives.length,
    props.naAdjectives.length,
    props.names.length,
    props.words.length,
    props.verbs.length,
  ]);

  const handleListClick = (event, id) => {
    translationActions.updateSentence(
      sentence + event.target.innerText,
      setSentence
    );
    translationActions.updateNumberOfUse(typeSelect, id);
  };

  const handleSelectChange = (event) => {
    let _typeSelect = "";
    let _quantity = 0;
    if (event.target.name === "typeSelect") {
      translationActions.updateTypeSelect(event.target.value, setTypeSelect);
      _typeSelect = event.target.value;
      _quantity = quantity;
    } else {
      translationActions.updateQuantity(event.target.value, setQuantity);
      _typeSelect = typeSelect;
      _quantity = event.target.value;
    }
    setListObjectsStyle(getListObjectStyle(_typeSelect));
    translationActions.loadListOfObjects(
      _typeSelect,
      _quantity,
      props.kanjis,
      props.iAdjectives,
      props.naAdjectives,
      props.names,
      props.words,
      props.verbs,
      setListObjects
    );
  };

  const handleTranslateClick = (event) => {
    event.preventDefault();
    translationActions.extractListOfKanji(
      sentence,
      props.kanjis,
      setListOfKanjis
    );
    const _listOfParts = extractParts(
      sentence,
      props.verbs,
      props.naAdjectives,
      props.iAdjectives,
      props.names,
      props.words,
      props.particules,
      props.counters,
      props.suffixs
    );
    translationActions.loadParts(_listOfParts, setListParts);
    translationActions.extractListOfGrammarRules(
      _listOfParts,
      props.grammarRules,
      setListOfGrammarRules
    );
  };

  const handleClearClick = (event) => {
    event.preventDefault();
    translationActions.clearTranslation(setListOfKanjis, setListParts);
  };

  const handleQuickSearchClick = (event, result) => {
    if (!result.typeWord) {
      translationActions.updateSentence(sentence + result.kanji, setSentence);
    } else if (result.typeWord === translationConstants.TYPE_VERB) {
      translationActions.updateSentence(
        sentence + result.neutralForm,
        setSentence
      );
    } else {
      translationActions.updateSentence(sentence + result.kanjis, setSentence);
    }
    translationActions.updateNumberOfUse(typeSelect, result.id);
  };

  const handleSentenceChange = (event) => {
    event.preventDefault();
    let newValue = event.target.value;
    newValue = translateRomajiToKana(newValue);
    let textArea = document.getElementById("textToTranslate");
    textArea.value = newValue;
    translationActions.updateSentence(newValue, setSentence);
  };

  const handleKanaClick = (event) => {
    event.preventDefault();
    let textArea = document.getElementById("textToTranslate");
    textArea.value = textArea.value + event.target.innerHTML;
    translationActions.updateSentence(textArea.value, setSentence);
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
    translationActions.loadParts(newPartsList, setListParts);
    // reacalculer les gramamr rules
    translationActions.extractListOfGrammarRules(
      newPartsList,
      props.grammarRules,
      setListOfGrammarRules
    );
  };

  const handleUnknownTransform = (event, part) => {
    event.preventDefault();
    let indexToTransform = 0;
    for (let i = 0; i < listParts.length; i++) {
      if (listParts[i] === part) indexToTransform = i;
    }
    let newPartsList = [];
    const partToTransform = listParts[indexToTransform];
    const beforePart =
      indexToTransform > 0 ? listParts[indexToTransform - 1] : null;
    const afterPart =
      indexToTransform < listParts.length - 1
        ? listParts[indexToTransform + 1]
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
      listParts.forEach((item, index) => {
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
      listParts.forEach((item, index) => {
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
      listParts.forEach((item, index) => {
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
      listParts.forEach((item, index) => {
        if (index < indexToTransform || index > indexToTransform) {
          newPartsList.push(item);
        } else {
          newPartsList.push(newFusionPart);
        }
      });
    }
    translationActions.loadParts(newPartsList, setListParts);
    // reacalculer les gramamr rules
    translationActions.extractListOfGrammarRules(
      newPartsList,
      props.grammarRules,
      setListOfGrammarRules
    );
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
              value={typeSelect}
              listOfValues={typeSelectListOfValue}
            />
            <CustomIntegerSelect
              id="quantity"
              label="Quantity"
              onChange={handleSelectChange}
              name="quantity"
              value={quantity}
              listOfValues={quantityListOfValue}
            />
          </div>

          <ListObject
            list={listObjects}
            onClick={handleListClick}
            style={listObjectsStyle}
            typeSelect={typeSelect}
          />
        </div>
        <TranslationArea
          sentence={sentence}
          onSentenceChange={handleSentenceChange}
          onTranslateClick={handleTranslateClick}
          onClearClick={handleClearClick}
          onKanaClick={handleKanaClick}
          onQuickSearchClick={handleQuickSearchClick}
        />
        <ListOfParts
          list={listParts}
          listOfKanjis={listOfKanjis}
          listOfGrammarRules={listOfGrammarRules}
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
  loading: PropTypes.bool,
  actions: PropTypes.object.isRequired,
  apiCallsInProgress: PropTypes.number.isRequired,
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Translation);
