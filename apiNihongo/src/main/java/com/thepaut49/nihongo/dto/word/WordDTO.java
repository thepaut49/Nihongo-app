package com.thepaut49.nihongo.dto.word;

import java.util.Set;

public class WordDTO {

	private Long id;
	
	private String kanjis;
	
	private Set<WordPronunciationDTO> pronunciations;
	
	private Set<WordMeaningDTO> meanings;
	
	private Integer numberOfUse;
	
	private int version;
	
	/*** getter / setter ***/

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getKanjis() {
		return kanjis;
	}

	public void setKanjis(String neutralForm) {
		this.kanjis = neutralForm;
	}

	public Set<WordPronunciationDTO> getPronunciations() {
		return pronunciations;
	}

	public void setPronunciations(Set<WordPronunciationDTO> pronunciations) {
		this.pronunciations = pronunciations;
	}

	public Set<WordMeaningDTO> getMeanings() {
		return meanings;
	}

	public void setMeanings(Set<WordMeaningDTO> meanings) {
		this.meanings = meanings;
	}
	
	public Integer getNumberOfUse() {
		return numberOfUse;
	}

	public void setNumberOfUse(Integer numberOfUse) {
		this.numberOfUse = numberOfUse;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
}
