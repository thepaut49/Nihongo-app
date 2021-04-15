import React, { useState, useEffect } from "react";
import suffixStore from "../../stores/suffixStore";
import "./SuffixsPage.css";
import SuffixList from "./SuffixList";
import { Link } from "react-router-dom";
import { loadSuffixs, deleteSuffix } from "../../actions/suffixActions";

function SuffixsPage(props) {
  const [suffixs, setSuffixs] = useState(suffixStore.getSuffixs());

  useEffect(() => {
    suffixStore.addChangeListener(onChange);
    if (suffixStore.getSuffixs().length === 0) loadSuffixs();
    return function () {
      suffixStore.removeChangeListener(onChange); //cleanup on unmount
    };
  }, [suffixs.length]);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  function onChange() {
    setSuffixs(suffixStore.getSuffixs());
  }

  return (
    <div className="suffixsPage">
      <h2>Suffixs</h2>
      <Link className="btn btn-primary" to="/suffix/create">
        Add Suffix
      </Link>
      <SuffixList suffixs={suffixs} deleteSuffix={deleteSuffix} />
    </div>
  );
}

export default SuffixsPage;
