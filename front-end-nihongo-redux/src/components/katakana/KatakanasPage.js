import React from "react";
import { katakanaMapToDisplay } from "../common/katakana";

const hiraganaListStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5,max-content)",
};

const hiraganaStyle = {
  display: "grid",
  grid: "1fr 1fr / 3.5em",
  fontSize: "xx-large",
  backgroundColor: "var(--fourth-bg-color)",
  margin: "0.5em",
  padding: "0.5em",
  textAlign: "center",
  fontWeight: "bold",
  borderRadius: "10px",
};

const KatakanasPage = () => {
  const listOfHiraganaKeys = [];
  const listOfHiraganaValues = [];
  katakanaMapToDisplay.forEach((values) => {
    listOfHiraganaKeys.push(values[0]);
    listOfHiraganaValues.push(values[1]);
  });

  return (
    <section className="pageSection">
      <h2>Katakana (片仮名, カタカナ)</h2>
      <div style={hiraganaListStyle}>
        {listOfHiraganaKeys.map((hiraganaKey, index) => {
          return (
            <div style={hiraganaStyle} key={index}>
              <div>{hiraganaKey}</div>
              <div>{listOfHiraganaValues[index]}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default KatakanasPage;
