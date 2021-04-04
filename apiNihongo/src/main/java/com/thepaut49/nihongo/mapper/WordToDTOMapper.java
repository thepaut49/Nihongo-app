package com.thepaut49.nihongo.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.WordDTO;
import com.thepaut49.nihongo.dto.WordMeaningDTO;
import com.thepaut49.nihongo.model.Word;
import com.thepaut49.nihongo.model.WordMeaning;

public class WordToDTOMapper {
	
	public static WordDTO map(Word word) {
		WordDTO wordDTO = new WordDTO();
		wordDTO.setId(word.getId());
		wordDTO.setKanjis(word.getKanjis());
		wordDTO.setVersion(word.getVersion());
		wordDTO.setNumberOfUse(word.getNumberOfUse());
		wordDTO.setPronunciation(new HashSet<String>());
		String[] pronunciations = word.getPronunciation().split(";");
		for(int index = 0; index < pronunciations.length; index++) {
			wordDTO.getPronunciation().add(pronunciations[index].replace(";", ""));	
		}
		Set<WordMeaningDTO> meaningsTemp = word.getMeanings().stream().map(tempWord -> WordMeaningToDTOMapper.map(tempWord)).collect(Collectors.toSet());
		wordDTO.setMeanings(meaningsTemp);
		return wordDTO;
	}
	
	public static Word map(WordDTO wordDTO) {
		Word word = new Word();
		word.setId(wordDTO.getId());
		word.setKanjis(wordDTO.getKanjis());
		word.setVersion(wordDTO.getVersion());
		word.setNumberOfUse(wordDTO.getNumberOfUse());
		String pronunciationTemp = "";
		for(String pronunciation : wordDTO.getPronunciation()) {
			pronunciationTemp += pronunciation + ";";	
		}
		word.setPronunciation(pronunciationTemp);
		Set<WordMeaning> meaningsTemp = wordDTO.getMeanings().stream().map(tempVerb -> WordMeaningToDTOMapper.map(tempVerb)).collect(Collectors.toSet());
		word.setMeanings(meaningsTemp);
		return word;
	}

}
