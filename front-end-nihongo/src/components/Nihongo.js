import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";
import { Route, Switch, Redirect } from "react-router-dom";
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
import GrammarRulesPage from "./grammarrule/GrammarRulesPage";
import VisualizeCounterPage from "./counter/VisualizeCounterPage";
import ManageCounterPage from "./counter/ManageCounterPage";
import CountersPage from "./counter/CountersPage";
import VisualizeSuffixPage from "./suffix/VisualizeSuffixPage";
import ManageSuffixPage from "./suffix/ManageSuffixPage";
import SuffixsPage from "./suffix/SuffixsPage";
import HiraganasPage from "./hiragana/HiraganasPage";
import KatakanasPage from "./katakana/KatakanasPage";
import Translation from "./translation/Translation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ScrollToTop from "./common/ScrollToTop";
import ButtonScrollToTop from "./common/ButtonScrollToTop";
import Secured from "./common/keycloak/Secured";

function Nihongo() {
  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar />
      <ScrollToTop />
      <ButtonScrollToTop />
      <div className="app-container">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/kanjis" component={KanjisPage} />
          <Route
            path="/kanji/visualize/:kanji"
            component={VisualizeKanjiPage}
          />
          <Route path="/kanji/modify/:kanji" component={ManageKanjiPage} />
          <Route path="/kanji/create" component={ManageKanjiPage} />
          <Route path="/verbs" component={VerbsPage} />
          <Route path="/verb/modify/:neutralForm" component={ManageVerbPage} />
          <Route
            path="/verb/visualize/:neutralForm"
            component={VisualizeVerbPage}
          />
          <Route path="/verb/create" component={ManageVerbPage} />
          <Route path="/naAdjectives" component={NaAdjectivesPage} />
          <Route
            path="/naAdjective/modify/:kanjis"
            component={ManageNaAdjectivePage}
          />
          <Route
            path="/naAdjective/visualize/:kanjis"
            component={VisualizeNaAdjectivePage}
          />
          <Route path="/naAdjective/create" component={ManageNaAdjectivePage} />
          <Route path="/iAdjectives" component={IAdjectivesPage} />
          <Route
            path="/iAdjective/visualize/:kanjis"
            component={VisualizeIAdjectivePage}
          />
          <Route
            path="/iAdjective/modify/:kanjis"
            component={ManageIAdjectivePage}
          />
          <Route path="/iAdjective/create" component={ManageIAdjectivePage} />
          <Route path="/names" component={NamesPage} />
          <Route path="/name/modify/:kanjis" component={ManageNamePage} />
          <Route path="/name/visualize/:kanjis" component={VisualizeNamePage} />
          <Route path="/name/create" component={ManageNamePage} />
          <Route path="/words" component={WordsPage} />
          <Route path="/word/modify/:kanjis" component={ManageWordPage} />
          <Route path="/word/visualize/:kanjis" component={VisualizeWordPage} />
          <Route path="/word/create" component={ManageWordPage} />
          <Route path="/particules" component={ParticulesPage} />
          <Route
            path="/particule/modify/:kanjis"
            component={ManageParticulePage}
          />
          <Route
            path="/particule/visualize/:kanjis"
            component={VisualizeParticulePage}
          />
          <Route path="/particule/create" component={ManageParticulePage} />
          <Route path="/grammarRules" component={GrammarRulesPage} />
          <Route
            path="/grammarRule/modify/:title"
            component={ManageGrammarRulePage}
          />
          <Route
            path="/grammarRule/visualize/:title"
            component={VisualizeGrammarRulePage}
          />
          <Route path="/grammarRule" component={ManageGrammarRulePage} />
          <Route path="/sentences" component={SentencesPage} />
          <Route
            path="/sentence/modify/:kanjis"
            component={ManageSentencePage}
          />
          <Route
            path="/sentence/visualize/:kanjis"
            component={VisualizeSentencePage}
          />
          <Route path="/sentence/create" component={ManageSentencePage} />
          <Route path="/translation" component={Translation} />
          <Route path="/hiraganas" component={HiraganasPage} />
          <Route path="/katakanas" component={KatakanasPage} />
          <Route path="/counters" component={CountersPage} />
          <Route
            path="/counter/visualize/:kanjis"
            component={VisualizeCounterPage}
          />
          <Route path="/counter/modify/:kanjis" component={ManageCounterPage} />
          <Route path="/counter/create" component={ManageCounterPage} />
          <Route path="/suffixs" component={SuffixsPage} />
          <Route
            path="/suffix/visualize/:kanjis"
            component={VisualizeSuffixPage}
          />
          <Route path="/suffix/modify/:kanjis" component={ManageSuffixPage} />
          <Route path="/suffix/create" component={ManageSuffixPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/secured" component={Secured} />
          <Redirect from="/about-page" to="/about" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
}

export default Nihongo;
