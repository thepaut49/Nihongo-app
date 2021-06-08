import React, { useState, useEffect } from "react";
import NaAdjective from "./NaAdjective";
import KanjiList from "../common/listComponent/KanjiList";
import NaAdjectiveConjugationTable from "./NaAdjectiveConjugationTable";
import { loadKanjis } from "../../redux/actions/kanjiActions";
import { loadNaAdjectives } from "../../redux/actions/naAdjectiveActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newNaAdjective = {
  id: null,
  kanjis: "",
  pronunciations: [
    {
      id: null,
      pronunciationNumber: 0,
      pronunciation: "",
      version: null,
    },
  ],
  meanings: [
    {
      id: null,
      meaningNumber: 0,
      meaning: "",
      version: null,
    },
  ],
  numberOfUse: null,
  version: null,
};

const VisualizeNaAdjectivePage = ({
  naAdjectives,
  loadNaAdjectives,
  kanjis,
  loadKanjis,
  ...props
}) => {
  const [naAdjective, setNaAdjective] = useState({ ...props.naAdjective });

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
    searchKanjisLinkedToNaAdjective(naAdjective, kanjis)
  );

  useEffect(() => {
    if (kanjis.length === 0) {
      loadKanjis().catch((error) => {
        alert("Loading kanjis failed" + error);
      });
    }

    if (naAdjectives.length === 0) {
      loadNaAdjectives().catch((error) => {
        alert("Loading na-adjective failed" + error);
      });
    } else {
      setNaAdjective({ ...props.naAdjective });
    }

    if (kanjis.length > 0)
      setKanjisLinkedToNaAdjective(
        searchKanjisLinkedToNaAdjective(naAdjective, kanjis)
      );
  }, [props.naAdjective]);

  const allEntitiesLoaded = () => {
    if (naAdjectives.length === 0) return false;
    if (kanjis.length === 0) return false;
    return true;
  };

  return (
    <>
      {!allEntitiesLoaded() ? (
        <Spinner />
      ) : (
        <>
          <h2>Na-Adjective</h2>
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
      )}
    </>
  );
};

VisualizeNaAdjectivePage.propTypes = {
  naAdjective: PropTypes.object.isRequired,
  naAdjectives: PropTypes.array.isRequired,
  loadNaAdjectives: PropTypes.func.isRequired,
  kanjis: PropTypes.array.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getNaAdjectiveByKanjis(naAdjectives, kanjis) {
  return (
    naAdjectives.find((naAdjective) => naAdjective.kanjis === kanjis) || null
  );
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const naAdjective =
    kanjis && state.naAdjectives.length > 0
      ? getNaAdjectiveByKanjis(state.naAdjectives, kanjis)
      : newNaAdjective;
  return {
    naAdjective,
    naAdjectives: state.naAdjectives,
    kanjis: state.kanjis,
  };
}

const mapDispatchToProps = {
  loadNaAdjectives,
  loadKanjis,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizeNaAdjectivePage);
