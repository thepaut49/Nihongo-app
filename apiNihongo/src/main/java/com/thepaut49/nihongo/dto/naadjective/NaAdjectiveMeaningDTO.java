package com.thepaut49.nihongo.dto.naadjective;

public class NaAdjectiveMeaningDTO {
	
	private Integer naAdjectiveId;
    private Integer meaningNumber;
    private String meaning;
	private int version;

	   
    /*** getter /setter ***/
    public Integer getNaAdjectiveId() {
		return naAdjectiveId;
	}

	public void setNaAdjectiveId(Integer naAdjectiveId) {
		this.naAdjectiveId = naAdjectiveId;
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
