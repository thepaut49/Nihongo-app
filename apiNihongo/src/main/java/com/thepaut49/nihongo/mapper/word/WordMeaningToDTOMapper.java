package com.thepaut49.nihongo.mapper.word;

import com.thepaut49.nihongo.dto.word.WordMeaningDTO;
import com.thepaut49.nihongo.model.word.WordMeaning;


public class WordMeaningToDTOMapper {
	
	public static WordMeaningDTO map(WordMeaning wordMeaning) {
		WordMeaningDTO wordMeaningDTO = new WordMeaningDTO();
		wordMeaningDTO.setWordId(wordMeaning.getWordId());
		wordMeaningDTO.setMeaningNumber(wordMeaning.getMeaningNumber());
		wordMeaningDTO.setVersion(wordMeaning.getVersion());
		wordMeaningDTO.setMeaning(wordMeaning.getMeaning());
		return wordMeaningDTO;
	}
	
	public static WordMeaning map(WordMeaningDTO wordMeaningDTO) {
		WordMeaning wordMeaning = new WordMeaning();
		wordMeaning.setWordId(wordMeaningDTO.getWordId());
		wordMeaning.setMeaningNumber(wordMeaningDTO.getMeaningNumber());
		wordMeaning.setVersion(wordMeaningDTO.getVersion());
		wordMeaning.setMeaning(wordMeaningDTO.getMeaning());
		return wordMeaning;
	}

}
