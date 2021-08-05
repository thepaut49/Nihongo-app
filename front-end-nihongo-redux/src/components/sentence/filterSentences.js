export const filterSentences = (sentences, sentenceCriteria) => {
  let filteredSentences = [];
  if (sentenceCriteriaEmpty(sentenceCriteria)) {
    filteredSentences = sentences;
  } else {
    for (let index = 0; index < sentences.length; index++) {
      let sentence = sentences[index];
      let add = true;
      if (sentenceCriteria.kanjisCriteria) {
        add = sentence.kanjis.includes(sentenceCriteria.kanjisCriteria);
      }
      if (add && sentenceCriteria.pronunciationCriteria) {
        add = sentence.pronunciation.includes(
          sentenceCriteria.pronunciationCriteria
        );
      }
      if (add && sentenceCriteria.meaningCriteria) {
        add = sentence.meaning.includes(sentenceCriteria.meaningCriteria);
      }
      if (add && sentenceCriteria.topicCriteria) {
        add = sentence.topic === sentenceCriteria.topicCriteria;
      }

      if (add) {
        filteredSentences.push(sentences[index]);
      }
    }
  }
  return filteredSentences;
};

const sentenceCriteriaEmpty = (sentenceCriteria) => {
  if (!sentenceCriteria) {
    return true;
  } else if (
    sentenceCriteria.kanjisCriteria ||
    sentenceCriteria.pronunciationCriteria ||
    sentenceCriteria.meaningCriteria ||
    sentenceCriteria.topicCriteria
  ) {
    return false;
  } else {
    return true;
  }
};
