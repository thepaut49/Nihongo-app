package com.thepaut49.nihongo.dto.name;

public class NameMeaningDTO {
	
	private Integer nameId;
    private Integer meaningNumber;
    private String meaning;
	private int version;

	   
    /*** getter /setter ***/
    public Integer getNameId() {
		return nameId;
	}

	public void setNameId(Integer nameId) {
		this.nameId = nameId;
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
