package com.thepaut49.nihongo.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.KanjiDTO;
import com.thepaut49.nihongo.dto.KanjiMeaningDTO;
import com.thepaut49.nihongo.model.Kanji;
import com.thepaut49.nihongo.model.KanjiMeaning;

public class KanjiToDTOMapper {
	
	public static KanjiDTO map(Kanji kanji) {
		KanjiDTO kanjiDTO = new KanjiDTO();
		kanjiDTO.setId(kanji.getId());
		kanjiDTO.setKanji(kanji.getKanji());
		kanjiDTO.setRadicals(kanji.getRadicals());
		kanjiDTO.setStrokeNumber(kanji.getStrokeNumber());
		kanjiDTO.setVersion(kanji.getVersion());
		kanjiDTO.setNumberOfUse(kanji.getNumberOfUse());
		
		kanjiDTO.setPronunciation(new HashSet<String>());
		String[] pronunciations = kanji.getPronunciation().split(";");
		for(int index = 0; index < pronunciations.length; index++) {
			kanjiDTO.getPronunciation().add(pronunciations[index].replace(";", ""));	
		}
		
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
		
		String pronunciationTemp = "";
		for(String pronunciation : kanjiDTO.getPronunciation()) {
			pronunciationTemp += pronunciation + ";";	
		}
		kanji.setPronunciation(pronunciationTemp);
			
		Set<KanjiMeaning> meaningsTemp = kanjiDTO.getMeanings().stream().map(tempKanji -> KanjiMeaningToDTOMapper.map(tempKanji)).collect(Collectors.toSet());
		kanji.setMeanings(meaningsTemp);
		return kanji;
	}

}
