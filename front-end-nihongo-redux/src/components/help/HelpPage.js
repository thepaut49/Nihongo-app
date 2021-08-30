import React from "react";
import "./HelpPage.css";

function HelpPage() {
  return (
    <>
      <h2>Help</h2>
      <div className="help-container">
        <section id="toc_container">
          <a href="#how_to_use_translation_tool" className="toc_title">
            How to use the translation tool
          </a>

          <a href="#t1_1" className="toc_subtitle">
            How to use list of most used kanjis and words{" "}
          </a>

          <a href="#t1_2" className="toc_subtitle">
            How to use the text area with the buttons bellow
          </a>

          <a href="#t1_3" className="toc_subtitle">
            How to use the list of kanjis / list of parts / list of grammar
            rules
          </a>

          <a href="#t1_3_1" className="toc_subsubtitle">
            How to use the list of parts
          </a>

          <a href="#how_to_use_search_tool" className="toc_title">
            How to use the search tool
          </a>

          <a href="#t2_1" className="toc_subtitle">
            How to use filters
          </a>

          <a href="#t2_2" className="toc_subtitle">
            Pronunciation fields
          </a>
        </section>
        <section>
          <div className="howToUseSection">
            <h3
              id="how_to_use_translation_tool"
              className="howToUseSectionTitle"
            >
              How to use the translation tool
            </h3>
            <div>
              <div className="howToUse">
                <img
                  src={"./src/images/translation-tools.png"}
                  alt="Screen shot of the translation page."
                />
                <div>
                  <ul className="numbered-list">
                    <li>
                      A list of buttons that contains the most used kanjis or
                      words grouped by types.
                    </li>
                    <li>
                      Text to translate with some buttons for adding
                      punctuations, for searching words or kanjis and finally
                      for launching the translation or clearing the area below.
                    </li>
                    <li>List of kanjis and words in the text above</li>
                  </ul>
                </div>
              </div>

              <h4 id="t1_1">How to use list of most used kanjis and words </h4>
              <div className="howToUse">
                <img
                  src={"./src/images/most-used-words.png"}
                  alt="Screen shot of the translation page."
                />
                <div>
                  <ul className="numbered-list">
                    <li>
                      You can choose the types either kanji, i-adjective,
                      na-adjective, verbs, words or all.
                    </li>
                    <li>You can choose the number of buttons displayed.</li>
                    <li>
                      When you click on a button the content of the button is
                      added to the text to translate.
                    </li>
                    <li>
                      When the type is adjective or verb all the conjugation
                      possibilities are available.
                    </li>
                  </ul>
                </div>
              </div>

              <h4 id="t1_2">
                How to use the text area with the buttons bellow
              </h4>
              <div className="howToUse">
                <img
                  src={"./src/images/translation-area.png"}
                  alt="Text to translate + buttons."
                />
                <div>
                  <ul className="numbered-list">
                    <li>
                      You can type in the text area in romaji it will be
                      automatically translated in hiragana (for lowercase) or
                      katakana (for uppercase).
                    </li>
                    <li>
                      When you click on the buttons bellow the text area it will
                      add the content of the button in the text.
                    </li>
                    <li>
                      The quick search button will open a popup to help you to
                      find words or kanjis.
                    </li>
                  </ul>
                </div>
              </div>

              <h4 id="t1_3">
                How to use the list of kanjis / list of parts / list of grammar
                rules
              </h4>
              <div className="howToUse">
                <img
                  src={"./src/images/listOfParts.png"}
                  alt="List of kanjis, parts and grammar rules identified"
                />
                <div>
                  <ul className="numbered-list">
                    <li>
                      When you click on list of kanjis it will display the list
                      of kanjis identified in the text.
                    </li>
                    <li>
                      When you click on list of words it will display the list
                      of words identified in the text.
                    </li>
                    <li>
                      When you click on list of grammar rules it will display
                      the list of grammar rules identified in the text.
                    </li>
                    <li>
                      For each part identified, we can see the pronunciation in
                      hiragana, katakana, every possible meanings and
                      pronunciations, and the type of the part.
                    </li>
                    <li>
                      When you click the button search the translation will
                      begin and the words and kanjis identified will appear
                      bellow. The button clear will clear the area bellow.
                    </li>
                  </ul>
                </div>
              </div>

              <h5 id="t1_3_1">How to use the list of parts</h5>
              <div className="howToUse">
                <img src={"./src/images/part.png"} alt="List of parts" />
                <div>
                  <ul className="numbered-list">
                    <li>
                      For each part you can choose the pronunciation and the
                      meaning that fits the context.
                    </li>
                    <li>
                      Each part has a type <strong>unknonwn</strong>,{" "}
                      <strong>verb</strong>, <strong>word</strong>,{" "}
                      <strong>i-adjective</strong>,{" "}
                      <strong>na-adjective</strong>, <strong>name</strong>,{" "}
                      <strong>name suffix</strong>, <strong>particle</strong>,{" "}
                      <strong>counter</strong>
                    </li>
                    <li>
                      <button className="btn btn-primary">Split</button> : this
                      button is used to split the unknown part into two parts,
                      it will help you to isolate some parts
                    </li>
                    <li>
                      <button className="btn btn-primary">Unknown</button> :
                      this button will correct bad association, it will change
                      the type of the part to unknown
                    </li>
                    <li>
                      <button className="btn btn-primary">Candidates</button> :
                      in the case where the application has found mutliple
                      association possible this button will show a pop up to
                      select the association corresponding to the context
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="howToUseSection">
            <h3 id="how_to_use_search_tool" className="howToUseSectionTitle">
              How to use the search tool
            </h3>
            <h4 id="t2_1">How to use filters </h4>
            <div className="howToUse">
              <img
                src={"./src/images/filters.png"}
                alt="Screenshots filters."
              />
              <div>
                <ul className="numbered-list">
                  <li>
                    In the kanjis search tools there are 7 filters, a kanji
                    filter, a pronunciation filter (see section below), a
                    meaning filter, you can also filter by number of strokes,
                    finally you can filter with little component of the kanji
                    called radicals.
                  </li>
                  <li>
                    In the verb search tool there are 4 filters, a filter for
                    the neutral form of the verb, a filter for a possible
                    pronunciation, a filter for a possible meaning and finally
                    one for the group of the verb (Ichidan, Godan, Irregulars).
                  </li>
                  <li>
                    For all the other types of words there are 3 filters, one to
                    filter with kanjis, one to filter by a possible
                    pronunciation, and finally a filter for a possible meaning.
                  </li>
                </ul>
              </div>
            </div>

            <h4 id="t2_2">Pronunciation fields</h4>
            <div className="helpPronunciationFields">
              <p>
                All the pronunciation criteria fields in filters and in the
                translation in this app translate automatically romaji into
                hiragana and katakana. The others pronunciation fields have a
                button to translate romaji into hiragana and katakana. You have
                to write in lowercase for hiragana and uppercase for katakana.
              </p>
              <p>For these eight hiragana and katakana you have to type :</p>
              <ul>
                <li>ん: -n</li>
                <li>ぢ: dji</li>
                <li>づ: dzu</li>
                <li>ン: -N</li>
                <li>ヂ: DJI</li>
                <li>ヅ: DZU</li>
                <li>っ: tsu=</li>
                <li>ッ: TSU=</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HelpPage;
