import React, { useState, useEffect } from "react";
import IAdjective from "./IAdjective";
import IAdjectiveConjugationTable from "./IAdjectiveConjugationTable";
import KanjiList from "../common/listComponent/KanjiList";
import { loadKanjis } from "../../redux/actions/kanjiActions";
import { loadIAdjectives } from "../../redux/actions/iAdjectiveActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newIAdjective = {
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

const VisualizeIAdjectivePage = ({
  iAdjectives,
  loadIAdjectives,
  kanjis,
  loadKanjis,
  ...props
}) => {
  const [iAdjective, setIAdjective] = useState({ ...props.iAdjective });

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
    searchKanjisLinkedToIAdjective(iAdjective, kanjis)
  );

  useEffect(() => {
    if (iAdjectives.length === 0) {
      loadIAdjectives().catch((error) => {
        alert("Loading iAdjectives failed" + error);
      });
    } else {
      setIAdjective({ ...props.iAdjective });
    }

    if (kanjis.length === 0) {
      loadKanjis()
        .then(
          setKanjisLinkedToIAdjective(
            searchKanjisLinkedToIAdjective(iAdjective, kanjis)
          )
        )
        .catch((error) => {
          alert("Loading kanjis failed" + error);
        });
    } else {
      setKanjisLinkedToIAdjective(
        searchKanjisLinkedToIAdjective(iAdjective, kanjis)
      );
    }
  }, [props.iAdjective]);

  const allEntitiesLoaded = () => {
    if (iAdjectives.length === 0) return false;
    if (kanjis.length === 0) return false;
    return true;
  };

  return (
    <>
      {!allEntitiesLoaded() ? (
        <Spinner />
      ) : (
        <>
          {iAdjective && (
            <div>
              <IAdjective iAdjective={iAdjective} />

              <IAdjectiveConjugationTable iAdjective={iAdjective} />

              {kanjisLinkedToIAdjective &&
                kanjisLinkedToIAdjective.length > 0 && (
                  <KanjiList kanjis={kanjisLinkedToIAdjective} />
                )}
            </div>
          )}
        </>
      )}
    </>
  );
};

VisualizeIAdjectivePage.propTypes = {
  iAdjective: PropTypes.object.isRequired,
  iAdjectives: PropTypes.array.isRequired,
  loadIAdjectives: PropTypes.func.isRequired,
  kanjis: PropTypes.array.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getIAdjectiveByKanjis(iAdjectives, kanjis) {
  return iAdjectives.find((iAdjective) => iAdjective.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const iAdjective =
    kanjis && state.iAdjectives.length > 0
      ? getIAdjectiveByKanjis(state.iAdjectives, kanjis)
      : newIAdjective;
  return {
    iAdjective,
    iAdjectives: state.iAdjectives,
    kanjis: state.kanjis,
  };
}

const mapDispatchToProps = {
  loadIAdjectives,
  loadKanjis,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizeIAdjectivePage);
