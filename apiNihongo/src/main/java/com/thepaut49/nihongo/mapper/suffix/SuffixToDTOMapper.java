package com.thepaut49.nihongo.mapper.suffix;

import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.suffix.SuffixDTO;
import com.thepaut49.nihongo.dto.suffix.SuffixPronunciationDTO;
import com.thepaut49.nihongo.model.suffix.Suffix;
import com.thepaut49.nihongo.model.suffix.SuffixPronunciation;

public class SuffixToDTOMapper {
	
	public static SuffixDTO map(Suffix suffix) {
		SuffixDTO suffixDTO = new SuffixDTO();
		suffixDTO.setId(suffix.getId());
		suffixDTO.setKanjis(suffix.getKanjis());
		suffixDTO.setVersion(suffix.getVersion());
		Set<SuffixPronunciationDTO> pronunciationsTemp = suffix.getPronunciations().stream().map(tempSuffix -> SuffixPronunciationToDTOMapper.map(tempSuffix)).collect(Collectors.toSet());
		suffixDTO.setPronunciations(pronunciationsTemp);
		suffixDTO.setUse(suffix.getUse());
		suffixDTO.setSummary(suffix.getSummary());
		return suffixDTO;
	}
	
	public static Suffix map(SuffixDTO suffixDTO) {
		Suffix suffix = new Suffix();
		suffix.setId(suffixDTO.getId());
		suffix.setKanjis(suffixDTO.getKanjis());
		suffix.setVersion(suffixDTO.getVersion());
		Set<SuffixPronunciation> pronunciationsTemp = suffixDTO.getPronunciations().stream().map(tempSuffix -> SuffixPronunciationToDTOMapper.map(tempSuffix)).collect(Collectors.toSet());
		suffix.setPronunciations(pronunciationsTemp);
		suffix.setUse(suffixDTO.getUse());
		suffix.setSummary(suffixDTO.getSummary());
		return suffix;
	}

}
