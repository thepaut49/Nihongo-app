import { newMeaningNumber, newPronunciationNumber } from "./meaningUtils";
import { translateRomajiToKana } from "./TranslateRomajiToKana";

export const handleAddMeaning = (event, entity, setEntity, setModified) => {
  event.preventDefault();
  const newMeaning = {
    id: null,
    meaningNumber: newMeaningNumber(entity.meanings),
    meaning: "",
    version: 0,
  };
  setEntity({
    ...entity,
    meanings: [...entity.meanings, newMeaning],
  });
  setModified(true);
};

export const handleMeaningChange = (
  event,
  index,
  entity,
  setEntity,
  setModified
) => {
  event.preventDefault();
  const newMeaning = {
    id: entity.meanings[index].id,
    meaningNumber: entity.meanings[index].meaningNumber,
    meaning: event.target.value,
    version: entity.meanings[index].version,
  };
  setEntity({
    ...entity,
    meanings: entity.meanings.map((meaning) => {
      if (meaning.meaningNumber === newMeaning.meaningNumber) {
        return newMeaning;
      } else {
        return meaning;
      }
    }),
  });
  setModified(true);
};

export const handleDeleteMeaning = (
  event,
  index,
  entity,
  setEntity,
  setModified
) => {
  event.preventDefault();
  const meanToDelete = entity.meanings[index];
  setEntity({
    ...entity,
    meanings: entity.meanings.filter((meaning) => {
      if (meaning === meanToDelete) {
        return false;
      } else {
        return true;
      }
    }),
  });
  setModified(true);
};

export const handleAddPronunciation = (
  event,
  entity,
  setEntity,
  setModified
) => {
  event.preventDefault();
  const newPronunciation = {
    id: null,
    pronunciationNumber: newPronunciationNumber(entity.pronunciations),
    pronunciation: "",
    version: 0,
  };
  setEntity({
    ...entity,
    pronunciations: [...entity.pronunciations, newPronunciation],
  });
  setModified(true);
};

export const handlePronunciationChange = (
  event,
  index,
  entity,
  setEntity,
  setModified
) => {
  event.preventDefault();
  const newPronunciation = {
    id: entity.pronunciations[index].id,
    pronunciationNumber: entity.pronunciations[index].pronunciationNumber,
    pronunciation: event.target.value,
    version: entity.pronunciations[index].version,
  };
  setEntity({
    ...entity,
    pronunciations: entity.pronunciations.map((pronunciation) => {
      if (
        pronunciation.pronunciationNumber ===
        newPronunciation.pronunciationNumber
      ) {
        return newPronunciation;
      } else {
        return pronunciation;
      }
    }),
  });
  setModified(true);
};

export const handleDeletePronunciation = (
  event,
  index,
  entity,
  setEntity,
  setModified
) => {
  event.preventDefault();
  const proToDelete = entity.pronunciations[index];
  setEntity({
    ...entity,
    pronunciations: entity.pronunciations.filter((pronunciation) => {
      if (pronunciation === proToDelete) {
        return false;
      } else {
        return true;
      }
    }),
  });
  setModified(true);
};

export const onMiddlePointClick = (
  event,
  index,
  entity,
  setEntity,
  setModified
) => {
  event.preventDefault();
  let input = document.getElementById("pronunciation" + index);
  input.value = input.value + event.target.innerText;
  const newPronunciation = {
    id: entity.pronunciations[index].id,
    pronunciationNumber: entity.pronunciations[index].pronunciationNumber,
    pronunciation: input.value,
    version: entity.pronunciations[index].version,
  };
  setEntity({
    ...entity,
    pronunciations: entity.pronunciations.map((pronunciation) => {
      if (
        pronunciation.pronunciationNumber ===
        newPronunciation.pronunciationNumber
      ) {
        return newPronunciation;
      } else {
        return pronunciation;
      }
    }),
  });
  setModified(true);
};

export const handleTranslateClick = (
  event,
  index,
  entity,
  setEntity,
  setModified
) => {
  event.preventDefault();
  let input = document.getElementById("pronunciation" + index);
  const newValue = translateRomajiToKana(input.value);
  input.value = newValue;
  const newPronunciation = {
    id: entity.pronunciations[index].id,
    pronunciationNumber: entity.pronunciations[index].pronunciationNumber,
    pronunciation: input.value,
    version: entity.pronunciations[index].version,
  };
  setEntity({
    ...entity,
    pronunciations: entity.pronunciations.map((pronunciation) => {
      if (
        pronunciation.pronunciationNumber ===
        newPronunciation.pronunciationNumber
      ) {
        return newPronunciation;
      } else {
        return pronunciation;
      }
    }),
  });
  setModified(true);
};
