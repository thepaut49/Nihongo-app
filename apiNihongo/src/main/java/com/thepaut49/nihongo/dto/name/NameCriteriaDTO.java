package com.thepaut49.nihongo.dto.name;

public class NameCriteriaDTO {
	
	private String kanjis;
	
	private String pronunciation;
	
	private String meaning;
	
	/*** getter / setter ***/

	public String getKanjis() {
		return kanjis;
	}

	public void setKanjis(String kanjis) {
		this.kanjis = kanjis;
	}

	public String getPronunciation() {
		return pronunciation;
	}

	public void setPronunciation(String pronunciation) {
		this.pronunciation = pronunciation;
	}

	public String getMeaning() {
		return meaning;
	}

	public void setMeaning(String meaning) {
		this.meaning = meaning;
	}		
}
