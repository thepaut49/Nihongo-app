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

        <div
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
