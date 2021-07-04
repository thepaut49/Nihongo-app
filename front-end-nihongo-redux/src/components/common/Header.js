import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = { color: "orange" };

  return (
    <>
      <nav className="navbarMenu">
        <NavLink activeStyle={activeStyle} to="/" exact>
          Home
        </NavLink>

        <NavLink activeStyle={activeStyle} to="/Translation">
          Translation
        </NavLink>

        <div className="dropdownMenu">
          <button className="dropbtn">
            Japanese characters
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdownMenu-content">
            <NavLink activeStyle={activeStyle} to="/kanjis">
              Kanjis
            </NavLink>

            <NavLink activeStyle={activeStyle} to="/hiraganas">
              Hiraganas
            </NavLink>

            <NavLink activeStyle={activeStyle} to="/katakanas">
              Katakanas
            </NavLink>
          </div>
        </div>

        <div className="dropdownMenu">
          <button className="dropbtn">Words</button>
          <div className="dropdownMenu-content">
            <NavLink activeStyle={activeStyle} to="/verbs">
              Verbs
            </NavLink>

            <NavLink activeStyle={activeStyle} to="/naAdjectives">
              Na-Adjectives
            </NavLink>

            <NavLink activeStyle={activeStyle} to="/iAdjectives">
              I-Adjectives
            </NavLink>

            <NavLink activeStyle={activeStyle} to="/names">
              Names
            </NavLink>

            <NavLink activeStyle={activeStyle} to="/words">
              Others
            </NavLink>
          </div>
        </div>
        <div className="dropdownMenu">
          <button className="dropbtn">Grammar</button>
          <div className="dropdownMenu-content">
            <NavLink activeStyle={activeStyle} to="/grammarRules">
              Grammar Rules
            </NavLink>

            <NavLink activeStyle={activeStyle} to="/particules">
              Particles
            </NavLink>

            <NavLink activeStyle={activeStyle} to="/counters">
              Counter
            </NavLink>

            <NavLink activeStyle={activeStyle} to="/suffixs">
              Suffix
            </NavLink>
          </div>
        </div>
        <NavLink activeStyle={activeStyle} to="/sentences">
          Sentences
        </NavLink>
        <NavLink activeStyle={activeStyle} to="/about">
          About
        </NavLink>
      </nav>
    </>
  );
}

export default Header;
