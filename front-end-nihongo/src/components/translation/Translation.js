import React, { useState, useEffect } from "react";
import "./Translation.css";
import ListObject from "./ListObject";
import ListOfParts from "./ListOfParts";
import * as translationApi from "../../api/translationApi";
import CustomSelect from "../common/CustomSelect";
import CustomIntegerSelect from "../common/CustomIntegerSelect";
import TranslationArea from "./TranslationArea";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import translationConstants from "../common/translationConstants";
import kanjiStore from "../../stores/kanjiStore";
import verbStore from "../../stores/verbStore";
import naAdjectiveStore from "../../stores/naAdjectiveStore";
import iAdjectiveStore from "../../stores/iAdjectiveStore";
import nameStore from "../../stores/nameStore";
import wordStore from "../../stores/wordStore";
import particuleStore from "../../stores/particuleStore";
import counterStore from "../../stores/counterStore";
import translationStore from "../../stores/translationStore";
import { loadKanjis } from "../../actions/kanjiActions";
import { loadVerbs } from "../../actions/verbActions";
import { loadNaAdjectives } from "../../actions/naAdjectiveActions";
import { loadIAdjectives } from "../../actions/iAdjectiveActions";
import { loadNames } from "../../actions/nameActions";
import { loadWords } from "../../actions/wordActions";
import { loadParticules } from "../../actions/particuleActions";
import { loadCounters } from "../../actions/counterActions";
import { updateNumberOfUse } from "../../actions/translationActions";
import { extractParts, findListOfCandidates } from "./translationAction";
import * as translationActions from "../../actions/translationActions";

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

const Translation = () => {
  // récupération des listes de chaques type de mots
  const [kanjis, setKanjis] = useState(kanjiStore.getKanjis());
  const [verbs, setVerbs] = useState(verbStore.getVerbs());
  const [naAdjectives, setNaAdjectives] = useState(
    naAdjectiveStore.getNaAdjectives()
  );
  const [iAdjectives, setIAdjectives] = useState(
    iAdjectiveStore.getIAdjectives()
  );
  const [names, setNames] = useState(nameStore.getNames());
  const [words, setWords] = useState(wordStore.getWords());
  const [particules, setParticules] = useState(particuleStore.getParticules());
  const [counters, setCounters] = useState(counterStore.getCounters());

  // variables locales
  const [sentence, setSentence] = useState(translationStore.getSentence());
  const [quantity, setQuantity] = useState(translationStore.getQuantity());
  const [typeSelect, setTypeSelect] = useState(
    translationStore.getTypeSelect()
  );
  let typeSelectField = document.querySelectorAll("typeSelect");
  typeSelectField.value = translationStore.getTypeSelect();
  const [listObjects, setListObjects] = useState(
    translationApi.getMostUsedObject(typeSelect, quantity)
  );
  const [listObjectsStyle, setListObjectsStyle] = useState(
    getListObjectStyle(typeSelect)
  );
  const [listParts, setListParts] = useState(translationStore.getListParts());
  const [listOfKanjis, setListOfKanjis] = useState(
    translationStore.getListOfKanjis()
  );

  useEffect(() => {
    kanjiStore.addChangeListener(onChangeKanjis);
    verbStore.addChangeListener(onChangeVerbs);
    naAdjectiveStore.addChangeListener(onChangeNaAdjectives);
    iAdjectiveStore.addChangeListener(onChangeIAdjectives);
    nameStore.addChangeListener(onChangeNames);
    wordStore.addChangeListener(onChangeWords);
    particuleStore.addChangeListener(onChangeParticules);
    counterStore.addChangeListener(onChangeCounters);
    translationStore.addChangeListener(onChangeQuantity);
    translationStore.addChangeListener(onChangeSentence);
    translationStore.addChangeListener(onChangeTypeSelect);
    translationStore.addChangeListener(onChangeListOfKanjis);
    translationStore.addChangeListener(onChangeListParts);

    if (kanjiStore.getKanjis().length === 0) loadKanjis();
    if (verbStore.getVerbs().length === 0) loadVerbs();
    if (naAdjectiveStore.getNaAdjectives().length === 0) loadNaAdjectives();
    if (iAdjectiveStore.getIAdjectives().length === 0) loadIAdjectives();
    if (nameStore.getNames().length === 0) loadNames();
    if (wordStore.getWords().length === 0) loadWords();
    if (particuleStore.getParticules().length === 0) loadParticules();
    if (counterStore.getCounters().length === 0) loadCounters();

    return function () {
      kanjiStore.removeChangeListener(onChangeKanjis); //cleanup on unmount
      verbStore.removeChangeListener(onChangeVerbs);
      naAdjectiveStore.removeChangeListener(onChangeNaAdjectives);
      iAdjectiveStore.removeChangeListener(onChangeIAdjectives);
      nameStore.removeChangeListener(onChangeNames);
      wordStore.removeChangeListener(onChangeWords);
      particuleStore.removeChangeListener(onChangeParticules);
      counterStore.removeChangeListener(onChangeCounters);
      translationStore.removeChangeListener(onChangeQuantity);
      translationStore.removeChangeListener(onChangeSentence);
      translationStore.removeChangeListener(onChangeTypeSelect);
      translationStore.removeChangeListener(onChangeListOfKanjis);
      translationStore.removeChangeListener(onChangeListParts);
    };
  }, [
    kanjis.length,
    verbs.length,
    naAdjectives.length,
    iAdjectives.length,
    names.length,
    words.length,
    particules.length,
    counters.length,
    listParts.length,
  ]);

  function onChangeListParts() {
    setListParts(translationStore.getListParts());
  }

  function onChangeListOfKanjis() {
    setListOfKanjis(translationStore.getListOfKanjis());
  }

  function onChangeQuantity() {
    setQuantity(translationStore.getQuantity());
  }

  function onChangeSentence() {
    setSentence(translationStore.getSentence());
  }

  function onChangeTypeSelect() {
    setTypeSelect(translationStore.getTypeSelect());
  }

  function onChangeKanjis() {
    setKanjis(kanjiStore.getKanjis());
  }

  function onChangeVerbs() {
    setVerbs(verbStore.getVerbs());
  }

  function onChangeNaAdjectives() {
    setNaAdjectives(naAdjectiveStore.getNaAdjectives());
  }

  function onChangeIAdjectives() {
    setIAdjectives(iAdjectiveStore.getIAdjectives());
  }

  function onChangeNames() {
    setNames(nameStore.getNames());
  }

  function onChangeWords() {
    setWords(wordStore.getWords());
  }

  function onChangeParticules() {
    setParticules(particuleStore.getParticules());
  }

  function onChangeCounters() {
    setCounters(counterStore.getCounters());
  }

  const handleListClick = (event) => {
    translationActions.updateSentence(sentence + event.target.innerText);
    updateNumberOfUse(typeSelect, event.target.id);
  };

  const handleSelectChange = (event) => {
    let _typeSelect = "";
    let _quantity = 0;
    if (event.target.name === "typeSelect") {
      translationActions.updateTypeSelect(event.target.value);
      _typeSelect = event.target.value;
      _quantity = quantity;
    } else {
      translationActions.updateQuantity(event.target.value);
      _typeSelect = typeSelect;
      _quantity = event.target.value;
    }
    setListObjectsStyle(getListObjectStyle(_typeSelect));
    setListObjects(translationApi.getMostUsedObject(_typeSelect, _quantity));
  };

  const handleTranslateClick = (event) => {
    event.preventDefault();
    translationActions.extractListOfKanji(sentence, kanjis);
    const _listOfParts = extractParts(
      sentence,
      verbs,
      naAdjectives,
      iAdjectives,
      names,
      words,
      particules,
      counters
    );
    translationActions.loadParts(_listOfParts);
  };

  const handleClearClick = (event) => {
    event.preventDefault();
    translationActions.clearTranslation();
  };

  const handleQuickSearchClick = (event, result) => {
    if (!result.typeWord) {
      translationActions.updateSentence(sentence + result.kanji);
    } else if (result.typeWord === translationConstants.TYPE_VERB) {
      translationActions.updateSentence(sentence + result.neutralForm);
    } else {
      translationActions.updateSentence(sentence + result.kanjis);
    }
    updateNumberOfUse(typeSelect, result.id);
  };

  const handleSentenceChange = (event) => {
    event.preventDefault();
    let newValue = event.target.value;
    newValue = translateRomajiToKana(newValue);
    let textArea = document.getElementById("textToTranslate");
    textArea.value = newValue;
    translationActions.updateSentence(newValue);
  };

  const handleKanaClick = (event) => {
    event.preventDefault();
    let textArea = document.getElementById("textToTranslate");
    textArea.value = textArea.value + event.target.innerHTML;
    translationActions.updateSentence(textArea.value);
  };

  const handleSplitPart = (newList) => {
    let newPartsList = [];
    newList.forEach((part) => {
      if (
        part.type === translationConstants.TYPE_UNKNOWN &&
        part.listOfValues.length === 0
      ) {
        let partWithCandidates = {
          ...part,
          listOfValues: findListOfCandidates(
            part.kanjis,
            part.currentIndex,
            verbs,
            naAdjectives,
            iAdjectives,
            names,
            words,
            particules
          ),
        };
        newPartsList.push(partWithCandidates);
      } else {
        newPartsList.push(part);
      }
    });
    translationActions.loadParts(newPartsList);
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
          onSplitPart={handleSplitPart}
        />
      </div>
    </>
  );
};

export default Translation;
