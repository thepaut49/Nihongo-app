import React, { useState, useEffect } from "react";
import Suffix from "./Suffix";
import KanjiList from "../common/listComponent/KanjiList";
import suffixStore from "../../stores/suffixStore";
import kanjiStore from "../../stores/kanjiStore";
import { loadKanjis } from "../../actions/kanjiActions";
import { loadSuffixs } from "../../actions/suffixActions";

const VisualizeSuffixPage = (props) => {
  const suffix = suffixStore.getSuffixByKanjis(props.match.params.kanjis);

  // read all the list of object and see if the suffix is contained in the attribute suffixs of object
  const searchKanjisLinkedToSuffix = (suffix, list) => {
    let listOfKanjiLinkToSuffix = [];
    if (suffix && suffix.kanjis) {
      list.forEach((element) => {
        if (suffix.kanjis.includes(element.kanji)) {
          listOfKanjiLinkToSuffix.push(element);
        }
      });
    }
    return listOfKanjiLinkToSuffix;
  };

  const [kanjisLinkedToSuffix, setKanjisLinkedToSuffix] = useState(
    searchKanjisLinkedToSuffix(suffix, kanjiStore.getKanjis())
  );

  const [kanjis, setKanjis] = useState(kanjiStore.getKanjis());
  const [suffixs, setSuffixs] = useState(suffixStore.getSuffixs());

  useEffect(() => {
    kanjiStore.addChangeListener(onChangeKanjis);
    suffixStore.addChangeListener(onChangeSuffixs);

    if (kanjiStore.getKanjis().length === 0) loadKanjis();
    if (suffixStore.getSuffixs().length === 0) loadSuffixs();

    if (suffix) {
      if (kanjiStore.getKanjis().length > 0)
        setKanjisLinkedToSuffix(
          searchKanjisLinkedToSuffix(suffix, kanjiStore.getKanjis())
        );
    }
    return function () {
      kanjiStore.removeChangeListener(onChangeKanjis);
      suffixStore.removeChangeListener(onChangeSuffixs);
    };
  }, [suffix, kanjis.length, suffixs.length]);

  function onChangeKanjis() {
    setKanjis(kanjiStore.getKanjis());
  }
  function onChangeSuffixs() {
    setSuffixs(suffixStore.getSuffixs());
  }

  return (
    <>
      {suffix && (
        <div>
          <Suffix suffix={suffix} />

          {kanjisLinkedToSuffix && kanjisLinkedToSuffix.length > 0 && (
            <KanjiList kanjis={kanjisLinkedToSuffix} />
          )}
        </div>
      )}
    </>
  );
};

export default VisualizeSuffixPage;
