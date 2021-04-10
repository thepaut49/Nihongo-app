package com.thepaut49.nihongo.mapper.word;

import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.word.WordDTO;
import com.thepaut49.nihongo.dto.word.WordMeaningDTO;
import com.thepaut49.nihongo.dto.word.WordPronunciationDTO;
import com.thepaut49.nihongo.model.word.Word;
import com.thepaut49.nihongo.model.word.WordMeaning;
import com.thepaut49.nihongo.model.word.WordPronunciation;

public class WordToDTOMapper {
	
	public static WordDTO map(Word word) {
		WordDTO wordDTO = new WordDTO();
		wordDTO.setId(word.getId());
		wordDTO.setKanjis(word.getKanjis());
		wordDTO.setVersion(word.getVersion());
		wordDTO.setNumberOfUse(word.getNumberOfUse());
		Set<WordPronunciationDTO> pronunciationsTemp = word.getPronunciations().stream().map(tempWord -> WordPronunciationToDTOMapper.map(tempWord)).collect(Collectors.toSet());
		wordDTO.setPronunciations(pronunciationsTemp);
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
		Set<WordPronunciation> pronunciationsTemp = wordDTO.getPronunciations().stream().map(tempWord -> WordPronunciationToDTOMapper.map(tempWord)).collect(Collectors.toSet());
		word.setPronunciations(pronunciationsTemp);
		Set<WordMeaning> meaningsTemp = wordDTO.getMeanings().stream().map(tempVerb -> WordMeaningToDTOMapper.map(tempVerb)).collect(Collectors.toSet());
		word.setMeanings(meaningsTemp);
		return word;
	}

}
