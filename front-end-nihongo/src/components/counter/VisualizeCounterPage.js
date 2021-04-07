import React, { useState, useEffect } from "react";
import Counter from "./Counter";
import KanjiList from "../common/listComponent/KanjiList";
import counterStore from "../../stores/counterStore";
import kanjiStore from "../../stores/kanjiStore";
import { loadKanjis } from "../../actions/kanjiActions";
import { loadCounters } from "../../actions/counterActions";

const VisualizeCounterPage = (props) => {
  const counter = counterStore.getCounterByKanjis(props.match.params.kanjis);

  // read all the list of object and see if the counter is contained in the attribute counters of object
  const searchKanjisLinkedToCounter = (counter, list) => {
    let listOfKanjiLinkToCounter = [];
    if (counter && counter.kanjis) {
      list.forEach((element) => {
        if (counter.kanjis.includes(element.kanji)) {
          listOfKanjiLinkToCounter.push(element);
        }
      });
    }
    return listOfKanjiLinkToCounter;
  };

  const [kanjisLinkedToCounter, setKanjisLinkedToCounter] = useState(
    searchKanjisLinkedToCounter(counter, kanjiStore.getKanjis())
  );

  const [kanjis, setKanjis] = useState(kanjiStore.getKanjis());
  const [counters, setCounters] = useState(counterStore.getCounters());

  useEffect(() => {
    kanjiStore.addChangeListener(onChangeKanjis);
    counterStore.addChangeListener(onChangeCounters);

    if (kanjiStore.getKanjis().length === 0) loadKanjis();
    if (counterStore.getCounters().length === 0) loadCounters();

    if (counter) {
      if (kanjiStore.getKanjis().length > 0)
        setKanjisLinkedToCounter(
          searchKanjisLinkedToCounter(counter, kanjiStore.getKanjis())
        );
    }
    return function () {
      kanjiStore.removeChangeListener(onChangeKanjis);
      counterStore.removeChangeListener(onChangeCounters);
    };
  }, [counter, kanjis.length, counters.length]);

  function onChangeKanjis() {
    setKanjis(kanjiStore.getKanjis());
  }
  function onChangeCounters() {
    setCounters(counterStore.getCounters());
  }

  return (
    <>
      {counter && (
        <div>
          <Counter counter={counter} />

          {kanjisLinkedToCounter && kanjisLinkedToCounter.length > 0 && (
            <KanjiList kanjis={kanjisLinkedToCounter} />
          )}
        </div>
      )}
    </>
  );
};

export default VisualizeCounterPage;
