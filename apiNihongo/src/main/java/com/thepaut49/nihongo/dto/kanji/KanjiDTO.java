package com.thepaut49.nihongo.dto.kanji;

import java.util.Set;

import javax.persistence.Version;

public class KanjiDTO  {

	private Integer id;

	private char kanji;

	private Set<KanjiPronunciationDTO> pronunciations;
	
	private Set<KanjiMeaningDTO> meanings;

	private Integer strokeNumber;

	private String radicals;
	
	private Integer numberOfUse;
	
	@Version
	private int version;
	
	/*** getter / setter ***/

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public char getKanji() {
		return kanji;
	}

	public void setKanji(char kanji) {
		this.kanji = kanji;
	}

	public Set<KanjiPronunciationDTO> getPronunciations() {
		return pronunciations;
	}

	public void setPronunciations(Set<KanjiPronunciationDTO> pronunciations) {
		this.pronunciations = pronunciations;
	}
	
	public Set<KanjiMeaningDTO> getMeanings() {
		return meanings;
	}

	public void setMeanings(Set<KanjiMeaningDTO> meanings) {
		this.meanings = meanings;
	}

	public Integer getStrokeNumber() {
		return strokeNumber;
	}

	public void setStrokeNumber(Integer strokeNumber) {
		this.strokeNumber = strokeNumber;
	}

	public String getRadicals() {
		return radicals;
	}

	public void setRadicals(String radicals) {
		this.radicals = radicals;
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
