package com.thepaut49.nihongo.mapper.kanji;

import com.thepaut49.nihongo.dto.kanji.KanjiPronunciationDTO;
import com.thepaut49.nihongo.model.kanji.KanjiPronunciation;


public class KanjiPronunciationToDTOMapper {
	
	public static KanjiPronunciationDTO map(KanjiPronunciation kanjiPronunciation) {
		KanjiPronunciationDTO kanjiPronunciationDTO = new KanjiPronunciationDTO();
		kanjiPronunciationDTO.setId(kanjiPronunciation.getId());
		kanjiPronunciationDTO.setPronunciationNumber(kanjiPronunciation.getPronunciationNumber());
		kanjiPronunciationDTO.setVersion(kanjiPronunciation.getVersion());
		kanjiPronunciationDTO.setPronunciation(kanjiPronunciation.getPronunciation());
		return kanjiPronunciationDTO;
	}
	
	public static KanjiPronunciation map(KanjiPronunciationDTO kanjiPronunciationDTO) {
		KanjiPronunciation kanjiPronunciation = new KanjiPronunciation();
		kanjiPronunciation.setId(kanjiPronunciationDTO.getId());
		kanjiPronunciation.setPronunciationNumber(kanjiPronunciationDTO.getPronunciationNumber());
		kanjiPronunciation.setVersion(kanjiPronunciationDTO.getVersion());
		kanjiPronunciation.setPronunciation(kanjiPronunciationDTO.getPronunciation());
		return kanjiPronunciation;
	}

}
