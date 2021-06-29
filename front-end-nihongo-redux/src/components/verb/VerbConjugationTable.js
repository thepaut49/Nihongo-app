import React from "react";
import "./VerbConjugationTable.css";
import {
  presentIndicative,
  presumptiveVolitional,
  imperative,
  pastIndicative,
  pastPresumptive,
  presentProgressive,
  pastProgressive,
  provisionalConditionalEba,
  potential,
  conditionalTara,
  causative,
  passive,
} from "../common/verbConjugator";
import Tense from "./Tense";
import PropTypes from "prop-types";

function VerbConjugationTable(props) {
  const verb = props.verb;

  return (
    <>
      <h2>{props.verb.neutralForm} Conjugation</h2>
      <div className="grid-container-mainGrid">
        <Tense
          verb={verb}
          tense="Present Indicative"
          tenseFunction={presentIndicative}
        />
        <Tense
          verb={verb}
          tense="Presumptive \ Volitional"
          tenseFunction={presumptiveVolitional}
        />
        <Tense verb={verb} tense="Imperative" tenseFunction={imperative} />
        <Tense
          verb={verb}
          tense="Past Indicative"
          tenseFunction={pastIndicative}
        />
        <Tense
          verb={verb}
          tense="Past Presumptive"
          tenseFunction={pastPresumptive}
        />
        <Tense
          verb={verb}
          tense="Present Progressive"
          tenseFunction={presentProgressive}
        />
        <Tense
          verb={verb}
          tense="Past Progressive"
          tenseFunction={pastProgressive}
        />
        <Tense
          verb={verb}
          tense="Provisional Conditional eba"
          tenseFunction={provisionalConditionalEba}
        />
        <Tense
          verb={verb}
          tense="Conditional (-tara form)"
          tenseFunction={conditionalTara}
        />
        <Tense verb={verb} tense="Potential" tenseFunction={potential} />
        <Tense verb={verb} tense="Causative" tenseFunction={causative} />
        <Tense verb={verb} tense="Passive" tenseFunction={passive} />
      </div>
    </>
  );
}

VerbConjugationTable.propTypes = {
  verb: PropTypes.object.isRequired,
};

export default VerbConjugationTable;
