package com.thepaut49.nihongo.dto.name;

import java.util.Set;

public class NameDTO {

	private Integer id;
	
	private String kanjis;
	
	private Set<NamePronunciationDTO> pronunciations;
	
	private Set<NameMeaningDTO> meanings;
	
	private Integer numberOfUse;
	
	private int version;
	
	/*** getter / setter ***/

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getKanjis() {
		return kanjis;
	}

	public void setKanjis(String neutralForm) {
		this.kanjis = neutralForm;
	}

	public Set<NamePronunciationDTO> getPronunciations() {
		return pronunciations;
	}

	public void setPronunciations(Set<NamePronunciationDTO> pronunciations) {
		this.pronunciations = pronunciations;
	}

	public Set<NameMeaningDTO> getMeanings() {
		return meanings;
	}

	public void setMeanings(Set<NameMeaningDTO> meanings) {
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
