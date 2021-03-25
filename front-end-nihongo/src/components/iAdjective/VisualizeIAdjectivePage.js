import React, { useState, useEffect } from "react";
import IAdjective from "./IAdjective";
import IAdjectiveConjugationTable from "./IAdjectiveConjugationTable";
import KanjiList from "../common/listComponent/KanjiList";
import iAdjectiveStore from "../../stores/iAdjectiveStore";
import kanjiStore from "../../stores/kanjiStore";
import { loadKanjis } from "../../actions/kanjiActions";
import { loadIAdjectives } from "../../actions/iAdjectiveActions";

const VisualizeIAdjectivePage = (props) => {
  const iAdjective = iAdjectiveStore.getIAdjectiveByKanjis(
    props.match.params.kanjis
  );

  // read all the list of object and see if the iadjective is contained in the attribute iadjectives of object
  const searchKanjisLinkedToIAdjective = (iAdjective, list) => {
    let listOfKanjiLinkToIAdjective = [];
    if (iAdjective && iAdjective.kanjis) {
      list.forEach((element) => {
        if (iAdjective.kanjis.includes(element.kanji)) {
          listOfKanjiLinkToIAdjective.push(element);
        }
      });
    }
    return listOfKanjiLinkToIAdjective;
  };

  const [kanjisLinkedToIAdjective, setKanjisLinkedToIAdjective] = useState(
    searchKanjisLinkedToIAdjective(iAdjective, kanjiStore.getKanjis())
  );

  const [kanjis, setKanjis] = useState(kanjiStore.getKanjis());
  const [iAdjectives, setIAdjectives] = useState(
    iAdjectiveStore.getIAdjectives()
  );

  useEffect(() => {
    kanjiStore.addChangeListener(onChangeKanjis);
    iAdjectiveStore.addChangeListener(onChangeIAdjectives);

    if (kanjiStore.getKanjis().length === 0) loadKanjis();
    if (iAdjectiveStore.getIAdjectives().length === 0) loadIAdjectives();

    if (iAdjective) {
      if (kanjiStore.getKanjis().length > 0)
        setKanjisLinkedToIAdjective(
          searchKanjisLinkedToIAdjective(iAdjective, kanjiStore.getKanjis())
        );
    }
    return function () {
      kanjiStore.removeChangeListener(onChangeKanjis);
      iAdjectiveStore.removeChangeListener(onChangeIAdjectives);
    };
  }, [iAdjective, kanjis.length, iAdjectives.length]);

  function onChangeKanjis() {
    setKanjis(kanjiStore.getKanjis());
  }
  function onChangeIAdjectives() {
    setIAdjectives(iAdjectiveStore.getIAdjectives());
  }

  return (
    <>
      <h2>I-Adjective</h2>
      {iAdjective && (
        <div>
          <IAdjective iAdjective={iAdjective} />

          <IAdjectiveConjugationTable iAdjective={iAdjective} />

          {kanjisLinkedToIAdjective && kanjisLinkedToIAdjective.length > 0 && (
            <KanjiList kanjis={kanjisLinkedToIAdjective} />
          )}
        </div>
      )}
    </>
  );
};

export default VisualizeIAdjectivePage;
