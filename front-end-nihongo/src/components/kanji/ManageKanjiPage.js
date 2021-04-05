import React, { useState, useEffect } from "react";
import KanjiForm from "./KanjiForm";
import { toast } from "react-toastify";
import kanjiStore from "../../stores/kanjiStore";
import { radicals as radicalsList } from "../common/Radicals";
import { Prompt } from "react-router-dom";
import * as kanjiActions from "../../actions/kanjiActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import { newMeaningNumber } from "../common/meaningUtils";

const ManageKanjiPage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [kanji, setKanji] = useState({
    id: null,
    kanji: "",
    pronunciation: "",
    meanings: [
      {
        id: null,
        meaningNumber: 0,
        meaning: "",
        version: null,
      },
    ],
    radicals: "",
    strokeNumber: 0,
    numberOfUse: null,
    version: null,
  });

  const onMiddlePointClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    input.value = input.value + event.target.innerText;
    setKanji({
      ...kanji,
      pronunciation: kanji.pronunciation + event.target.innerText,
    });
  };

  const handleTranslateClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    setKanji({
      ...kanji,
      pronunciation: newValue,
    });
  };

  useEffect(() => {
    const character = props.match.params.kanji; // from the path /kanjis/:kanji
    if (character) {
      // on récupère le kanji du store et on le transforme pour qu'il corresponde au formulaire
      let tempKanji = kanjiStore.getKanjiByCharacter(character);
      // on transforme les listes de caractères en une seule chaine
      let newPronunciation = tempKanji.pronunciation[0];
      for (let i = 1; i < tempKanji.pronunciation.length; i++) {
        newPronunciation = newPronunciation + "・" + tempKanji.pronunciation[i];
      }
      const kanjiForm = {
        ...tempKanji,
        pronunciation: newPronunciation,
      };
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
    if (!kanji.pronunciation)
      _errors.pronunciation = "Pronunciation is required";
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
    // on transforme les chaine de caractères en liste de chaines
    let newPronunciation = kanji.pronunciation.split("・");
    for (let i = 0; i < newPronunciation.length; i++) {
      newPronunciation[i] = newPronunciation[i].replace("・", "");
    }
    const savedKanji = {
      ...kanji,
      pronunciation: newPronunciation,
    };
    kanjiActions.saveKanji(savedKanji).then(() => {
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
      meaningNumber: newMeaningNumber(kanji.meanings),
      meaning: "",
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
      />
    </>
  );
};

export default ManageKanjiPage;
