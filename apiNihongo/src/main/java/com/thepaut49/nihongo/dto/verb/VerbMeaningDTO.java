package com.thepaut49.nihongo.dto.verb;

public class VerbMeaningDTO {
	
	private Integer verbId;
    private Integer meaningNumber;
    private String meaning;
	private int version;

	   
    /*** getter /setter ***/
	public Integer getVerbId() {
		return verbId;
	}

	public void setVerbId(Integer verbId) {
		this.verbId = verbId;
	}
	
	
	public Integer getMeaningNumber() {
		return meaningNumber;
	}

	public void setMeaningNumber(Integer meaningNumber) {
		this.meaningNumber = meaningNumber;
	}

	public String getMeaning() {
		return meaning;
	}

	public void setMeaning(String meaning) {
		this.meaning = meaning;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
	
}
