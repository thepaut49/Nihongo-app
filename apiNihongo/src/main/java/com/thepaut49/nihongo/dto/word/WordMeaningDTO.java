package com.thepaut49.nihongo.dto.word;

public class WordMeaningDTO {
	
	private Integer wordId;
    private Integer meaningNumber;
    private String meaning;
	private int version;

	   
    /*** getter /setter ***/
    public Integer getWordId() {
		return wordId;
	}

	public void setWordId(Integer wordId) {
		this.wordId = wordId;
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
