import React from "react";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
/*
import NotFoundPage from "./common/NotFoundPage";
import ManageKanjiPage from "./kanji/ManageKanjiPage";
import VisualizeKanjiPage from "./kanji/VisualizeKanjiPage";
import KanjisPage from "./kanji/KanjisPage";
import ManageVerbPage from "./verb/ManageVerbPage";
import VisualizeVerbPage from "./verb/VisualizeVerbPage";
import VerbsPage from "./verb/VerbsPage";
import ManageNaAdjectivePage from "./naAdjective/ManageNaAdjectivePage";
import VisualizeNaAdjectivePage from "./naAdjective/VisualizeNaAdjectivePage";
import NaAdjectivesPage from "./naAdjective/NaAdjectivesPage";
import VisualizeIAdjectivePage from "./iAdjective/VisualizeIAdjectivePage";
import ManageIAdjectivePage from "./iAdjective/ManageIAdjectivePage";
import IAdjectivesPage from "./iAdjective/IAdjectivesPage";
import ManageNamePage from "./name/ManageNamePage";
import VisualizeNamePage from "./name/VisualizeNamePage";
import NamesPage from "./name/NamesPage";
import ManageWordPage from "./word/ManageWordPage";
import VisualizeWordPage from "./word/VisualizeWordPage";
import WordsPage from "./word/WordsPage";
import ManageSentencePage from "./sentence/ManageSentencePage";
import VisualizeSentencePage from "./sentence/VisualizeSentencePage";
import SentencesPage from "./sentence/SentencesPage";
import ManageParticulePage from "./particule/ManageParticulePage";
import VisualizeParticulePage from "./particule/VisualizeParticulePage";
import ParticulesPage from "./particule/ParticulesPage";
import ManageGrammarRulePage from "./grammarrule/ManageGrammarRulePage";
import VisualizeGrammarRulePage from "./grammarrule/VisualizeGrammarRulePage";
import GrammarRulesPage from "./grammarrule/GrammarRulesPage";*/
import VisualizeCounterPage from "./counter/VisualizeCounterPage";
import ManageCounterPage from "./counter/ManageCounterPage";
import CountersPage from "./counter/CountersPage";
/*
import VisualizeSuffixPage from "./suffix/VisualizeSuffixPage";
import ManageSuffixPage from "./suffix/ManageSuffixPage";
import SuffixsPage from "./suffix/SuffixsPage";
import HiraganasPage from "./hiragana/HiraganasPage";
import KatakanasPage from "./katakana/KatakanasPage";
import Translation from "./translation/Translation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./common/ScrollToTop";
import ButtonScrollToTop from "./common/ButtonScrollToTop";*/
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/counters" component={CountersPage} />
          <Route
            path="/counter/visualize/:kanjis"
            component={VisualizeCounterPage}
          />
          <Route path="/counter/modify/:kanjis" component={ManageCounterPage} />
          <Route path="/counter/create" component={ManageCounterPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    </>
  );
}

export default App;
