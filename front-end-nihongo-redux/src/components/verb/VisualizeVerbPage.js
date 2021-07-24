import React, { useState, useEffect } from "react";
import Verb from "./Verb";
import VerbConjugationTable from "./VerbConjugationTable";
import KanjiList from "../common/listComponent/KanjiList";
import { loadKanjis } from "../../redux/actions/kanjiActions";
import { loadVerbs } from "../../redux/actions/verbActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newVerb = {
  id: null,
  neutralForm: "",
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
      version: 0,
    },
  ],
  groupe: "",
  numberOfUse: null,
  version: null,
};

const VisualizeVerbPage = ({
  verbs,
  loadVerbs,
  kanjis,
  loadKanjis,
  ...props
}) => {
  const [verb, setVerb] = useState({ ...props.verb });

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
    searchKanjisLinkedToVerb(verb, kanjis)
  );

  useEffect(() => {
    if (verbs.length === 0) {
      loadVerbs().catch((error) => {
        alert("Loading verbs failed" + error);
      });
    } else {
      setVerb({ ...props.verb });
    }

    if (kanjis.length === 0) {
      loadKanjis()
        .then(setKanjisLinkedToVerb(searchKanjisLinkedToVerb(verb, kanjis)))
        .catch((error) => {
          alert("Loading kanjis failed" + error);
        });
    } else {
      setKanjisLinkedToVerb(searchKanjisLinkedToVerb(verb, kanjis));
    }
  }, [props.verb, verbs.length, kanjis.length]);

  const allEntitiesLoaded = () => {
    if (verbs.length === 0) return false;
    if (kanjis.length === 0) return false;
    return true;
  };

  return (
    <>
      {!allEntitiesLoaded() ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

VisualizeVerbPage.propTypes = {
  verb: PropTypes.object.isRequired,
  verbs: PropTypes.array.isRequired,
  loadVerbs: PropTypes.func.isRequired,
  kanjis: PropTypes.array.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getVerbByNeutralForm(verbs, neutralForm) {
  return verbs.find((verb) => verb.neutralForm === neutralForm) || null;
}

function mapStateToProps(state, ownProps) {
  const neutralForm = ownProps.match.params.neutralForm;
  const verb =
    neutralForm && state.verbs.length > 0
      ? getVerbByNeutralForm(state.verbs, neutralForm)
      : newVerb;
  return {
    verb,
    verbs: state.verbs,
    kanjis: state.kanjis,
  };
}

const mapDispatchToProps = {
  loadVerbs,
  loadKanjis,
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualizeVerbPage);
