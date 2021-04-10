package com.thepaut49.nihongo.mapper.kanji;

import com.thepaut49.nihongo.dto.kanji.KanjiMeaningDTO;
import com.thepaut49.nihongo.model.kanji.KanjiMeaning;

public class KanjiMeaningToDTOMapper {
	
	public static KanjiMeaningDTO map(KanjiMeaning kanjiMeaning) {
		KanjiMeaningDTO kanjiMeaningDTO = new KanjiMeaningDTO();
		kanjiMeaningDTO.setKanjiId(kanjiMeaning.getKanjiId());
		kanjiMeaningDTO.setMeaningNumber(kanjiMeaning.getMeaningNumber());
		kanjiMeaningDTO.setVersion(kanjiMeaning.getVersion());
		kanjiMeaningDTO.setMeaning(kanjiMeaning.getMeaning());
		return kanjiMeaningDTO;
	}
	
	public static KanjiMeaning map(KanjiMeaningDTO kanjiMeaningDTO) {
		KanjiMeaning kanjiMeaning = new KanjiMeaning();
		kanjiMeaning.setKanjiId(kanjiMeaningDTO.getKanjiId());
		kanjiMeaning.setMeaningNumber(kanjiMeaningDTO.getMeaningNumber());
		kanjiMeaning.setVersion(kanjiMeaningDTO.getVersion());
		kanjiMeaning.setMeaning(kanjiMeaningDTO.getMeaning());
		return kanjiMeaning;
	}

}
