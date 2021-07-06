import React from "react";
import IAdjectiveConjugationTable from "../iAdjective/IAdjectiveConjugationTable";
import NaAdjectiveConjugationTable from "../naAdjective/NaAdjectiveConjugationTable";

const divStyle = {
  backgroundColor: "#4682b4",
  borderRadius: "10px",
  margin: "0.1em",
  padding: "0.5em",
};

const AdjectivesPage = () => {
  const exampleIAdjective = {
    id: 0,
    kanjis: "大きい",
    pronunciations: [
      {
        id: 0,
        pronunciationNumber: 1,
        pronunciation: "おおきい",
        version: 0,
      },
    ],
    meanings: [
      {
        id: 0,
        meaningNumber: 1,
        meaning: "Big",
        version: 0,
      },
    ],
    numberOfUse: 0,
    version: 0,
  };

  const exampleNaAdjective = {
    id: 0,
    kanjis: "静か",
    pronunciations: [
      {
        id: 0,
        pronunciationNumber: 1,
        pronunciation: "しずか",
        version: 0,
      },
    ],
    meanings: [
      {
        id: 0,
        meaningNumber: 1,
        meaning: "Quiet",
        version: 0,
      },
    ],
    numberOfUse: 0,
    version: 0,
  };

  return (
    <div style={divStyle}>
      <h2>Adjectives</h2>
      <p>
        There are two kinds of adjectives in the Japanese language :
        <ul>
          <li>I-adjectives</li>
          <li>Na-adjecvtives</li>
        </ul>
      </p>
      <h3>I-adjectives</h3>
      <p>
        Adjectival verbs (形容詞 keiyōshi) end with い i (but never えい ei) in
        base form. They may predicate sentences and inflect for past, negative,
        etc. As they head verb phrases, they can be considered a type of verbal
        (verb-like part of speech) and inflect in an identical manner as the
        negative form of verbs.
      </p>

      <IAdjectiveConjugationTable iAdjective={exampleIAdjective} />

      <h3>Na-adjectives</h3>
      <p>
        Adjectival nouns (形容動詞 keiyō-dōshi) always occur with a form of the
        copula, traditionally considered part of the adjectival noun itself. The
        only difference between nouns and adjectival nouns is in the attributive
        form, where nouns take <strong>no</strong> and adjectives take{" "}
        <strong>na</strong>. This has led many linguists to consider them a type
        of nominal (noun-like part of speech). Together with this form of the
        copula they may also predicate sentences and inflect for past, negative,
        etc.
      </p>

      <NaAdjectiveConjugationTable naAdjective={exampleNaAdjective} />
    </div>
  );
};

export default AdjectivesPage;
