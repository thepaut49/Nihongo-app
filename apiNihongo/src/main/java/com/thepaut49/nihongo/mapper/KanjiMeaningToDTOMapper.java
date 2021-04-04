package com.thepaut49.nihongo.mapper;

import com.thepaut49.nihongo.dto.KanjiMeaningDTO;
import com.thepaut49.nihongo.model.KanjiMeaning;

public class KanjiMeaningToDTOMapper {
	
	public static KanjiMeaningDTO map(KanjiMeaning kanjiMeaning) {
		KanjiMeaningDTO kanjiMeaningDTO = new KanjiMeaningDTO();
		kanjiMeaningDTO.setId(kanjiMeaning.getId());
		kanjiMeaningDTO.setMeaningNumber(kanjiMeaning.getMeaningNumber());
		kanjiMeaningDTO.setVersion(kanjiMeaning.getVersion());
		kanjiMeaningDTO.setMeaning(kanjiMeaning.getMeaning());
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
