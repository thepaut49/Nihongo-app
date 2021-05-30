import React, { useState, useEffect } from "react";
import Counter from "./Counter";
import KanjiList from "../common/listComponent/KanjiList";
import { loadKanjis } from "../../redux/actions/kanjiActions";
import { loadCounters } from "../../redux/actions/counterActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newCounter = {
  id: null,
  kanjis: "",
  pronunciations: [
    {
      id: null,
      pronunciation: "",
      pronunciationNumber: 0,
      version: 0,
    },
  ],
  use: "",
  summary: "",
  numberOfUse: null,
  version: null,
};

const VisualizeCounterPage = ({
  counters,
  loadCounters,
  kanjis,
  loadKanjis,
  ...props
}) => {
  const [counter, setCounter] = useState({ ...props.counter });

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
    searchKanjisLinkedToCounter(counter, kanjis)
  );

  useEffect(() => {
    if (counters.length === 0) {
      loadCounters().catch((error) => {
        alert("Loading counters failed" + error);
      });
    } else {
      setCounter({ ...props.counter });
    }

    if (kanjis.length === 0) {
      loadKanjis()
        .then(
          setKanjisLinkedToCounter(searchKanjisLinkedToCounter(counter, kanjis))
        )
        .catch((error) => {
          alert("Loading kanjis failed" + error);
        });
    } else {
      setKanjisLinkedToCounter(searchKanjisLinkedToCounter(counter, kanjis));
    }
  }, [props.counter]);

  return (
    <>
      {counters.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <div>
            <Counter counter={counter} />

            {kanjis.length === 0 ? (
              <Spinner />
            ) : (
              <>
                {kanjisLinkedToCounter && kanjisLinkedToCounter.length > 0 && (
                  <KanjiList kanjis={kanjisLinkedToCounter} />
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

VisualizeCounterPage.propTypes = {
  counter: PropTypes.object.isRequired,
  counters: PropTypes.array.isRequired,
  loadCounters: PropTypes.func.isRequired,
  kanjis: PropTypes.array.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getCounterByKanjis(counters, kanjis) {
  return counters.find((counter) => counter.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const counter =
    kanjis && state.counters.length > 0
      ? getCounterByKanjis(state.counters, kanjis)
      : newCounter;
  return {
    counter,
    counters: state.counters,
    kanjis: state.kanjis,
  };
}

const mapDispatchToProps = {
  loadCounters,
  loadKanjis,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizeCounterPage);
