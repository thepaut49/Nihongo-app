import React, { useState, useEffect } from "react";
import Suffix from "./Suffix";
import KanjiList from "../common/listComponent/KanjiList";
import { loadKanjis } from "../../redux/actions/kanjiActions";
import { loadSuffixs } from "../../redux/actions/suffixActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newSuffix = {
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
  version: null,
};

const VisualizeSuffixPage = ({
  suffixs,
  loadSuffixs,
  kanjis,
  loadKanjis,
  ...props
}) => {
  const [suffix, setSuffix] = useState({ ...props.suffix });

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
    searchKanjisLinkedToSuffix(suffix, kanjis)
  );

  useEffect(() => {
    if (suffixs.length === 0) {
      loadSuffixs().catch((error) => {
        alert("Loading suffixs failed" + error);
      });
    } else {
      setSuffix({ ...props.suffix });
    }

    if (kanjis.length === 0) {
      loadKanjis()
        .then(
          setKanjisLinkedToSuffix(searchKanjisLinkedToSuffix(suffix, kanjis))
        )
        .catch((error) => {
          alert("Loading kanjis failed" + error);
        });
    } else {
      setKanjisLinkedToSuffix(searchKanjisLinkedToSuffix(suffix, kanjis));
    }
  }, [props.suffix]);

  const allEntitiesLoaded = () => {
    if (suffixs.length === 0) return false;
    if (kanjis.length === 0) return false;
    return true;
  };

  return (
    <>
      {!allEntitiesLoaded() ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

VisualizeSuffixPage.propTypes = {
  suffix: PropTypes.object.isRequired,
  suffixs: PropTypes.array.isRequired,
  loadSuffixs: PropTypes.func.isRequired,
  kanjis: PropTypes.array.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getSuffixByKanjis(suffixs, kanjis) {
  return suffixs.find((suffix) => suffix.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const suffix =
    kanjis && state.suffixs.length > 0
      ? getSuffixByKanjis(state.suffixs, kanjis)
      : newSuffix;
  return {
    suffix,
    suffixs: state.suffixs,
    kanjis: state.kanjis,
  };
}

const mapDispatchToProps = {
  loadSuffixs,
  loadKanjis,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizeSuffixPage);
