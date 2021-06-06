import React, { useState, useEffect } from "react";
import Name from "./Name";
import KanjiList from "../common/listComponent/KanjiList";
import { loadKanjis } from "../../redux/actions/kanjiActions";
import { loadNames } from "../../redux/actions/nameActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newName = {
  id: null,
  kanjis: "",
  pronunciations: [
    {
      id: null,
      pronunciationNumber: 0,
      pronunciation: "",
      version: 0,
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

const VisualizeNamePage = ({
  names,
  loadNames,
  kanjis,
  loadKanjis,
  ...props
}) => {
  const [name, setName] = useState({ ...props.name });

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
    searchKanjisLinkedToName(name, kanjis)
  );

  useEffect(() => {
    if (names.length === 0) {
      loadNames().catch((error) => {
        alert("Loading names failed" + error);
      });
    } else {
      setName({ ...props.name });
    }

    if (kanjis.length === 0) {
      loadKanjis()
        .then(setKanjisLinkedToName(searchKanjisLinkedToName(name, kanjis)))
        .catch((error) => {
          alert("Loading kanjis failed" + error);
        });
    } else {
      setKanjisLinkedToName(searchKanjisLinkedToName(name, kanjis));
    }
  }, [props.name]);

  const allEntitiesLoaded = () => {
    if (names.length === 0) return false;
    if (kanjis.length === 0) return false;
    return true;
  };

  return (
    <>
      {!allEntitiesLoaded() ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

VisualizeNamePage.propTypes = {
  name: PropTypes.object.isRequired,
  names: PropTypes.array.isRequired,
  loadNames: PropTypes.func.isRequired,
  kanjis: PropTypes.array.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getNameByKanjis(names, kanjis) {
  return names.find((name) => name.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const name =
    kanjis && state.names.length > 0
      ? getNameByKanjis(state.names, kanjis)
      : newName;
  return {
    name,
    names: state.names,
    kanjis: state.kanjis,
  };
}

const mapDispatchToProps = {
  loadNames,
  loadKanjis,
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualizeNamePage);
