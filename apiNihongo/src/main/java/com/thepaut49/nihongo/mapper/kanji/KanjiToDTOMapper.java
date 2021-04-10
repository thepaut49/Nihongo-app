package com.thepaut49.nihongo.mapper.kanji;

import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.kanji.KanjiDTO;
import com.thepaut49.nihongo.dto.kanji.KanjiMeaningDTO;
import com.thepaut49.nihongo.dto.kanji.KanjiPronunciationDTO;
import com.thepaut49.nihongo.model.kanji.Kanji;
import com.thepaut49.nihongo.model.kanji.KanjiMeaning;
import com.thepaut49.nihongo.model.kanji.KanjiPronunciation;

public class KanjiToDTOMapper {
	
	public static KanjiDTO map(Kanji kanji) {
		KanjiDTO kanjiDTO = new KanjiDTO();
		kanjiDTO.setId(kanji.getId());
		kanjiDTO.setKanji(kanji.getKanji());
		kanjiDTO.setRadicals(kanji.getRadicals());
		kanjiDTO.setStrokeNumber(kanji.getStrokeNumber());
		kanjiDTO.setVersion(kanji.getVersion());
		kanjiDTO.setNumberOfUse(kanji.getNumberOfUse());
		Set<KanjiPronunciationDTO> pronunciationsTemp = kanji.getPronunciations().stream().map(tempKanji -> KanjiPronunciationToDTOMapper.map(tempKanji)).collect(Collectors.toSet());
		kanjiDTO.setPronunciations(pronunciationsTemp);
		Set<KanjiMeaningDTO> meaningsTemp = kanji.getMeanings().stream().map(tempKanji -> KanjiMeaningToDTOMapper.map(tempKanji)).collect(Collectors.toSet());
		kanjiDTO.setMeanings(meaningsTemp);
		return kanjiDTO;
	}
	
	public static Kanji map(KanjiDTO kanjiDTO) {
		Kanji kanji = new Kanji();
		kanji.setId(kanjiDTO.getId());
		kanji.setKanji(kanjiDTO.getKanji());
		kanji.setRadicals(kanjiDTO.getRadicals());
		kanji.setStrokeNumber(kanjiDTO.getStrokeNumber());
		kanji.setVersion(kanjiDTO.getVersion());
		kanji.setNumberOfUse(kanjiDTO.getNumberOfUse());
		Set<KanjiPronunciation> pronunciationsTemp = kanjiDTO.getPronunciations().stream().map(tempKanji -> KanjiPronunciationToDTOMapper.map(tempKanji)).collect(Collectors.toSet());
		kanji.setPronunciations(pronunciationsTemp);
		Set<KanjiMeaning> meaningsTemp = kanjiDTO.getMeanings().stream().map(tempKanji -> KanjiMeaningToDTOMapper.map(tempKanji)).collect(Collectors.toSet());
		kanji.setMeanings(meaningsTemp);
		return kanji;
	}

}
