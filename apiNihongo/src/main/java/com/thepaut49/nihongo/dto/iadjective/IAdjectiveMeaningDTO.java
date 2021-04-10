package com.thepaut49.nihongo.dto.iadjective;

public class IAdjectiveMeaningDTO {
	
    private Integer iiAdjectiveId;
    private Integer meaningNumber;
    private String meaning;
	private int version;

	   
    /*** getter /setter ***/
    public Integer getIiAdjectiveId() {
		return iiAdjectiveId;
	}

	public void setIiAdjectiveId(Integer iiAdjectiveId) {
		this.iiAdjectiveId = iiAdjectiveId;
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
