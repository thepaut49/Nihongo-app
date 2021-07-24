import React from "react";
import "./HelpPage.css";

function HelpPage() {
  return (
    <>
      <h2>Help</h2>
      <div id="toc_container">
        <p className="toc_title">Contents</p>
        <ul className="toc_list">
          <li>
            <a href="#how_to_use_translation_tool">
              How to use the translation tool
            </a>
          </li>
          <li>
            <a href="#how_to_use_search_tool">How to use the search tool</a>
          </li>
        </ul>
      </div>
      <div className="styleHomePage">
        <div className="howToUseSection">
          <div
            id="how_to_use_translation_tool"
            className="howToUseSectionTitle"
          >
            How to use the translation tool
          </div>
          <div>
            <div className="howToUse">
              <img
                src={"./src/images/berserk.jpg"}
                alt="Screen shot of the translation page."
              />
              <div>
                <ol>
                  <li>
                    A list of buttons that contains the most used kanjis or
                    words grouped by types.
                  </li>
                  <li>
                    Text to translate with some buttons for adding punctuations,
                    for searching words or kanjis and finally for launching the
                    translation or clearing the area below.
                  </li>
                  <li>List of kanjis and words in the text above</li>
                </ol>
              </div>
            </div>

            <h3>How to use list of most used kanjis and words </h3>
            <div className="howToUse">
              <img
                src={"./src/images/berserk.jpg"}
                alt="Screen shot of the translation page."
              />
              <div>
                <ol>
                  <li>
                    You can choose the types either kanji or i-adjective,
                    na-adjective, verbs, words.
                  </li>
                  <li>You can choose the number of buttons displayed.</li>
                  <li>
                    When you click on a button the content of the button is
                    added to the text to translate.
                  </li>
                  <li>
                    When the type is an adjective or a verbs all the conjugation
                    possibilities are available.
                  </li>
                </ol>
              </div>
            </div>

            <h3>How to use the text area with the buttons bellow</h3>
            <div className="howToUse">
              <img
                src={"./src/images/berserk.jpg"}
                alt="Text to translate + buttons."
              />
              <div>
                <ol>
                  <li>
                    You can type in the text area in romaji it will be
                    automatically translated in hiragana (for lowercase) or
                    katakana (for uppercase).
                  </li>
                  <li>
                    When you click on the buttons bellow the text area it will
                    add the content of the button in the text. The quick search
                    button will open a popup to help you to find words or
                    kanjis.
                  </li>
                  <li>
                    When you click the button search the translation will begin
                    and the words and kanjis identified will appear bellow. The
                    button clear will clear the area bellow.
                  </li>
                </ol>
              </div>
            </div>

            <h3>
              How to use the list of kanjis and words identified in the text
            </h3>
            <div className="howToUse">
              <img
                src={"./src/images/berserk.jpg"}
                alt="List of kanjis, words and grammar rules identified"
              />
              <div>
                <ol>
                  <li>
                    When you click on list of kanjis it will display the list of
                    kanjis identified in the text. When you click on list of
                    words it will display the list of words identified in the
                    text. When you click on list of grammar rules it will
                    display the list of grammar rules identified in the text.
                  </li>
                  <li>
                    For each part identified, we can see the pronunciation in
                    hiragana, katakana, every possible meanings and
                    pronunciations, and the type of the word.
                  </li>
                  <li>
                    When you click the button search the translation will begin
                    and the words and kanjis identified will appear bellow. The
                    button clear will clear the area bellow.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="howToUseSection">
          <div id="how_to_use_search_tool" className="howToUseSectionTitle">
            How to use the search tool
          </div>
          <div className="howToUse"></div>

          <h3>Pronunciation fields</h3>
          <p>
            All the pronunciation criteria fields in filters and in the
            translation in this app translate automatically romaji into hiragana
            and katakana. The others pronunciation fields have a button to
            translate romaji into hiragana and katakana.
          </p>
          <span>For these six hiragana and katakana you have to type :</span>
          <ul>
            <li>ん: -n</li>
            <li>ぢ: dji</li>
            <li>づ: dzu</li>
            <li>ン: -N</li>
            <li>ヂ: DJI</li>
            <li>ヅ: DZU</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default HelpPage;
