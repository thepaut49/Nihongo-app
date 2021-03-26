import React, { useState, useEffect } from "react";
import Verb from "./Verb";
import VerbConjugationTable from "./VerbConjugationTable";
import KanjiList from "../common/listComponent/KanjiList";
import verbStore from "../../stores/verbStore";
import kanjiStore from "../../stores/kanjiStore";
import { loadKanjis } from "../../actions/kanjiActions";
import { loadVerbs } from "../../actions/verbActions";

const VisualizeVerbPage = (props) => {
  const verb = verbStore.getVerbByNeutralForm(props.match.params.neutralForm);

  // read all the list of object and see if the verb is contained in the attribute verbs of object
  const searchKanjisLinkedToVerb = (verb, list) => {
    let listOfVerbLinkToVerb = [];
    if (verb && verb.neutralForm) {
      list.forEach((element) => {
        if (verb.neutralForm.includes(element.kanji)) {
          listOfVerbLinkToVerb.push(element);
        }
      });
    }
    return listOfVerbLinkToVerb;
  };

  const [kanjisLinkedToVerb, setKanjisLinkedToVerb] = useState(
    searchKanjisLinkedToVerb(verb, kanjiStore.getKanjis())
  );

  const [kanjis, setKanjis] = useState(kanjiStore.getKanjis());
  const [verbs, setVerbs] = useState(verbStore.getVerbs());

  useEffect(() => {
    kanjiStore.addChangeListener(onChangeKanjis);
    verbStore.addChangeListener(onChangeVerbs);

    if (kanjiStore.getKanjis().length === 0) loadKanjis();
    if (verbStore.getVerbs().length === 0) loadVerbs();

    if (verb) {
      if (kanjiStore.getKanjis().length > 0)
        setKanjisLinkedToVerb(
          searchKanjisLinkedToVerb(verb, kanjiStore.getKanjis())
        );
    }

    return function () {
      kanjiStore.removeChangeListener(onChangeKanjis);
      verbStore.removeChangeListener(onChangeVerbs);
    };
  }, [verb, kanjis.length, verbs.length]);

  function onChangeKanjis() {
    setKanjis(kanjiStore.getKanjis());
  }

  function onChangeVerbs() {
    setVerbs(verbStore.getVerbs());
  }

  return (
    <>
      <h2>Verb</h2>
      {verb && (
        <div>
          <Verb verb={verb} />

          <VerbConjugationTable verb={verb} />

          {kanjisLinkedToVerb && kanjisLinkedToVerb.length > 0 && (
            <KanjiList kanjis={kanjisLinkedToVerb} />
          )}
        </div>
      )}
    </>
  );
};

export default VisualizeVerbPage;
