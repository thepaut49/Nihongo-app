package com.thepaut49.nihongo.mapper;

import com.thepaut49.nihongo.dto.KanjiMeaningDTO;
import com.thepaut49.nihongo.model.KanjiMeaning;

public class KanjiMeaningToDTOMapper {
	
	public static KanjiMeaningDTO map(KanjiMeaning kanji) {
		KanjiMeaningDTO kanjiMeaningDTO = new KanjiMeaningDTO();
		kanjiMeaningDTO.setId(kanji.getId());
		kanjiMeaningDTO.setMeaningNumber(kanji.getMeaningNumber());
		kanjiMeaningDTO.setVersion(kanji.getVersion());
		kanjiMeaningDTO.setMeaning(kanji.getMeaning());
		return kanjiMeaningDTO;
	}
	
	public static KanjiMeaning map(KanjiMeaningDTO kanjiMeaningDTO) {
		KanjiMeaning kanjiMeaning = new KanjiMeaning();
		kanjiMeaning.setId(kanjiMeaningDTO.getId());
		kanjiMeaning.setMeaningNumber(kanjiMeaningDTO.getMeaningNumber());
		kanjiMeaning.setVersion(kanjiMeaningDTO.getVersion());
		kanjiMeaning.setMeaning(kanjiMeaningDTO.getMeaning());
		return kanjiMeaning;
	}

}
