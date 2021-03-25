import React, { useState, useEffect } from "react";
import NaAdjective from "./NaAdjective";
import KanjiList from "../common/listComponent/KanjiList";
import NaAdjectiveConjugationTable from "./NaAdjectiveConjugationTable";
import naAdjectiveStore from "../../stores/naAdjectiveStore";
import kanjiStore from "../../stores/kanjiStore";
import { loadKanjis } from "../../actions/kanjiActions";
import { loadNaAdjectives } from "../../actions/naAdjectiveActions";

const VisualizeNaAdjectivePage = (props) => {
  const naAdjective = naAdjectiveStore.getNaAdjectiveByKanjis(
    props.match.params.kanjis
  );

  // read all the list of object and see if the naadjective is contained in the attribute naadjectives of object
  const searchKanjisLinkedToNaAdjective = (naAdjective, list) => {
    let listOfVerbLinkToNaAdjective = [];
    if (naAdjective && naAdjective.kanjis) {
      list.forEach((element) => {
        if (naAdjective.kanjis.includes(element.kanji)) {
          listOfVerbLinkToNaAdjective.push(element);
        }
      });
    }
    return listOfVerbLinkToNaAdjective;
  };

  const [kanjisLinkedToNaAdjective, setKanjisLinkedToNaAdjective] = useState(
    searchKanjisLinkedToNaAdjective(naAdjective, kanjiStore.getKanjis())
  );

  const [kanjis, setKanjis] = useState(kanjiStore.getKanjis());
  const [naAdjectives, setNaAdjectives] = useState(
    naAdjectiveStore.getNaAdjectives()
  );

  useEffect(() => {
    kanjiStore.addChangeListener(onChangeKanjis);
    naAdjectiveStore.addChangeListener(onChangeNaAdjectives);

    if (kanjiStore.getKanjis().length === 0) loadKanjis();
    if (naAdjectiveStore.getNaAdjectives().length === 0) loadNaAdjectives();

    if (naAdjective) {
      if (kanjiStore.getKanjis().length > 0)
        setKanjisLinkedToNaAdjective(
          searchKanjisLinkedToNaAdjective(naAdjective, kanjiStore.getKanjis())
        );
    }

    return function () {
      kanjiStore.removeChangeListener(onChangeKanjis);
      naAdjectiveStore.removeChangeListener(onChangeNaAdjectives);
    };
  }, [naAdjective, kanjis.length, naAdjectives.length]);

  function onChangeKanjis() {
    setKanjis(kanjiStore.getKanjis());
  }

  function onChangeNaAdjectives() {
    setNaAdjectives(naAdjectiveStore.getNaAdjectives());
  }

  return (
    <>
      <h2>I-Adjective</h2>
      {naAdjective && (
        <div>
          <NaAdjective naAdjective={naAdjective} />

          <NaAdjectiveConjugationTable naAdjective={naAdjective} />

          {kanjisLinkedToNaAdjective &&
            kanjisLinkedToNaAdjective.length > 0 && (
              <KanjiList kanjis={kanjisLinkedToNaAdjective} />
            )}
        </div>
      )}
    </>
  );
};

export default VisualizeNaAdjectivePage;
