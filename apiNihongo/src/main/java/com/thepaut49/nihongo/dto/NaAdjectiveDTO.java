package com.thepaut49.nihongo.dto;

import java.util.Set;

public class NaAdjectiveDTO {

	private Integer id;
	
	private String kanjis;
	
	private Set<String> pronunciation;
	
	private Set<NaAdjectiveMeaningDTO> meanings;
	
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

	public Set<String> getPronunciation() {
		return pronunciation;
	}

	public void setPronunciation(Set<String> pronunciation) {
		this.pronunciation = pronunciation;
	}

	public Set<NaAdjectiveMeaningDTO> getMeanings() {
		return meanings;
	}

	public void setMeanings(Set<NaAdjectiveMeaningDTO> meanings) {
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
