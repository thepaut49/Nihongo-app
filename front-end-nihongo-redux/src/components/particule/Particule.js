import React from "react";
import PropTypes from "prop-types";

const particuleListStyle = {
  borderRadius: "10px",
  backgroundColor: "var(--fourth-bg-color)",
  margin: "0.5em",
  padding: "0.5em",
};

const particuleTitleStyle = {
  fontWeight: "bold",
  fontSize: "xxx-large",
};

function Particule(props) {
  const particule = props.particule;

  return (
    <div style={particuleListStyle}>
      <div style={particuleTitleStyle}>
        <h2>The Japanese particle {particule.kanjis}</h2>
      </div>

      <div>
        <h3>Summary</h3>
        {particule.summary}

        <h3>Function of the {particule.kanjis}</h3>
        {particule.function}

        <h3>How to use the particle {particule.kanjis}</h3>
        {particule.howToUse}

        <h3>
          Japanese Examples SENTENCES with the particle {particule.kanjis}
        </h3>
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
