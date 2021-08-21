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
        <h4>Summary</h4>
        <p className="particuleSummary">{particule.summary}</p>

        <div
          className="particuleDescription"
          dangerouslySetInnerHTML={{
            __html: particule.htmlPage,
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
