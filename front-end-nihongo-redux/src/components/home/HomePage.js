import React from "react";
import "./HomePage.css";
import PropTypes from "prop-types";
import * as visitStatActions from "../../redux/actions/visitStatActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function HomePage(props) {
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      const { actions } = props;
      const newVisitStat = {
        ip: data.ip,
      };
      actions.saveVisitStat(newVisitStat);
    });

  return (
    <div className="styleHomePage">
      <header className="homePageHeader">
        <img src={"./src/images/japan-flag-medium.png"} alt="Japanese flag." />
        <h1>Nihongo tools</h1>
        <img
          src={"./src/images/united-kingdom-flag-medium.png"}
          alt="United kingdom flag."
        />
      </header>
      <div className="homePageContent">
        <aside className="introductionText">
          <ul>
            <li>
              Translate a little text in Japanese in english word by word.
            </li>
            <li>
              Search kanjis, hiraganas, katakanas, names, adjectives, verbs, and
              others words.
            </li>
            <li>
              Read informations about grammar rules, particles, counters for
              things, and name&apos;s suffix.
            </li>
            <li>Find examples of sentences grouped by topic.</li>
          </ul>
        </aside>
        <section className="homePageAnimation">
          <div className="japaneseText">私はフランス人です。</div>
          <button type="button" className="homePageFakeTranslateButton">
            Translate
          </button>
          <div className="tradJapaneseText">
            <div className="homePagePart">
              <p>私</p>
              <p>わたし</p>
              <p>I,me</p>
            </div>
            <div className="homePagePart">
              <p>は</p>
              <p>は</p>
              <p>Subject</p>
            </div>
            <div className="homePagePart">
              <p>フランス人</p>
              <p>フランスじん</p>
              <p>French person</p>
            </div>
            <div className="homePagePart">
              <p>です</p>
              <p>です</p>
              <p>To be</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveVisitStat: bindActionCreators(
        visitStatActions.saveVisitStat,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
