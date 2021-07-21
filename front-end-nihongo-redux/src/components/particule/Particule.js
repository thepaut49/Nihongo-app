import React from "react";
import PropTypes from "prop-types";

function Particule(props) {
  const particule = props.particule;

  return (
    <div key={particule.id} className="particuleListStyle">
      <div className="particuleTitleStyle">
        The Japanese particle {particule.kanjis}
      </div>

      <div>
        <h2>Summary</h2>
        {particule.summary}

        <h2>Function of the {particule.kanjis}</h2>
        {particule.function}

        <h2>How to use the particle {particule.kanjis}</h2>
        {particule.howToUse}

        <h2>
          Japanese Examples SENTENCES with the particle {particule.kanjis}
        </h2>
        <div
          dangerouslySetInnerHTML={{
            __html: particule.examples,
          }}
        />
      </div>
    </div>
  );
}

Particule.propTypes = {
  particule: PropTypes.object.isRequired,
};

export default Particule;
