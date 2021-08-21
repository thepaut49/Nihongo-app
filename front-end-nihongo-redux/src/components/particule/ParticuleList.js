import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isConnected } from "../../utils/userUtils";
import "./Particule.css";

const styleLink = {
  margin: "0.5em",
};

function ParticuleList(props) {
  const particules = props.particules;

  return (
    <div>
      {particules.map((particule) => {
        return (
          <div key={particule.id} className="particuleListStyle">
            <div className="particuleTitleStyle">
              <Link
                to={"/particule/visualize/" + particule.kanjis}
                className="visualizationObjectLink"
              >
                The Japanese particle {particule.kanjis}
              </Link>
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
            {isConnected() && (
              <div className="delete">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    props.deleteParticule(particule);
                  }}
                >
                  Delete
                </button>
                <Link
                  to={"/particule/modify/" + particule.kanjis}
                  style={styleLink}
                  className="btn btn-primary"
                >
                  Modify
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

ParticuleList.propTypes = {
  deleteParticule: PropTypes.func.isRequired,
  particules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanjis: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      function: PropTypes.string,
      howToUse: PropTypes.string,
      examples: PropTypes.string,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default ParticuleList;
