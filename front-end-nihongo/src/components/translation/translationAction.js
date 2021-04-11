import {
  presentIndicative,
  presumptiveVolitional,
  imperative,
  pastIndicative,
  pastPresumptive,
  presentProgressive,
  pastProgressive,
  provisionalConditionalEba,
  potential,
  conditionalTara,
  causative,
  passive,
} from "../common/verbConjugator";
import {
  naForm,
  presentIndicative as presentIndicativeNaAdjective,
  pastIndicative as pastIndicativeNaAdjective,
} from "../common/naAdjectiveConjugator";
import {
  presentIndicative as presentIndicativeIAdjective,
  pastIndicative as pastIndicativeIAdjective,
} from "../common/iAdjectiveConjugator";
import verbConstants from "../common/verbConstants";
import translationConstants from "../common/translationConstants";
import { punctuationListWithoutDoublingkanji } from "../common/japanesePunctuation";
import { isPartANumber } from "../common/translation/numberRecognition";

export const extractListOfKanji = (sentence, kanjis) => {
  // je transforme ma chaine de charactère en tableau de type SEt pour que chaque element soit unique
  let sentenceSet = new Set(sentence);
  let lengthOfSentenceSet = 0;
  let index = 0;
  let listOfKanjisInSentence = [];
  while (index <= kanjis.length - 1 && lengthOfSentenceSet < sentenceSet.size) {
    if (
      listOfKanjisInSentence.indexOf(kanjis[index]) === -1 &&
      sentence.indexOf(kanjis[index].kanji) >= 0
    ) {
      listOfKanjisInSentence.push(kanjis[index]);
      lengthOfSentenceSet++;
    }
    index++;
  }
  return listOfKanjisInSentence;
};

export const extractParts = (
  sentence,
  verbs,
  naAdjectives,
  iAdjectives,
  names,
  words,
  particules,
  counters
) => {
  let listOfParts = [];
  debugger;
  let indiceCourant = 0;
  while (indiceCourant < sentence.length) {
    for (let j = 10; j > 0; j--) {
      let part = null;
      if (indiceCourant + j <= sentence.length) {
        let sentencePart = sentence.substr(indiceCourant, j);
        //console.log("sentancePart = " + sentencePart);

        part = isPartANumber(sentencePart, indiceCourant);

        if (j <= 4 && !part) {
          part = partIsACounter(sentencePart, indiceCourant, counters);
        }

        if (!part) {
          part = partIsAVerb(sentencePart, indiceCourant, verbs);
        }

        if (!part) {
          part = partIsANaAdjective(sentencePart, indiceCourant, naAdjectives);
        }

        if (!part) {
          part = partIsAIAdjective(sentencePart, indiceCourant, iAdjectives);
        }

        if (!part) {
          part = partIsAName(sentencePart, indiceCourant, names);
        }

        if (!part) {
          part = partIsAWord(sentencePart, indiceCourant, words);
        }

        // on a trouvé une partie, on l'ajoute à la liste des parties
        if (part) {
          listOfParts.push(part);
          indiceCourant = indiceCourant + j;
          break;
        }
      }

      // on a rien trouvé on passe indice courant au caractère suivant
      if (j === 1 && !part) {
        indiceCourant++;
      }
    }
  }
  listOfParts = addOfUnknownParts(
    sentence,
    listOfParts,
    particules,
    verbs,
    naAdjectives,
    iAdjectives,
    names,
    words
  );

  return listOfParts;
};

const addOfUnknownParts = (
  sentence,
  listOfParts,
  particules,
  verbs,
  naAdjectives,
  iAdjectives,
  names,
  words
) => {
  // add of unknown parts
  let listOfPartsWithUnknownParts = [];
  if (listOfParts.length === 0) {
    let unknownPart = partIsAParticule(
      sentence,
      0,
      particules,
      verbs,
      naAdjectives,
      iAdjectives,
      names,
      words
    );
    listOfPartsWithUnknownParts.push(unknownPart);
  } else {
    for (let index = 0; index < listOfParts.length; index++) {
      let currentPart = listOfParts[index];
      // Cas particulier du premier élément
      if (index === 0) {
        if (currentPart.currentIndex > 0) {
          let sentenceUnknownPart = sentence.substr(
            0,
            currentPart.currentIndex
          );
          let unknownPart = partIsAParticule(
            sentenceUnknownPart,
            0,
            particules,
            verbs,
            naAdjectives,
            iAdjectives,
            names,
            words
          );
          listOfPartsWithUnknownParts.push(unknownPart);
          listOfPartsWithUnknownParts.push(currentPart);
          if (index === listOfParts.length - 1) {
            // on est rendu au dernier élément on regarde si il reste une partie inconnu
            if (
              currentPart.currentIndex + currentPart.length <
              sentence.length
            ) {
              // si la index courant dépasse le dernier charactère on ne rajoute rien car la dernière part se termine au dernier caractère
              let sentenceUnknownPart = sentence.substr(
                currentPart.currentIndex + currentPart.length
              );
              if (sentenceUnknownPart.length > 0) {
                let unknownPart = partIsAParticule(
                  sentenceUnknownPart,
                  currentPart.currentIndex + currentPart.length,
                  particules,
                  verbs,
                  naAdjectives,
                  iAdjectives,
                  names,
                  words
                );
                listOfPartsWithUnknownParts.push(unknownPart);
              }
            }
            //si on est au bout on fait rien
          } else {
            // on regarde la partie suivante
            let nextPart = listOfParts[index + 1];
            let sentenceUnknownPart = sentence.substr(
              currentPart.currentIndex + currentPart.length,
              nextPart.currentIndex -
                currentPart.currentIndex -
                currentPart.length
            );
            if (sentenceUnknownPart.length > 0) {
              let unknownPart = partIsAParticule(
                sentenceUnknownPart,
                currentPart.currentIndex + currentPart.length,
                particules,
                verbs,
                naAdjectives,
                iAdjectives,
                names,
                words
              );
              listOfPartsWithUnknownParts.push(unknownPart);
            }
          }
        }
        // la première partie commence à l'indice 0
        else {
          listOfPartsWithUnknownParts.push(currentPart);
          if (index === listOfParts.length - 1) {
            // on est rendu au dernier élément on regarde si il reste une partie inconnu
            if (
              currentPart.currentIndex + currentPart.length <
              sentence.length
            ) {
              // si la index courant dépasse le dernier charactère on ne rajoute rien car la dernière part se termine au dernier caractère
              let sentenceUnknownPart = sentence.substr(
                currentPart.currentIndex + currentPart.length
              );
              if (sentenceUnknownPart.length > 0) {
                let unknownPart = partIsAParticule(
                  sentenceUnknownPart,
                  currentPart.currentIndex + currentPart.length,
                  particules,
                  verbs,
                  naAdjectives,
                  iAdjectives,
                  names,
                  words
                );
                listOfPartsWithUnknownParts.push(unknownPart);
              }
            }
            //si on est au bout on fait rien
          } else {
            // on regarde la partie suivante
            let nextPart = listOfParts[index + 1];
            let sentenceUnknownPart = sentence.substr(
              currentPart.currentIndex + currentPart.length,
              nextPart.currentIndex -
                currentPart.currentIndex -
                currentPart.length
            );
            if (sentenceUnknownPart.length > 0) {
              let unknownPart = partIsAParticule(
                sentenceUnknownPart,
                currentPart.currentIndex + currentPart.length,
                particules,
                verbs,
                naAdjectives,
                iAdjectives,
                names,
                words
              );
              listOfPartsWithUnknownParts.push(unknownPart);
            }
          }
        }
      } else {
        // on est rendu au 2eme element de ListOfParts
        listOfPartsWithUnknownParts.push(currentPart);
        if (index === listOfParts.length - 1) {
          // on est rendu au dernier élément on regarde si il reste une partie inconnu
          if (currentPart.currentIndex + currentPart.length < sentence.length) {
            let sentenceUnknownPart = sentence.substr(
              currentPart.currentIndex + currentPart.length
            );
            if (sentenceUnknownPart.length > 0) {
              let unknownPart = partIsAParticule(
                sentenceUnknownPart,
                currentPart.currentIndex + currentPart.length,
                particules,
                verbs,
                naAdjectives,
                iAdjectives,
                names,
                words
              );
              listOfPartsWithUnknownParts.push(unknownPart);
            }
          }
          //si on est au bout on fait rien
        } else {
          // on regarde la partie suivante
          let nextPart = listOfParts[index + 1];
          let sentenceUnknownPart = sentence.substr(
            currentPart.currentIndex + currentPart.length,
            nextPart.currentIndex -
              currentPart.currentIndex -
              currentPart.length
          );
          if (sentenceUnknownPart.length > 0) {
            let unknownPart = partIsAParticule(
              sentenceUnknownPart,
              currentPart.currentIndex + currentPart.length,
              particules,
              verbs,
              naAdjectives,
              iAdjectives,
              names,
              words
            );
            listOfPartsWithUnknownParts.push(unknownPart);
          }
        }
      }
    }
  }

  listOfPartsWithUnknownParts = addPunctuationPart(listOfPartsWithUnknownParts);
  return listOfPartsWithUnknownParts;
};

const extractPunctuationFromPart = (part) => {
  const word = part.kanjis;
  const currentIndex = part.currentIndex;
  let listOfParts = [];
  if (word.length === 1) {
    let newPunctuationPart = {
      type: translationConstants.TYPE_PUNCTUATION,
      kanjis: word,
      selectedPronunciation: word,
      selectedMeaning: "",
      pronunciations: [word],
      meanings: [],
      unknown: false,
      length: 1,
      currentIndex: currentIndex,
      listOfValues: [],
    };
    listOfParts.push(newPunctuationPart);
  } else if (word.length > 1) {
    let index = 0;
    let indexBeginWord = currentIndex;
    let partWord = "";
    while (index < word.length) {
      // si le caractère est une ponctuation on créé une part punctiation
      if (punctuationListWithoutDoublingkanji.includes(word[index])) {
        // on ajoute la part précédent la ponctuation
        if (partWord !== "") {
          // mot inconnu
          let newPart = {
            type: translationConstants.TYPE_UNKNOWN,
            kanjis: partWord,
            selectedPronunciation: "?",
            selectedMeaning: "?",
            pronunciations: ["?"],
            meanings: ["?"],
            unknown: true,
            length: partWord.length,
            currentIndex: indexBeginWord,
            listOfValues: [],
          };
          listOfParts.push(newPart);
        }

        // on ajoute la part punctuation
        let newPunctuationPart = {
          type: translationConstants.TYPE_PUNCTUATION,
          kanjis: word[index],
          selectedPronunciation: word[index],
          selectedMeaning: "",
          pronunciations: [word[index]],
          meanings: [],
          unknown: false,
          length: 1,
          currentIndex: currentIndex + index,
          listOfValues: [],
        };
        listOfParts.push(newPunctuationPart);
        partWord = "";
        indexBeginWord = currentIndex + index + 1;
      } else {
        partWord = partWord + word[index];
      }
      index++;
    }
    if (partWord !== "") {
      // mot inconnu
      let newPart = {
        type: translationConstants.TYPE_UNKNOWN,
        kanjis: partWord,
        selectedPronunciation: "?",
        selectedMeaning: "?",
        pronunciations: ["?"],
        meanings: ["?"],
        unknown: true,
        length: partWord.length,
        currentIndex: indexBeginWord,
        listOfValues: [],
      };
      listOfParts.push(newPart);
    }
  }
  return listOfParts;
};

const addPunctuationPart = (listOfParts) => {
  let listOfPartsUpdated = [];
  listOfParts.forEach((part) => {
    if (part.type === translationConstants.TYPE_UNKNOWN) {
      if (wordContainPunctuation(part.kanjis)) {
        listOfPartsUpdated = listOfPartsUpdated.concat(
          extractPunctuationFromPart(part)
        );
      } else {
        listOfPartsUpdated.push(part);
      }
    } else {
      listOfPartsUpdated.push(part);
    }
  });

  return listOfPartsUpdated;
};

const wordContainPunctuation = (word) => {
  for (let index = 0; index < word.length; index++) {
    if (punctuationListWithoutDoublingkanji.includes(word[index])) {
      return true;
    }
  }
  return false;
};

function isSuru(verb) {
  return verb.neutralForm === "する" ? true : false;
}

const partIsAVerb = (sentencePart, currentIndex, verbs) => {
  let part = null;
  let tenseFunctionList = [
    presentIndicative,
    presumptiveVolitional,
    imperative,
    pastIndicative,
    pastPresumptive,
    presentProgressive,
    pastProgressive,
    provisionalConditionalEba,
    potential,
    conditionalTara,
    causative,
    passive,
  ];
  const formList = [verbConstants.PLAIN_FORM, verbConstants.POLITE_FORM];
  const signList = [verbConstants.POSITIVE_SIGN, verbConstants.NEGATIVE_SIGN];
  for (let indexVerb = 0; indexVerb < verbs.length; indexVerb++) {
    const verb = verbs[indexVerb];
    let stem = "";
    if (!isSuru(verb)) {
      stem = verb.neutralForm.substr(0, verb.neutralForm.length - 1);
    }

    for (
      let indexTense = 0;
      indexTense < tenseFunctionList.length;
      indexTense++
    ) {
      for (let indexForm = 0; indexForm < formList.length; indexForm++) {
        for (let indexSign = 0; indexSign < signList.length; indexSign++) {
          let tense = tenseFunctionList[indexTense];
          let form = formList[indexForm];
          let sign = signList[indexSign];
          let verb = verbs[indexVerb];
          if (stem + tense(verb, form, sign) === sentencePart) {
            part = {
              type: translationConstants.TYPE_VERB,
              kanjis: sentencePart,
              selectedPronunciation: verb.pronunciations[0].pronunciation,
              selectedMeaning: verb.meanings[0].meaning,
              pronunciations: verb.pronunciations.map(
                (item) => item.pronunciation
              ),
              meanings: verb.meanings.map((item) => item.meaning),
              unknown: false,
              length: sentencePart.length,
              currentIndex: currentIndex,
              listOfValues: [],
            };
            return part;
          }
        }
      }
    }
  }
};

const partIsANaAdjective = (sentencePart, currentIndex, naAdjectives) => {
  let part = null;
  let tenseFunctionList = [
    naForm,
    presentIndicativeNaAdjective,
    pastIndicativeNaAdjective,
  ];
  const formList = [verbConstants.PLAIN_FORM, verbConstants.POLITE_FORM];
  const signList = [verbConstants.POSITIVE_SIGN, verbConstants.NEGATIVE_SIGN];
  for (let indexNaAdj = 0; indexNaAdj < naAdjectives.length; indexNaAdj++) {
    const naAdjective = naAdjectives[indexNaAdj];
    let stem = "";

    stem = naAdjective.kanjis.substr(0, naAdjective.kanjis.length - 1);

    for (
      let indexTense = 0;
      indexTense < tenseFunctionList.length;
      indexTense++
    ) {
      if (naAdjective.kanjis === sentencePart) {
        part = {
          type: translationConstants.TYPE_NA_ADJECTIVE,
          kanjis: sentencePart,
          selectedPronunciation: naAdjective.pronunciations[0].pronunciation,
          selectedMeaning: naAdjective.meanings[0].meaning,
          pronunciations: naAdjective.pronunciations.map(
            (item) => item.pronunciation
          ),
          meanings: naAdjective.meanings.map((item) => item.meaning),
          unknown: false,
          length: sentencePart.length,
          currentIndex: currentIndex,
          listOfValues: [],
        };
        return part;
      }
      for (let indexForm = 0; indexForm < formList.length; indexForm++) {
        for (let indexSign = 0; indexSign < signList.length; indexSign++) {
          let tense = tenseFunctionList[indexTense];
          let form = formList[indexForm];
          let sign = signList[indexSign];
          let naAdj = naAdjectives[indexNaAdj];
          if (stem + tense(naAdj, form, sign) === sentencePart) {
            part = {
              type: translationConstants.TYPE_NA_ADJECTIVE,
              kanjis: sentencePart,
              selectedPronunciation: naAdj.pronunciations[0].pronunciation,
              selectedMeaning: naAdj.meanings[0].meaning,
              pronunciations: naAdj.pronunciations.map(
                (item) => item.pronunciation
              ),
              meanings: naAdj.meanings.map((item) => item.meaning),
              unknown: false,
              length: sentencePart.length,
              currentIndex: currentIndex,
              listOfValues: [],
            };
            return part;
          }
        }
      }
    }
  }
};

const partIsAIAdjective = (sentencePart, currentIndex, iAdjectives) => {
  let part = null;
  let tenseFunctionList = [
    presentIndicativeIAdjective,
    pastIndicativeIAdjective,
  ];
  const formList = [verbConstants.PLAIN_FORM, verbConstants.POLITE_FORM];
  const signList = [verbConstants.POSITIVE_SIGN, verbConstants.NEGATIVE_SIGN];
  for (let indexIAdj = 0; indexIAdj < iAdjectives.length; indexIAdj++) {
    const iAdjective = iAdjectives[indexIAdj];
    let stem = "";

    stem = iAdjective.kanjis.substr(0, iAdjective.kanjis.length - 1);
    for (
      let indexTense = 0;
      indexTense < tenseFunctionList.length;
      indexTense++
    ) {
      for (let indexForm = 0; indexForm < formList.length; indexForm++) {
        for (let indexSign = 0; indexSign < signList.length; indexSign++) {
          let tense = tenseFunctionList[indexTense];
          let form = formList[indexForm];
          let sign = signList[indexSign];
          let iAdj = iAdjectives[indexIAdj];
          if (stem + tense(iAdj, form, sign) === sentencePart) {
            part = {
              type: translationConstants.TYPE_I_ADJECTIVE,
              kanjis: sentencePart,
              selectedPronunciation: iAdj.pronunciations[0].pronunciation,
              selectedMeaning: iAdj.meanings[0].meaning,
              pronunciations: iAdj.pronunciations.map(
                (item) => item.pronunciation
              ),
              meanings: iAdj.meanings.map((item) => item.meaning),
              unknown: false,
              length: sentencePart.length,
              currentIndex: currentIndex,
              listOfValues: [],
            };
            return part;
          }
        }
      }
    }
  }
};

const partIsAName = (sentencePart, currentIndex, names) => {
  let part = null;
  for (let index = 0; index < names.length; index++) {
    let name = names[index];
    if (name.kanjis === sentencePart) {
      part = {
        type: translationConstants.TYPE_NAME,
        kanjis: sentencePart,
        selectedPronunciation: name.pronunciations[0].pronunciation,
        selectedMeaning: name.meanings[0].meaning,
        pronunciations: name.pronunciations.map((item) => item.pronunciation),
        meanings: name.meanings.map((item) => item.meaning),
        unknown: false,
        length: sentencePart.length,
        currentIndex: currentIndex,
        listOfValues: [],
      };
      return part;
    }
  }
};

const partIsAWord = (sentencePart, currentIndex, words) => {
  let part = null;
  for (let index = 0; index < words.length; index++) {
    let word = words[index];
    if (word.kanjis === sentencePart) {
      part = {
        type: translationConstants.TYPE_WORD,
        kanjis: sentencePart,
        selectedPronunciation: word.pronunciations[0].pronunciation,
        selectedMeaning: word.meanings[0].meaning,
        pronunciations: word.pronunciations.map((item) => item.pronunciation),
        meanings: word.meanings.map((item) => item.meaning),
        unknown: false,
        length: sentencePart.length,
        currentIndex: currentIndex,
        listOfValues: [],
      };
      return part;
    }
  }
};

const partIsACounter = (sentencePart, currentIndex, counters) => {
  let part = null;
  for (let index = 0; index < counters.length; index++) {
    let counter = counters[index];
    if (counter.kanjis === sentencePart) {
      part = {
        type: translationConstants.TYPE_COUNTER,
        kanjis: sentencePart,
        selectedPronunciation: counter.pronunciations[0].pronunciation,
        selectedMeaning: counter.summary,
        pronunciations: counter.pronunciations.map(
          (item) => item.pronunciation
        ),
        meanings: [counter.summary],
        unknown: false,
        length: sentencePart.length,
        currentIndex: currentIndex,
        listOfValues: [],
      };
      return part;
    }
  }
};

const verbCandidate = (sentencePart, currentIndex, verbs) => {
  let part = null;
  let tenseFunctionList = [
    presentIndicative,
    presumptiveVolitional,
    imperative,
    pastIndicative,
    pastPresumptive,
    presentProgressive,
    pastProgressive,
    provisionalConditionalEba,
    potential,
    conditionalTara,
    causative,
    passive,
  ];
  const formList = [verbConstants.PLAIN_FORM, verbConstants.POLITE_FORM];
  const signList = [verbConstants.POSITIVE_SIGN, verbConstants.NEGATIVE_SIGN];
  let candidateList = [];
  if (!verbs) return candidateList;
  for (let indexVerb = 0; indexVerb < verbs.length; indexVerb++) {
    const verb = verbs[indexVerb];
    for (
      let indexTense = 0;
      indexTense < tenseFunctionList.length;
      indexTense++
    ) {
      for (let indexForm = 0; indexForm < formList.length; indexForm++) {
        for (let indexSign = 0; indexSign < signList.length; indexSign++) {
          let tense = tenseFunctionList[indexTense];
          let form = formList[indexForm];
          let sign = signList[indexSign];
          let listOfVerbConj = [];
          verb.pronunciations.forEach((pro) => {
            let pronunciation = pro.pronunciation;
            if (!isSuru(verb)) {
              listOfVerbConj.push(
                pronunciation.substr(0, pronunciation.length - 1) +
                  tense(verb, form, sign)
              );
            } else {
              listOfVerbConj.push(tense(verb, form, sign));
            }
          });
          if (listOfVerbConj.includes(sentencePart)) {
            part = {
              type: translationConstants.TYPE_VERB,
              kanjis: sentencePart,
              selectedPronunciation: sentencePart,
              selectedMeaning: verb.meanings[0].meaning,
              pronunciations: [sentencePart],
              meanings: verb.meanings.map((item) => item.meaning),
              unknown: false,
              length: sentencePart.length,
              currentIndex: currentIndex,
              listOfValues: [],
            };
            candidateList.push(part);
          }
        }
      }
    }
  }
  return candidateList;
};

const naAdjectiveCandidate = (sentencePart, currentIndex, naAdjectives) => {
  let part = null;
  let tenseFunctionList = [
    naForm,
    presentIndicativeNaAdjective,
    pastIndicativeNaAdjective,
  ];
  const formList = [verbConstants.PLAIN_FORM, verbConstants.POLITE_FORM];
  const signList = [verbConstants.POSITIVE_SIGN, verbConstants.NEGATIVE_SIGN];
  let candidateList = [];
  if (!naAdjectives) return candidateList;
  for (let indexNaAdj = 0; indexNaAdj < naAdjectives.length; indexNaAdj++) {
    const naAdj = naAdjectives[indexNaAdj];
    for (
      let indexTense = 0;
      indexTense < tenseFunctionList.length;
      indexTense++
    ) {
      for (let indexForm = 0; indexForm < formList.length; indexForm++) {
        for (let indexSign = 0; indexSign < signList.length; indexSign++) {
          let tense = tenseFunctionList[indexTense];
          let form = formList[indexForm];
          let sign = signList[indexSign];
          let listOfNaAdjConj = [];
          naAdj.pronunciations.forEach((pro) => {
            const pronunciation = pro.pronunciation;
            listOfNaAdjConj.push(
              pronunciation.substr(0, pronunciation.length - 1) +
                tense(naAdj, form, sign)
            );
          });
          if (listOfNaAdjConj.includes(sentencePart)) {
            part = {
              type: translationConstants.TYPE_NA_ADJECTIVE,
              kanjis: sentencePart,
              selectedPronunciation: sentencePart,
              selectedMeaning: naAdj.meanings[0].meaning,
              pronunciations: [sentencePart],
              meanings: naAdj.meanings.map((item) => item.meaning),
              unknown: false,
              length: sentencePart.length,
              currentIndex: currentIndex,
              listOfValues: [],
            };
            candidateList.push(part);
          }
        }
      }
    }
  }
  return candidateList;
};

const iAdjectiveCandidate = (sentencePart, currentIndex, iAdjectives) => {
  let part = null;
  let tenseFunctionList = [
    presentIndicativeIAdjective,
    pastIndicativeIAdjective,
  ];
  const formList = [verbConstants.PLAIN_FORM, verbConstants.POLITE_FORM];
  const signList = [verbConstants.POSITIVE_SIGN, verbConstants.NEGATIVE_SIGN];
  let candidateList = [];
  if (!iAdjectives) return candidateList;
  for (let indexIAdj = 0; indexIAdj < iAdjectives.length; indexIAdj++) {
    const iAdj = iAdjectives[indexIAdj];

    for (
      let indexTense = 0;
      indexTense < tenseFunctionList.length;
      indexTense++
    ) {
      for (let indexForm = 0; indexForm < formList.length; indexForm++) {
        for (let indexSign = 0; indexSign < signList.length; indexSign++) {
          let tense = tenseFunctionList[indexTense];
          let form = formList[indexForm];
          let sign = signList[indexSign];
          let listOfIAdjConj = [];
          iAdj.pronunciations.forEach((pro) => {
            const pronunciation = pro.pronunciation;
            listOfIAdjConj.push(
              pronunciation.substr(0, pronunciation.length - 1) +
                tense(iAdj, form, sign)
            );
          });
          if (listOfIAdjConj.includes(sentencePart)) {
            part = {
              type: translationConstants.TYPE_I_ADJECTIVE,
              kanjis: sentencePart,
              selectedPronunciation: sentencePart,
              selectedMeaning: iAdj.meanings[0].meaning,
              pronunciations: [sentencePart],
              meanings: iAdj.meanings.map((item) => item.meaning),
              unknown: false,
              length: sentencePart.length,
              currentIndex: currentIndex,
              listOfValues: [],
            };
            candidateList.push(part);
          }
        }
      }
    }
  }
  return candidateList;
};

const nameCandidate = (sentencePart, currentIndex, names) => {
  let part = null;
  let candidateList = [];
  if (!names) return candidateList;
  for (let index = 0; index < names.length; index++) {
    let name = names[index];
    let listOfNamePro = [];
    name.pronunciations.forEach((pro) => {
      const pronunciation = pro.pronunciation;
      listOfNamePro.push(pronunciation.substr(0, pronunciation.length));
    });
    if (listOfNamePro.includes(sentencePart)) {
      part = {
        type: translationConstants.TYPE_NAME,
        kanjis: sentencePart,
        selectedPronunciation: sentencePart,
        selectedMeaning: name.meanings[0].meaning,
        pronunciations: [sentencePart],
        meanings: name.meanings.map((item) => item.meaning),
        unknown: false,
        length: sentencePart.length,
        currentIndex: currentIndex,
        listOfValues: [],
      };
      candidateList.push(part);
    }
  }
  return candidateList;
};

const wordCandidate = (sentencePart, currentIndex, words) => {
  let part = null;
  let candidateList = [];
  if (!words) return candidateList;
  for (let index = 0; index < words.length; index++) {
    let word = words[index];
    let listOfWordPro = [];
    word.pronunciations.forEach((pro) => {
      const pronunciation = pro.pronunciation;
      listOfWordPro.push(pronunciation.substr(0, pronunciation.length));
    });
    if (listOfWordPro.includes(sentencePart)) {
      part = {
        type: translationConstants.TYPE_WORD,
        kanjis: sentencePart,
        selectedPronunciation: sentencePart,
        selectedMeaning: word.meanings[0].meaning,
        pronunciations: [sentencePart],
        meanings: word.meanings.map((item) => item.meaning),
        unknown: false,
        length: sentencePart.length,
        currentIndex: currentIndex,
        listOfValues: [],
      };
      candidateList.push(part);
    }
  }
  return candidateList;
};

const particuleCandidate = (sentencePart, currentIndex, particules) => {
  let part = null;
  let candidateList = [];
  if (!particules) return candidateList;
  for (let index = 0; index < particules.length; index++) {
    let particule = particules[index];
    if (particule.kanjis === sentencePart) {
      part = {
        type: translationConstants.TYPE_PARTICULE,
        kanjis: sentencePart,
        selectedPronunciation: sentencePart,
        selectedMeaning: particule.summary,
        pronunciations: [sentencePart],
        meanings: [particule.summary],
        unknown: false,
        length: sentencePart.length,
        currentIndex: currentIndex,
        listOfValues: [],
      };
      candidateList.push(part);
    }
  }
  return candidateList;
};

export const findListOfCandidates = (
  sentencePart,
  currentIndex,
  verbs,
  naAdjectives,
  iAdjectives,
  names,
  words,
  particules
) => {
  let listOfCandidates = [];
  let listOfVerbCandidates = verbCandidate(sentencePart, currentIndex, verbs);
  let listOfNaAdjCandidates = naAdjectiveCandidate(
    sentencePart,
    currentIndex,
    naAdjectives
  );
  let listOfIAdjCandidates = iAdjectiveCandidate(
    sentencePart,
    currentIndex,
    iAdjectives
  );
  let listOfNameCandidates = nameCandidate(sentencePart, currentIndex, names);
  let listOfWordCandidates = wordCandidate(sentencePart, currentIndex, words);
  let listOfparticuleCandidates = particuleCandidate(
    sentencePart,
    currentIndex,
    particules
  );

  if (listOfVerbCandidates.length > 0) {
    listOfCandidates = listOfCandidates.concat(listOfVerbCandidates);
  }
  if (listOfNaAdjCandidates.length > 0) {
    listOfCandidates = listOfCandidates.concat(listOfNaAdjCandidates);
  }
  if (listOfIAdjCandidates.length > 0) {
    listOfCandidates = listOfCandidates.concat(listOfIAdjCandidates);
  }
  if (listOfNameCandidates.length > 0) {
    listOfCandidates = listOfCandidates.concat(listOfNameCandidates);
  }
  if (listOfWordCandidates.length > 0) {
    listOfCandidates = listOfCandidates.concat(listOfWordCandidates);
  }

  if (listOfparticuleCandidates.length > 0) {
    listOfCandidates = listOfCandidates.concat(listOfparticuleCandidates);
  }

  return listOfCandidates;
};

const partIsAParticule = (
  sentencePart,
  currentIndex,
  particules,
  verbs,
  naAdjectives,
  iAdjectives,
  names,
  words
) => {
  let part = null;
  for (let index = 0; index < particules.length; index++) {
    let particule = particules[index];
    if (particule.kanjis === sentencePart) {
      part = {
        type: translationConstants.TYPE_PARTICULE,
        kanjis: sentencePart,
        selectedPronunciation: sentencePart,
        selectedMeaning: particule.summary,
        pronunciations: [sentencePart],
        meanings: [particule.summary],
        unknown: false,
        length: sentencePart.length,
        currentIndex: currentIndex,
        listOfValues: [],
      };
      return part;
    }
  }
  // the unknown part is not a particule so it is unknown
  let listOfCandidates = findListOfCandidates(
    sentencePart,
    currentIndex,
    verbs,
    naAdjectives,
    iAdjectives,
    names,
    words,
    particules
  );
  part = {
    type: translationConstants.TYPE_UNKNOWN,
    kanjis: sentencePart,
    selectedPronunciation: "?",
    selectedMeaning: "?",
    pronunciations: ["?"],
    meanings: ["?"],
    unknown: true,
    length: sentencePart.length,
    currentIndex: currentIndex,
    listOfValues: listOfCandidates,
  };
  return part;
};
