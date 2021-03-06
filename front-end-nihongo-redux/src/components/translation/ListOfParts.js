import React, { useState, useEffect } from "react";
import Part from "./Part";
import Kanji from "./Kanji";
import GrammarRule from "../grammarrule/GrammarRule";
import PropTypes from "prop-types";

const listOfPartsStyle = {
  height: "100%",
};

const showListOfParts = (event) => {
  event.preventDefault();
  let listOfPartsToHide = document.getElementById("ListOfPartsToHide");
  let listOfKanjisToHide = document.getElementById("ListOfKanjisToHide");
  let listOfGrammarRulesToHide = document.getElementById(
    "ListOfGrammarRulesToHide"
  );
  listOfKanjisToHide.style.display = "none";
  listOfPartsToHide.style.display = "grid";
  listOfGrammarRulesToHide.style.display = "none";
};

const showListOfKanjis = (event) => {
  event.preventDefault();
  let listOfPartsToHide = document.getElementById("ListOfPartsToHide");
  let listOfKanjisToHide = document.getElementById("ListOfKanjisToHide");
  let listOfGrammarRulesToHide = document.getElementById(
    "ListOfGrammarRulesToHide"
  );
  listOfPartsToHide.style.display = "none";
  listOfKanjisToHide.style.display = "block";
  listOfGrammarRulesToHide.style.display = "none";
};

const showListOfGrammarRules = (event) => {
  event.preventDefault();
  let listOfPartsToHide = document.getElementById("ListOfPartsToHide");
  let listOfKanjisToHide = document.getElementById("ListOfKanjisToHide");
  let listOfGrammarRulesToHide = document.getElementById(
    "ListOfGrammarRulesToHide"
  );
  listOfPartsToHide.style.display = "none";
  listOfKanjisToHide.style.display = "none";
  listOfGrammarRulesToHide.style.display = "block";
};

const listOfKanjisToHideStyle = {
  display: "none",
  padding: "0.4em",
  margin: "0.4em",
  gap: "0.2em",
};

const listOfPartsToHideStyle = {
  display: "grid",
  padding: "0.4em",
  margin: "0.4em",
  gap: "0.2em",
  gridTemplateColumns: "repeat(auto-fill,15em)",
};

const listOfGrammarRulesToHideStyle = {
  display: "none",
  padding: "0.4em",
  margin: "0.4em",
  gap: "0.2em",
};

const showbuttonGroupStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "1em",
};

const ListOfParts = (props) => {
  const [listOfParts, setListOfParts] = useState(props.list);
  const listOfKanjis = props.listOfKanjis;
  const listOfGrammarRules = props.listOfGrammarRules;

  useEffect(() => {
    setListOfParts(props.list);
  }, [props.list]);

  const handlePartChange = (part) => {
    if (part) {
      for (let index = 0; index < listOfParts.length; index++) {
        if (listOfParts[index].currentIndex === part.currentIndex) {
          listOfParts[index] = part;
          break;
        }
      }
      setListOfParts(listOfParts);
    }
  };

  const handleSplitPart = (oldPart, firstPart, secondPart) => {
    if (oldPart) {
      let newList = [];
      listOfParts.forEach((part) => {
        if (part.kanjis === oldPart.kanjis) {
          newList.push(firstPart);
          newList.push(secondPart);
        } else {
          newList.push(part);
        }
      });
      setListOfParts(newList);
      props.onSplitPart(newList);
    }
  };

  return (
    <div id="ListOfParts" style={listOfPartsStyle}>
      <div style={showbuttonGroupStyle}>
        <button
          id="buttonListOfParts"
          onClick={showListOfParts}
          className="showListOfThingButtons"
        >
          List of parts
        </button>

        <button
          id="buttonListOfKanji"
          onClick={showListOfKanjis}
          className="showListOfThingButtons"
        >
          List of Kanjis
        </button>

        <button
          id="buttonListOfGrammarRules"
          onClick={showListOfGrammarRules}
          className="showListOfThingButtons"
        >
          List of grammar rules
        </button>
      </div>

      <div id="ListOfPartsToHide" style={listOfPartsToHideStyle}>
        {listOfParts &&
          listOfParts.length > 0 &&
          listOfParts.map((part, index) => {
            return (
              <Part
                part={part}
                key={index}
                onPartChange={handlePartChange}
                onSplitPart={handleSplitPart}
                onUnknownTransform={props.onUnknownTransform}
              />
            );
          })}
      </div>

      <div id="ListOfKanjisToHide" style={listOfKanjisToHideStyle}>
        {listOfKanjis &&
          listOfKanjis.length > 0 &&
          listOfKanjis.map((kanji, index) => {
            return <Kanji kanji={kanji} key={index} />;
          })}
      </div>

      <div id="ListOfGrammarRulesToHide" style={listOfGrammarRulesToHideStyle}>
        {listOfGrammarRules &&
          listOfGrammarRules.length > 0 &&
          listOfGrammarRules.map((grammarRule, index) => {
            return <GrammarRule grammarRule={grammarRule} key={index} />;
          })}
      </div>
    </div>
  );
};

ListOfParts.propTypes = {
  list: PropTypes.arrayOf(Object).isRequired,
  listOfKanjis: PropTypes.arrayOf(Object).isRequired,
  listOfGrammarRules: PropTypes.arrayOf(Object).isRequired,
  onSplitPart: PropTypes.func.isRequired,
  onUnknownTransform: PropTypes.func.isRequired,
};

export default ListOfParts;
