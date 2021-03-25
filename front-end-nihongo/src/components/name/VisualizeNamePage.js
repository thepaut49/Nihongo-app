import React, { useState, useEffect } from "react";
import Name from "./Name";
import KanjiList from "../common/listComponent/KanjiList";
import nameStore from "../../stores/nameStore";
import kanjiStore from "../../stores/kanjiStore";
import { loadKanjis } from "../../actions/kanjiActions";
import { loadNames } from "../../actions/nameActions";

const VisualizeNamePage = (props) => {
  const name = nameStore.getNameByKanjis(props.match.params.kanjis);

  // read all the list of object and see if the name is contained in the attribute names of object
  const searchKanjisLinkedToName = (name, list) => {
    let listOfKanjiLinkToName = [];
    if (name && name.kanjis) {
      list.forEach((element) => {
        if (name.kanjis.includes(element.kanji)) {
          listOfKanjiLinkToName.push(element);
        }
      });
    }
    return listOfKanjiLinkToName;
  };

  const [kanjisLinkedToName, setKanjisLinkedToName] = useState(
    searchKanjisLinkedToName(name, kanjiStore.getKanjis())
  );

  const [kanjis, setKanjis] = useState(kanjiStore.getKanjis());
  const [names, setNames] = useState(nameStore.getNames());

  useEffect(() => {
    kanjiStore.addChangeListener(onChangeKanjis);
    nameStore.addChangeListener(onChangeNames);

    if (kanjiStore.getKanjis().length === 0) loadKanjis();
    if (nameStore.getNames().length === 0) loadNames();

    if (name) {
      if (kanjiStore.getKanjis().length > 0)
        setKanjisLinkedToName(
          searchKanjisLinkedToName(name, kanjiStore.getKanjis())
        );
    }

    return function () {
      kanjiStore.removeChangeListener(onChangeKanjis);
      nameStore.removeChangeListener(onChangeNames);
    };
  }, [name, kanjis.length, names.length]);

  function onChangeKanjis() {
    setKanjis(kanjiStore.getKanjis());
  }

  function onChangeNames() {
    setNames(nameStore.getNames());
  }

  return (
    <>
      <h2>Name</h2>
      {name && (
        <div>
          <Name name={name} />

          {kanjisLinkedToName && kanjisLinkedToName.length > 0 && (
            <KanjiList kanjis={kanjisLinkedToName} />
          )}
        </div>
      )}
    </>
  );
};

export default VisualizeNamePage;
