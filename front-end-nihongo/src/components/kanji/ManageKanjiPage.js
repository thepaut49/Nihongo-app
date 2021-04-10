import React, { useState, useEffect } from "react";
import KanjiForm from "./KanjiForm";
import { toast } from "react-toastify";
import kanjiStore from "../../stores/kanjiStore";
import { radicals as radicalsList } from "../common/Radicals";
import { Prompt } from "react-router-dom";
import * as kanjiActions from "../../actions/kanjiActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";

const ManageKanjiPage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [kanji, setKanji] = useState({
    id: null,
    kanji: "",
    pronunciations: [
      {
        id: null,
        pronunciationNumber: 0,
        pronunciation: "",
        version: 0,
      },
    ],
    meanings: [
      {
        id: null,
        meaningNumber: 0,
        meaning: "",
        version: 0,
      },
    ],
    radicals: "",
    strokeNumber: 0,
    numberOfUse: null,
    version: null,
  });

  useEffect(() => {
    const character = props.match.params.kanji; // from the path /kanjis/:kanji
    if (character) {
      // on récupère le kanji du store et on le transforme pour qu'il corresponde au formulaire
      const kanjiForm = kanjiStore.getKanjiByCharacter(character);
      setKanji(kanjiForm);
    }
  }, [props.match.params.kanji]);

  function handleChange(event) {
    setKanji({ ...kanji, [event.target.name]: event.target.value });
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!kanji.kanji) _errors.kanji = "Kanji is required";
    if (kanji.radicals.length > 0) {
      for (let i = 0; i < kanji.radicals.length; i++) {
        if (radicalsList.indexOf(kanji.radicals[i]) === -1) {
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
    setModified(false);
    kanjiActions.saveKanji(kanji).then(() => {
      props.history.push("/kanjis");
      toast.success("Kanji saved.");
    });
  }

  function handleClick(event) {
    event.preventDefault();
    if (kanji.radicals.indexOf(event.target.innerText) > -1)
      setKanji({
        ...kanji,
        radicals: kanji.radicals.replace(event.target.innerText, ""),
      });
    else {
      setKanji({
        ...kanji,
        radicals: kanji.radicals + event.target.innerText,
      });
    }
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    let newMeanings = kanji.meanings;
    newMeanings.push({
      kanjiId: kanji.id,
      meaningNumber: newMeaningNumber(kanji.meanings),
      meaning: "",
      verison: 0,
    });
    setKanji({
      ...kanji,
      meanings: newMeanings,
    });
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    let newMeanings = kanji.meanings;
    newMeanings[index].meaning = event.target.value;
    setKanji({ ...kanji, meanings: newMeanings });
    setModified(true);
  }

  function handleDeleteMeaning(event, index) {
    event.preventDefault();
    let newMeanings = kanji.meanings;
    newMeanings.splice(index, 1);
    setKanji({ ...kanji, meanings: newMeanings });
    setModified(true);
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    let pronunciations = kanji.pronunciations;
    pronunciations.push({
      kanjiId: kanji.id,
      pronunciationNumber: newPronunciationNumber(kanji.pronunciations),
      pronunciation: "",
      version: 0,
    });
    setKanji({
      ...kanji,
      pronunciations: pronunciations,
    });
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    let newPronunciations = kanji.pronunciations;
    newPronunciations[index].pronunciation = event.target.value;
    setKanji({ ...kanji, pronunciations: newPronunciations });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    let newPronunciations = kanji.pronunciations;
    newPronunciations.splice(index, 1);
    setKanji({ ...kanji, pronunciations: newPronunciations });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    let newPronunciations = kanji.pronunciations;
    newPronunciations[index].pronunciation =
      newPronunciations[index].pronunciation + event.target.innerText;
    setKanji({
      ...kanji,
      pronunciations: newPronunciations,
    });
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    let newPronunciations = kanji.pronunciations;
    newPronunciations[index].pronunciation = newValue;
    setKanji({
      ...kanji,
      pronunciations: newPronunciations,
    });
  };

  return (
    <>
      <h2>Manage Kanji</h2>
      <Prompt when={modified} message="Are you sure you want to leave ?" />
      <KanjiForm
        errors={errors}
        kanji={kanji}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClick={handleClick}
        onMiddlePointClick={onMiddlePointClick}
        onTranslateClick={handleTranslateClick}
        addMeaning={handleAddMeaning}
        onMeaningChange={handleMeaningChange}
        deleteMeaning={handleDeleteMeaning}
        addPronunciation={handleAddPronunciation}
        onPronunciationChange={handlePronunciationChange}
        deletePronunciation={handleDeletePronunciation}
      />
    </>
  );
};

export default ManageKanjiPage;
