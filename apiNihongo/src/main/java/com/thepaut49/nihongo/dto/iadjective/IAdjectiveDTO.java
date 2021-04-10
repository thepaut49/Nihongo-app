package com.thepaut49.nihongo.dto.iadjective;

import java.util.Set;

public class IAdjectiveDTO {

	private Integer id;
	
	private String kanjis;
	
	private Set<IAdjectivePronunciationDTO> pronunciations;
	
	private Set<IAdjectiveMeaningDTO> meanings;
	
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

	public Set<IAdjectivePronunciationDTO> getPronunciations() {
		return pronunciations;
	}

	public void setPronunciations(Set<IAdjectivePronunciationDTO> pronunciations) {
		this.pronunciations = pronunciations;
	}

	public Set<IAdjectiveMeaningDTO> getMeanings() {
		return meanings;
	}

	public void setMeanings(Set<IAdjectiveMeaningDTO> meanings) {
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
